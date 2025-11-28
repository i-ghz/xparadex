```
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MARKETS = [
    { label: '$750M', chance: 31, yes: 32, no: 71, vol: '$37,736' },
    { label: '$1.5B', chance: 15, yes: 15, no: 86, vol: '$17,341' },
    { label: '$3B', chance: 10, yes: 15.6, no: 95.0, vol: '$7,823' },
    { label: '$5B', chance: 5, yes: 5.0, no: 95.1, vol: '$3,648' },
    { label: '$10B', chance: 4, yes: 5.8, no: 96.9, vol: '$6,732' },
];

export function SentimentPoll() {
    const [selectedVote, setSelectedVote] = useState(null); // { index, type: 'yes'|'no' }

    const handleVote = (index, type) => {
        setSelectedVote({ index, type });
        // In a real app, this would trigger a transaction or API call
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#000000] border border-white/10 rounded-2xl overflow-hidden font-sans">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center flex-shrink-0">
                    <img src="/assets/logo.png" alt="Paradex" className="w-8 h-8 object-contain invert" />
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        Paradex FDV above ___ one day after launch?
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                            <span>$73,281 Vol.</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>🕒 Jan 1, 2027</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Markets List */}
            <div className="divide-y divide-white/5">
                {/* Column Headers (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">Outcome</div>
                    <div className="col-span-2 text-right">% Chance</div>
                    <div className="col-span-6 text-center">Outcome Price</div>
                </div>

                {MARKETS.map((market, index) => (
                    <div key={index} className="group hover:bg-white/5 transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center">
                            {/* Outcome Label */}
                            <div className="col-span-1 md:col-span-4 flex flex-col">
                                <span className="text-white font-bold text-lg">{market.label}</span>
                                <span className="text-gray-600 text-xs md:hidden">{market.vol} Vol.</span>
                            </div>

                            {/* Chance */}
                            <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                                <span className="md:hidden text-gray-500 text-sm font-medium">Chance</span>
                                <span className="text-white font-bold text-lg md:text-xl">{market.chance}%</span>
                            </div>

                            {/* Buttons */}
                            <div className="col-span-1 md:col-span-6 flex gap-3">
                                <button
                                    onClick={() => handleVote(index, 'yes')}
                                    className={`flex - 1 flex flex - col items - center justify - center py - 2 rounded - lg border transition - all ${
    selectedVote?.index === index && selectedVote?.type === 'yes'
        ? 'bg-[#10b981] border-[#10b981] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
        : 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/20'
} `}
                                >
                                    <span className="text-xs font-bold uppercase">Buy Yes</span>
                                    <span className="text-sm font-bold">{market.yes}¢</span>
                                </button>

                                <button
                                    onClick={() => handleVote(index, 'no')}
                                    className={`flex - 1 flex flex - col items - center justify - center py - 2 rounded - lg border transition - all ${
    selectedVote?.index === index && selectedVote?.type === 'no'
        ? 'bg-[#ef4444] border-[#ef4444] text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
        : 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/20'
} `}
                                >
                                    <span className="text-xs font-bold uppercase">Buy No</span>
                                    <span className="text-sm font-bold">{market.no}¢</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
```
