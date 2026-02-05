import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { SettingsModal } from './components/SettingsModal';
import { StatsView } from './components/StatsView';
import { getDailyPortion, formatDate } from './utils/calculator';

function Layout() {
    const location = useLocation();
    const [startDateStr, setStartDateStr] = useState(() => {
        const saved = localStorage.getItem('mishnahStartDate');
        return saved || new Date().toISOString().split('T')[0];
    });
    const [viewDate, setViewDate] = useState(new Date());
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('mishnahStartDate', startDateStr);
    }, [startDateStr]);

    const dailyPortion = useMemo(() => getDailyPortion(startDateStr, viewDate), [startDateStr, viewDate]);

    // Navigation Handlers
    const goNext = () => {
        const next = new Date(viewDate);
        next.setDate(next.getDate() + 1);
        setViewDate(next);
    };
    const goPrev = () => {
        const prev = new Date(viewDate);
        prev.setDate(prev.getDate() - 1);
        setViewDate(prev);
    };
    const goToday = () => {
        setViewDate(new Date());
    };

    const isToday = viewDate.toDateString() === new Date().toDateString();

    return (
        <div className="min-h-screen flex flex-col items-center bg-surface font-sans">
            
            {/* --- TOP BAR --- */}
            <header className="w-full bg-surface px-4 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm bg-opacity-95 backdrop-blur border-b border-gray-100">
                <div className="flex flex-col">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Mishnah Yomi Plus</span>
                    <h1 className="text-onSurface text-xl font-bold leading-tight">Daily Study</h1>
                </div>
                <button 
                    onClick={() => setSettingsOpen(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surfaceVariant text-onSurfaceVariant transition-colors"
                >
                    <span className="material-symbols-rounded">settings</span>
                </button>
            </header>

            {/* --- MAIN ROUTER CONTENT --- */}
            <main className="w-full max-w-lg flex-1">
                <Routes>
                    <Route path="/" element={
                        <div className="px-4 mt-6 flex flex-col gap-6 pb-28">
                            {/* Date Header */}
                            <div className="text-center">
                                <h2 className="text-onSurfaceVariant font-medium text-lg">{formatDate(viewDate)}</h2>
                                {isToday && (
                                    <span className="inline-block mt-1 px-3 py-1 bg-primaryContainer text-onPrimaryContainer text-[10px] font-bold rounded-full tracking-wide">TODAY</span>
                                )}
                            </div>

                            {/* Content */}
                            {dailyPortion.isShabbat ? (
                                <div className="bg-white rounded-3xl p-8 shadow-sm text-center flex flex-col items-center gap-4 border-t-4 border-secondary mx-2">
                                    <div className="w-20 h-20 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-rounded text-5xl text-secondary">candles</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-primary">Shabbat Shalom</h2>
                                        <p className="text-gray-500 mt-2">No formal cycle study today.</p>
                                        <p className="text-gray-400 text-sm mt-1">Review previous learning or rest!</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {dailyPortion.displayGroup.map((group, idx) => (
                                        <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary"></div>
                                            <h3 className="text-2xl font-bold text-primary mb-2 pl-2">{group.name}</h3>
                                            <div className="flex items-center justify-between pl-2">
                                                <div className="bg-surfaceVariant rounded-xl px-4 py-2">
                                                    <span className="text-onSurfaceVariant font-mono font-bold text-lg">
                                                        {group.start.chapter}:{group.start.mishnah}
                                                    </span>
                                                </div>
                                                <span className="material-symbols-rounded text-gray-300">arrow_right_alt</span>
                                                <div className="bg-surfaceVariant rounded-xl px-4 py-2">
                                                    <span className="text-onSurfaceVariant font-mono font-bold text-lg">
                                                        {group.end.chapter}:{group.end.mishnah}
                                                    </span>
                                                </div>
                                            </div>
                                            {dailyPortion.wrapsAround && idx === dailyPortion.displayGroup.length -1 && (
                                                <div className="mt-4 pl-2">
                                                    <div className="bg-secondary text-onSecondary px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 shadow-sm">
                                                        <span className="material-symbols-rounded text-sm">celebration</span>
                                                        SIYUM! NEW CYCLE
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    <div className="text-center mt-2">
                                        <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">Daily Quota: 14 Mishnayot</p>
                                    </div>
                                </div>
                            )}

                            {/* Date Navigation Controls (Only on Home) */}
                             <div className="flex justify-center mt-4">
                                <div className="bg-surfaceVariant rounded-full shadow-inner p-1 flex items-center gap-1">
                                    <button 
                                        onClick={goPrev}
                                        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white text-onSurface transition-all"
                                    >
                                        <span className="material-symbols-rounded">chevron_left</span>
                                    </button>
                                    
                                    <button 
                                        onClick={goToday}
                                        className="h-12 px-6 rounded-full bg-white text-primary font-bold shadow-sm flex items-center gap-2 active:scale-95 transition-transform border border-gray-100"
                                    >
                                        Today
                                    </button>

                                    <button 
                                        onClick={goNext}
                                        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white text-onSurface transition-all"
                                    >
                                        <span className="material-symbols-rounded">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    } />
                    
                    <Route path="/stats" element={<StatsView dailyPortion={dailyPortion} />} />
                </Routes>
            </main>

            {/* --- BOTTOM TAB BAR --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 pb-6 flex justify-around items-center z-50">
                <Link to="/" className={`flex flex-col items-center gap-1 p-2 w-24 rounded-xl transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
                    <span className={`material-symbols-rounded ${location.pathname === '/' ? 'fill-current' : ''}`}>book_2</span>
                    <span className="text-[10px] font-bold tracking-wide">STUDY</span>
                </Link>

                <Link to="/stats" className={`flex flex-col items-center gap-1 p-2 w-24 rounded-xl transition-colors ${location.pathname === '/stats' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
                    <span className={`material-symbols-rounded ${location.pathname === '/stats' ? 'fill-current' : ''}`}>pie_chart</span>
                    <span className="text-[10px] font-bold tracking-wide">STATS</span>
                </Link>
            </div>

            <SettingsModal 
                isOpen={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
                startDateStr={startDateStr}
                setStartDateStr={setStartDateStr}
            />

        </div>
    );
}

export default function App() {
    return (
        <HashRouter>
            <Layout />
        </HashRouter>
    );
}