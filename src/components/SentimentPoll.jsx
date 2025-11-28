import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OPTIONS = [
    { id: '750m', label: 'Bearish ($750M)', color: '#ef4444', percentage: 31 },
    { id: '1.5b', label: 'Conservative ($1.5B)', color: '#f59e0b', percentage: 15 },
    { id: '3b', label: 'Optimistic ($3B)', color: '#22d3ee', percentage: 10 },
    { id: '10b', label: 'Bullish ($10B)', color: '#10b981', percentage: 4 },
];

export function SentimentPoll() {
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const vote = localStorage.getItem('paradex_sentiment_vote');
        if (vote) {
            setHasVoted(true);
            setSelectedOption(vote);
        }
    }, []);

    const handleVote = (id) => {
        setHasVoted(true);
        setSelectedOption(id);
        localStorage.setItem('paradex_sentiment_vote', id);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
                What is your FDV prediction? 🗳️
            </h3>

            <div className="space-y-4">
                {OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => !hasVoted && handleVote(option.id)}
                        disabled={hasVoted}
                        className={`relative w-full p-4 rounded-xl border transition-all overflow-hidden group ${hasVoted
                                ? 'border-transparent cursor-default'
                                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                            }`}
                    >
                        {/* Progress Bar Background (Only visible after vote) */}
                        {hasVoted && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${option.percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 opacity-20"
                                style={{ backgroundColor: option.color }}
                            />
                        )}

                        <div className="relative flex items-center justify-between z-10">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOption === option.id
                                            ? 'border-paradex-primary bg-paradex-primary'
                                            : 'border-gray-500 group-hover:border-gray-300'
                                        }`}
                                >
                                    {selectedOption === option.id && (
                                        <div className="w-2 h-2 bg-black rounded-full" />
                                    )}
                                </div>
                                <span className={`font-medium ${selectedOption === option.id ? 'text-white' : 'text-gray-300'}`}>
                                    {option.label}
                                </span>
                            </div>

                            {hasVoted && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="font-bold text-white"
                                >
                                    {option.percentage}% Chance
                                </motion.span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {hasVoted && (
                <p className="text-center text-gray-500 text-sm mt-6">
                    Based on Polymarket odds 🔮
                </p>
            )}
        </div>
    );
}
