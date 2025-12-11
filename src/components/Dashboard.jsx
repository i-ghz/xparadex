import React from 'react';
import { ParadexStats } from './ParadexStats';

export function Dashboard({ onNavigate }) {
    return (
        <div className="w-full flex flex-col items-center gap-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                    WELCOME TO <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-paradex-primary via-white to-paradex-primary animate-pulse">
                        THE CULT
                    </span>
                </h2>
                <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                    The ultimate hub for Paradex maximalists. Track markets, calculate your XP, and dominate the leaderboard.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button
                        onClick={() => onNavigate('calculator')}
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Calculate XP
                    </button>
                    <button
                        onClick={() => onNavigate('analytics')}
                        className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md"
                    >
                        View Analytics
                    </button>
                </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Quick Stats Preview */}
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-4">
                    <h3 className="text-2xl font-bold text-white">Market Pulse</h3>
                    <button
                        onClick={() => onNavigate('analytics')}
                        className="text-paradex-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                        View All
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
                <ParadexStats />
            </div>
        </div>
    );
}
