import React, { useState } from 'react';
import { XPInput } from './XPInput';
import { ValuationGrid } from './ValuationGrid';
import { PNLCard } from './PNLCard';
import { MediaKit } from './MediaKit';

import { SentimentPoll } from './SentimentPoll';
import { useAirdropCalculator, SEASONS } from '../hooks/useAirdropCalculator';
import { SeasonSelector } from './SeasonSelector';

export function AirdropEstimator() {
    const [xp, setXp] = useState('');
    const [currentSeason, setCurrentSeason] = useState('S2');
    const [selectedCharacter, setSelectedCharacter] = useState('/assets/character1.png');

    const calculations = useAirdropCalculator(xp, currentSeason);
    const activeSeason = SEASONS[currentSeason];

    // Default to 1B FDV for the card if not specified, or pick the middle one
    const cardValue = calculations.find(c => c.label === '1B')?.estimatedValue?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0';

    return (
        <div className="w-full flex flex-col items-center gap-16">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="flex flex-col items-center gap-8 w-full">
                    <SeasonSelector
                        seasons={SEASONS}
                        currentSeason={currentSeason}
                        onSelect={setCurrentSeason}
                    />
                    <XPInput
                        value={xp}
                        onChange={setXp}
                        label={activeSeason.inputLabel}
                        season={activeSeason}
                    />
                </div>

                <div className="w-full flex justify-center lg:justify-start lg:pt-8">
                    <SentimentPoll />
                </div>
            </div>

            {xp && parseFloat(xp.replace(/,/g, '')) > 0 && (
                <>
                    <ValuationGrid calculations={calculations} />

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-2xl font-bold text-white">Generate Your PNL Card</h2>
                        <PNLCard
                            xp={xp}
                            estimatedValue={cardValue}
                            selectedCharacter={selectedCharacter}
                            onCharacterSelect={setSelectedCharacter}
                            season={activeSeason}
                        />
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </>
            )}

            {/* Tokenomics moved to separate page */}

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <MediaKit />
        </div>
    );
}
