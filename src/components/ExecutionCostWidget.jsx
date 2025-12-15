import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const DATA = [
    { name: 'Lighter', cost: 0.18, color: '#000000', labelColor: '#ffffff' }, // Black bar
    { name: 'Paradex', cost: 0.30, color: '#8b5cf6', labelColor: '#ffffff' }, // Purple
    { name: 'Extended', cost: 2.60, color: '#10b981', labelColor: '#ffffff' }, // Emerald
    { name: 'Hyperliquid', cost: 4.67, color: '#6ee7b7', labelColor: '#000000' }, // Light Green
];

export function ExecutionCostWidget() {
    return (
        <div className="w-full h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    Perps by Avg Execution Cost (Last Week)
                </h2>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={DATA}
                            margin={{ top: 5, right: 80, left: 20, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }}
                                width={100}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-black text-white p-2 rounded text-xs font-bold">
                                                {payload[0].value} bps
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={40}>
                                {DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                <LabelList
                                    dataKey="cost"
                                    position="right"
                                    formatter={(value) => `${value} bps`}
                                    style={{ fill: '#374151', fontSize: 14, fontWeight: 500 }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                    <span>Source: Internal Data</span>
                    <div className="flex gap-4">
                        <span>0 bps</span>
                        <span>1 bps</span>
                        <span>2 bps</span>
                        <span>3 bps</span>
                        <span>4 bps</span>
                        <span>5 bps</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
