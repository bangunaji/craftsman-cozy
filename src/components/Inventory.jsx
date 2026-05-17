import React from 'react';
import { useGame } from '../game/gameState';
import { ORES, UPGRADES } from '../game/gameConfig';

export const Inventory = () => {
    const { state } = useGame();
    
    const capacity = UPGRADES.storage.effect(state.upgrades.storage);
    const currentTotal = Math.floor(Object.values(state.ores).reduce((a, b) => a + Math.floor(b), 0));
    const fillPercent = Math.min(100, (currentTotal / capacity) * 100);

    return (
        <header className="inventory-header">
            <div className="top-stats">
                <div className="coins">💰 {Math.floor(state.coins)}</div>
            </div>
            
            <div className="storage-bar-container">
                <div className="storage-labels">
                    <span>Storage</span>
                    <span>{currentTotal} / {capacity}</span>
                </div>
                <div className="storage-bar-bg">
                    <div 
                        className={`storage-bar-fill ${fillPercent >= 100 ? 'full' : ''}`}
                        style={{ width: `${fillPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="quick-ores" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '5px', gap: '10px' }}>
                {Object.values(ORES).map(ore => {
                    const amt = Math.floor(state.ores[ore.id]);
                    if (amt === 0) return null; // Only show ores player has collected to save space
                    return (
                        <span key={ore.id} style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '2px 6px', borderRadius: '4px' }}>
                            {ore.icon} {amt}
                        </span>
                    );
                })}
            </div>
        </header>
    );
};
