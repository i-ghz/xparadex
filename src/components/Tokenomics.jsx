import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Handshake, Telescope, Building2, Fuel } from 'lucide-react';

const DATA = [
    { name: 'Preseason & Season 1', value: 5, color: '#6366f1' }, // Indigo
    { name: 'Ongoing Community Rewards', value: 25.6, color: '#10b981' }, // Emerald
    { name: 'Foundation Budget', value: 6, color: '#ef4444' }, // Red
    { name: 'Future Contributors & Advisors', value: 3.9, color: '#ec4899' }, // Pink
    { name: 'TAP Program', value: 1, color: '#22d3ee' }, // Cyan
    { name: 'Season 2*', value: 15, color: '#8b5cf6' }, // Violet
    { name: 'Liquidity Programs', value: 5, color: '#f59e0b' }, // Amber
    { name: 'Core Contributors', value: 25.1, color: '#06b6d4' }, // Cyan
    { name: 'Paradigm Shareholders', value: 13.4, color: '#3b82f6' }, // Blue
];

export function Tokenomics() {
    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-12 bg-[#000000] border border-white/10 rounded-3xl relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.1),_transparent_50%)] pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="p-2 bg-paradex-primary/10 rounded-lg">
                    <svg className="w-6 h-6 text-paradex-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">$DIME Tokenomics</h2>
            </div>

            {/* Key Innovations & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 relative z-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group">
                    <h3 className="text-[#22d3ee] font-bold text-base mb-2 flex items-center gap-2">
                        <Handshake className="w-5 h-5" />
                        Unprecedented Alignment
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        Paradex introduces a revolutionary <strong>Performance-Based Unlock</strong> mechanism. <span className="text-white font-bold">80% of Team tokens</span> are locked behind measurable milestones, ensuring 100% alignment with community success. No "rest and vest".
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group">
                    <h3 className="text-[#22d3ee] font-bold text-base mb-2 flex items-center gap-2">
                        <Telescope className="w-5 h-5" />
                        The SuperDEX Vision
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        Bridging the gap between CeFi and DeFi. A unified platform offering Spot, Perps, and Options with cross-margin, all powered by the high-performance <strong>Paradex Chain</strong> (Layer 2).
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group">
                    <h3 className="text-[#22d3ee] font-bold text-base mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Incubated by Paradigm
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        Born from the largest institutional liquidity network (<strong>30% of global options market</strong>). This unique incubation provides deep liquidity and expertise without traditional VC constraints.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group">
                    <h3 className="text-[#22d3ee] font-bold text-base mb-2 flex items-center gap-2">
                        <Fuel className="w-5 h-5" />
                        $DIME Utility
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        $DIME is the native gas token of the Paradex Chain. It powers the ecosystem, from governance and staking to unlocking yield on the upcoming <strong>XUSD</strong> synthetic dollar.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                {/* Chart */}
                <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value) => `${value}%`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {DATA.map((item, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                                    {item.name}
                                </span>
                            </div>
                            <span className="text-white font-bold text-sm">
                                {item.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Note */}
            <div className="mt-12 p-4 bg-orange-900/20 border border-orange-500/20 rounded-xl relative z-10">
                <p className="text-orange-200/80 text-xs md:text-sm leading-relaxed">
                    *Note: Season 2 allocation will be increased from the current 15% size. The total amount above 15% will be determined at the end of Season 2 and will depend on total traction and participation.
                </p>
            </div>
        </div>
    );
}
