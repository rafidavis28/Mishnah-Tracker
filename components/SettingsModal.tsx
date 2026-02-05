import React from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    startDateStr: string;
    setStartDateStr: (date: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, startDateStr, setStartDateStr }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-primary mb-1">Settings</h2>
                <p className="text-gray-500 text-sm mb-6">Configure your learning cycle.</p>
                
                <div className="flex flex-col gap-2 mb-6">
                    <label className="text-sm font-semibold text-gray-700">Cycle Start Date</label>
                    <input 
                        type="date" 
                        value={startDateStr}
                        onChange={(e) => setStartDateStr(e.target.value)}
                        className="w-full p-4 bg-surface rounded-xl border-none focus:ring-2 focus:ring-primary outline-none text-lg"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        This is Day 1 of your cycle. The app skips Shabbat automatically.
                    </p>
                </div>

                <div className="flex justify-end">
                    <button 
                        onClick={onClose}
                        className="text-primary font-bold px-6 py-3 rounded-full hover:bg-primaryContainer transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};