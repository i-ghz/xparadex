import React from 'react';
import { useParadexStats } from '../hooks/useParadexStats';

export function ParadexStats() {
    const { stats: paradexStats, loading } = useParadexStats();

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/10" />
                ))}
            </div>
        );
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat('en-US').format(value);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <StatCard
                    label="Country"
                    value="Singapore 🇸🇬"
                    icon={
                        <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Established"
                    value="2023"
                    icon={
                        <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Futures"
                    value={formatNumber(paradexStats.futuresCount)}
                    icon={
                        <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    }
                />
                <StatCard
                    label="Options"
                    value={formatNumber(paradexStats.optionsCount)}
                    icon={
                        <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <StatCard
                    label="Total Open Interest"
                    value={formatCurrency(paradexStats.totalOI)}
                    icon={
                        <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="24h Volume"
                    value={formatCurrency(paradexStats.totalVolume)}
                    icon={
                        <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
            </div>
            <div className="flex justify-end items-center gap-2 text-xs text-gray-500 px-2">
                <span>Data sourced from Paradex API</span>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-paradex-primary to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative p-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-white/5 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</h3>
                <p className="text-2xl md:text-3xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    {value}
                </p>
            </div>
        </div>
    );
}
