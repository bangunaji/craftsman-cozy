import React from 'react';
import { useGame } from '../game/gameState';
import { ORES } from '../game/gameConfig';

export const OfflineEarnings = () => {
    const { offlineEarnings, clearOfflineEarnings } = useGame();

    if (!offlineEarnings) return null;

    return (
        <div className="modal-overlay">
            <div className="offline-modal glass-card">
                <h2>Welcome Back!</h2>
                <p>While you were away, your miners kept working and found:</p>
                
                <div className="offline-rewards">
                    {Object.entries(offlineEarnings).map(([mat, amt]) => {
                        if (amt <= 0) return null;
                        return (
                            <div key={mat} className="offline-item">
                                <span className="icon">{ORES[mat].icon}</span>
                                <span className="amount">+{Math.floor(amt)}</span>
                            </div>
                        );
                    })}
                </div>
                
                <button className="collect-btn" onClick={clearOfflineEarnings}>
                    Awesome!
                </button>
            </div>
        </div>
    );
};
