import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { DailyPortion } from '../types';

interface AiTutorProps {
    dailyPortion: DailyPortion;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const AiTutor: React.FC<AiTutorProps> = ({ dailyPortion }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial greeting based on context
    useEffect(() => {
        const portionText = dailyPortion.isShabbat 
            ? "Shabbat Shalom! How can I help you with your general Torah studies today?"
            : `I see you are learning ${dailyPortion.displayGroup.map(g => `${g.name} ${g.start.chapter}:${g.start.mishnah}`).join(' and ')}. Ask me anything about these Mishnayot!`;
        
        setMessages([{ role: 'model', text: portionText }]);
    }, [dailyPortion]);

    const handleSend = async () => {
        if (!input.trim() || !process.env.API_KEY) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Construct context
            const context = dailyPortion.isShabbat 
                ? "It is Shabbat. The user is resting but may ask general Torah questions."
                : `The user is currently studying the following Mishnayot: ${dailyPortion.displayGroup.map(g => `${g.name} Chapter ${g.start.chapter} Mishnah ${g.start.mishnah} to ${g.end.mishnah}`).join(', ')}. Provide concise, scholarly, and orthodox Jewish explanations.`;

            const model = "gemini-3-flash-preview"; 
            const response = await ai.models.generateContent({
                model: model,
                contents: [
                    { role: 'user', parts: [{ text: `Context: ${context}. User Question: ${userMsg}` }] }
                ],
                config: {
                    systemInstruction: "You are an expert Torah scholar and Rabbi. You help students understand the Mishnah. Keep answers clear, accessible, and grounded in traditional commentary (Bartenura, Kehati).",
                }
            });

            const text = response.text || "I apologize, I couldn't generate a response.";
            setMessages(prev => [...prev, { role: 'model', text: text }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', text: "Error connecting to the Rabbi AI. Please check your connection." }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!process.env.API_KEY) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                <span className="material-symbols-rounded text-6xl mb-4 text-gray-300">key_off</span>
                <p>To use the AI Rabbi, please ensure the API_KEY environment variable is set.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-surface border-t border-surfaceVariant">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about this Mishnah..."
                        className="flex-1 bg-white border-none rounded-full px-4 py-3 focus:ring-2 focus:ring-primary outline-none shadow-sm"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
                    >
                        <span className="material-symbols-rounded">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};