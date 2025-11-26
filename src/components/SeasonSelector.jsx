import React from 'react';
import { motion } from 'framer-motion';

export function SeasonSelector({ seasons, currentSeason, onSelect }) {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            {Object.values(seasons).map((season) => (
                <button
                    key={season.id}
                    onClick={() => onSelect(season.id)}
                    className={`relative px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${currentSeason === season.id
                            ? 'text-black shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    {currentSeason === season.id && (
                        <motion.div
                            layoutId="activeSeason"
                            className="absolute inset-0 bg-paradex-primary rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{season.label}</span>
                </button>
            ))}
        </div>
    );
}
