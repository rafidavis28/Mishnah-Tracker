import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DailyPortion } from '../types';
import { TOTAL_MISHNAYOT } from '../constants';

interface StatsViewProps {
    dailyPortion: DailyPortion;
}

export const StatsView: React.FC<StatsViewProps> = ({ dailyPortion }) => {
    let currentIndex = 0;
    if (dailyPortion.mishnayot.length > 0) {
        currentIndex = dailyPortion.mishnayot[0].globalIndex;
    }

    const completed = currentIndex;
    const remaining = TOTAL_MISHNAYOT - completed;
    const progressData = [
        { name: 'Completed', value: completed },
        { name: 'Remaining', value: remaining },
    ];

    const COLORS = ['#1A237E', '#E1E4EA'];
    const percentage = ((completed / TOTAL_MISHNAYOT) * 100).toFixed(1);

    return (
        <div className="flex flex-col gap-6 p-4 pb-24 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-surfaceVariant text-center">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Overall Progress</h2>
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={progressData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {progressData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black text-primary">{percentage}%</span>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Complete</span>
                    </div>
                </div>
                <div className="mt-4 flex justify-around text-sm">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{completed.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs">Learned</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{TOTAL_MISHNAYOT.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs">Total</span>
                    </div>
                </div>
            </div>

            <div className="bg-primaryContainer rounded-3xl p-6 text-onPrimaryContainer relative overflow-hidden">
                <span className="material-symbols-rounded absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12">school</span>
                <h3 className="text-xl font-bold mb-2">Keep it up!</h3>
                <p className="text-sm opacity-80 mb-4">
                    Consistency is the key to mastering Shas. You are on a 14-mishnah per day track.
                </p>
                <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                    <span className="material-symbols-rounded text-sm">bolt</span>
                    CURRENT STREAK: ACTIVE
                </div>
            </div>
        </div>
    );
};