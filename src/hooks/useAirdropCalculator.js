import { useMemo } from 'react';

const TOTAL_SUPPLY_XP = 230_000_000;
const AIRDROP_ALLOCATION = 0.20; // 20%

export const FDV_SCENARIOS = [
    { label: '500M', value: 500_000_000 },
    { label: '750M', value: 750_000_000 },
    { label: '1B', value: 1_000_000_000 },
    { label: '10B', value: 10_000_000_000 },
    { label: '100B', value: 100_000_000_000 },
];

export function useAirdropCalculator(xp) {
    const calculations = useMemo(() => {
        const numericXp = parseFloat(xp.toString().replace(/,/g, '')) || 0;

        // Formula: (UserXP / TotalXP) * (TotalSupply * Allocation) * (FDV / TotalSupply)
        // Simplified: UserXP * (Allocation / TotalXP) * FDV
        // Wait, let's re-verify the formula from the user request:
        // "supply total d'xp est estimé à 300M et 20% du supply devrait etre distribué à ces XP"
        // So 20% of the TOKEN supply is for the 300M XP.
        // Token Price = FDV / Total Token Supply
        // User Tokens = (UserXP / 300M) * (0.20 * Total Token Supply)
        // User Value = User Tokens * Token Price
        //            = (UserXP / 300M) * (0.20 * Total Token Supply) * (FDV / Total Token Supply)
        //            = (UserXP / 300M) * 0.20 * FDV

        const shareOfXp = numericXp / TOTAL_SUPPLY_XP;

        return FDV_SCENARIOS.map(scenario => {
            const estimatedValue = shareOfXp * AIRDROP_ALLOCATION * scenario.value;
            return {
                ...scenario,
                estimatedValue
            };
        });
    }, [xp]);

    return calculations;
}
