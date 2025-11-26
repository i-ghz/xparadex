import React from 'react';

export function XPInput({ value, onChange, label, season }) {
    const handleChange = (e) => {
        // Allow only numbers and commas
        const val = e.target.value.replace(/[^0-9,]/g, '');
        onChange(val);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-xl mx-auto p-6">
            <label htmlFor="xp-input" className="text-gray-400 text-lg font-medium tracking-wide uppercase">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    id="xp-input"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full bg-transparent text-center text-6xl md:text-8xl font-bold text-white placeholder-white/20 focus:outline-none border-b-2 border-white/10 focus:border-paradex-primary transition-all duration-300 py-4 focus:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)]"
                    autoComplete="off"
                />
                <div className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-600 font-bold text-xl pointer-events-none hidden md:block">
                    {season?.id === 'TAP' ? 'PTS' : 'XP'}
                </div>
            </div>
            <p className="text-gray-500 text-sm">
                Based on estimated {season?.totalPoints?.toLocaleString()} Total {season?.id === 'TAP' ? 'Points' : 'XP'} & {(season?.allocation * 100)}% Supply Allocation
            </p>
        </div>
    );
}
