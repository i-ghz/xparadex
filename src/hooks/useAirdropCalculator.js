import { useMemo } from 'react';

export const SEASONS = {
    S1: {
        id: 'S1',
        label: 'Pre-Season + Season 1',
        totalPoints: 100_300_000,
        allocation: 0.05, // 5%
        inputLabel: 'Enter your S1 Points'
    },
    S2: {
        id: 'S2',
        label: 'Season 2',
        totalPoints: 230_000_000,
        allocation: 0.20, // 20%
        inputLabel: 'Enter your Season 2 XP'
    },
    TAP: {
        id: 'TAP',
        label: 'TAP Program',
        totalPoints: 14_000_000,
        allocation: 0.01, // 1%
        inputLabel: 'Enter your TAP Points'
    }
};

export const FDV_SCENARIOS = [
    { label: '500M', value: 500_000_000 },
    { label: '750M', value: 750_000_000 },
    { label: '1B', value: 1_000_000_000 },
    { label: '10B', value: 10_000_000_000 },
    { label: '100B', value: 100_000_000_000 },
];

export function useAirdropCalculator(xp, seasonId = 'S2') {
    const calculations = useMemo(() => {
        const numericXp = parseFloat(xp.toString().replace(/,/g, '')) || 0;
        const season = SEASONS[seasonId];

        if (!season) return [];

        const shareOfXp = numericXp / season.totalPoints;

        return FDV_SCENARIOS.map(scenario => {
            const estimatedValue = shareOfXp * season.allocation * scenario.value;
            return {
                ...scenario,
                estimatedValue
            };
        });
    }, [xp, seasonId]);

    return calculations;
}
