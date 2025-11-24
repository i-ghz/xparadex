import React from 'react';
import { motion } from 'framer-motion';

export function ValuationGrid({ calculations }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl mx-auto p-4">
            {calculations.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <span className="text-gray-400 text-sm font-medium mb-2">
                        FDV: {item.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-paradex-accent">
                        ${item.estimatedValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
