import React, { useState } from 'react';
import { useGame } from '../game/gameState';
import { UPGRADES, HARD_GATES } from '../game/gameConfig';

const STORE_ITEMS = [
    { id: 'skip_15m', name: 'Time Skip 15m', cost: 25, type: 'qol', desc: 'Mempercepat semua proses crafting aktif selama 15 menit.', icon: '⏱️' },
    { id: 'skip_1h', name: 'Time Skip 1h', cost: 80, type: 'qol', desc: 'Mempercepat semua proses crafting aktif selama 1 jam.', icon: '⏳' },
    { id: 'skip_4h', name: 'Time Skip 4h', cost: 250, type: 'qol', desc: 'Mempercepat semua proses crafting aktif selama 4 jam.', icon: '⌛' },
    { id: 'turbo_miner_2h', name: 'Turbo Miner (2h)', cost: 100, type: 'boost', desc: '2x hasil mining selama 2 jam.', icon: '⛏️' }
];

export const Workshop = () => {
    const { state, buyUpgrade, upgradeError, clearUpgradeError, buyStoreItem, watchAdRental } = useGame();
    const [activeTab, setActiveTab] = useState('upgrades');
    
    React.useEffect(() => {
        if (upgradeError) {
            const timer = setTimeout(() => clearUpgradeError(), 3000);
            return () => clearTimeout(timer);
        }
    }, [upgradeError, clearUpgradeError]);

    const isAdActive = state.rentedSlotsExpiry && Date.now() < state.rentedSlotsExpiry;

    return (
        <div className="workshop-area">
            <h2>Workshop & Store</h2>
            
            <div className="tab-buttons" style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                <button 
                    style={{flex: 1, background: activeTab === 'upgrades' ? 'var(--accent-yellow)' : 'var(--bg-card)', color: activeTab === 'upgrades' ? 'var(--text-main)' : 'var(--text-muted)'}}
                    onClick={() => setActiveTab('upgrades')}
                >
                    🔨 Upgrades
                </button>
                <button 
                    style={{flex: 1, background: activeTab === 'store' ? 'var(--accent-blue)' : 'var(--bg-card)', color: activeTab === 'store' ? 'var(--text-main)' : 'var(--text-muted)'}}
                    onClick={() => setActiveTab('store')}
                >
                    💎 Premium Store
                </button>
            </div>

            {activeTab === 'upgrades' && (
                <>
                    {upgradeError && (
                        <div style={{ padding: '10px', background: '#d88978', color: 'white', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
                            ⚠️ {upgradeError}
                        </div>
                    )}
                    <div className="upgrades-list">
                        {Object.values(UPGRADES).map(upgrade => {
                            const currentLevel = state.upgrades[upgrade.id] || 0;
                            const isMaxLevel = currentLevel >= 25;
                            const nextLevel = currentLevel + 1;
                            const cost = Math.floor(upgrade.baseCost * Math.pow(1.5, currentLevel));
                            const canAfford = state.coins >= cost && !isMaxLevel;
                            
                            let gateMsg = null;
                            if (HARD_GATES[upgrade.id] && HARD_GATES[upgrade.id][nextLevel]) {
                                gateMsg = HARD_GATES[upgrade.id][nextLevel].msg;
                            }
                            
                            const currentEffect = upgrade.effect(currentLevel);
                            const nextEffect = isMaxLevel ? null : upgrade.effect(currentLevel + 1);

                            return (
                                <div key={upgrade.id} className="upgrade-card">
                                    <div className="upgrade-icon">{upgrade.icon}</div>
                                    <div className="upgrade-info">
                                        <h3>{upgrade.name} <span>Lv. {currentLevel}</span></h3>
                                        <p>{upgrade.desc}</p>
                                        <div className="effect-preview">
                                            Current: {currentEffect} {isMaxLevel ? '' : `→ Next: ${nextEffect}`}
                                        </div>
                                        {gateMsg && !isMaxLevel && (
                                            <div style={{ color: '#d88978', fontSize: '11px', marginTop: '5px', fontWeight: 'bold' }}>
                                                🔒 Syarat: {gateMsg}
                                            </div>
                                        )}
                                    </div>
                                    <button 
                                        disabled={!canAfford || isMaxLevel}
                                        onClick={() => buyUpgrade(upgrade.id)}
                                    >
                                        {isMaxLevel ? (
                                            'MAX LV'
                                        ) : (
                                            <>
                                                Upgrade<br/>
                                                💰 {cost}
                                            </>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {activeTab === 'store' && (
                <div className="store-area">
                    <div className="glass-card" style={{padding: '20px', textAlign: 'center', marginBottom: '16px', background: 'linear-gradient(135deg, #fdf5e6, #fffcf5)'}}>
                        <h3 style={{color: '#d4a373', fontSize: '1.2rem', margin: '0 0 8px 0'}}>Saldo CiDi Coin Anda</h3>
                        <div style={{fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)'}}>
                            💎 {state.cidiCoins || 0}
                        </div>
                    </div>

                    {/* Ad Boost Banner */}
                    <div className="glass-card" style={{padding: '16px', marginBottom: '24px', background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', border: '2px solid #fb8c00', display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <div style={{fontSize: '3rem'}}>📺</div>
                        <div style={{flex: 1}}>
                            <h4 style={{margin: '0 0 4px 0', fontSize: '1.1rem', color: '#e65100'}}>Sewa 2x Slot Crafting (12 Jam)</h4>
                            <p style={{margin: 0, fontSize: '0.85rem', color: '#795548', lineHeight: '1.4'}}>
                                Tonton 1 iklan pendek untuk menggandakan kapasitas slot aktif Anda!
                            </p>
                            {isAdActive && (
                                <div style={{fontSize: '0.85rem', fontWeight: 900, color: 'var(--accent-green-dark)', marginTop: '8px'}}>
                                    ✅ Aktif! Sisa waktu: {Math.max(1, Math.ceil((state.rentedSlotsExpiry - Date.now()) / 3600000))} Jam
                                </div>
                            )}
                        </div>
                        <button
                            onClick={watchAdRental}
                            disabled={isAdActive}
                            style={{background: isAdActive ? 'var(--bg-card)' : '#fb8c00', color: isAdActive ? 'var(--text-muted)' : 'white', fontWeight: 900, padding: '12px 16px', whiteSpace: 'nowrap', border: 'none'}}
                        >
                            {isAdActive ? 'Aktif' : 'Nonton 📺'}
                        </button>
                    </div>

                    <div className="store-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        {STORE_ITEMS.map(item => (
                                <div key={item.id} className="store-item glass-card" style={{display: 'flex', alignItems: 'center', padding: '14px', gap: '12px'}}>
                                    <div style={{fontSize: '2.2rem', flexShrink: 0}}>{item.icon}</div>
                                    <div style={{flex: 1, minWidth: 0}}>
                                        <h4 style={{margin: '0 0 4px 0', fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name}</h4>
                                        <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4'}}>
                                            {item.desc}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => buyStoreItem(item.id, item.cost)}
                                        disabled={(state.cidiCoins || 0) < item.cost}
                                        style={{
                                            background: 'var(--bg-card)', 
                                            border: '2px solid #d4a373',
                                            color: '#d4a373',
                                            padding: '8px 14px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '2px',
                                            flexShrink: 0,
                                            minWidth: '80px'
                                        }}
                                    >
                                        <span style={{fontSize: '0.8rem', color: 'var(--text-main)'}}>Beli</span>
                                        <span style={{fontWeight: 900}}>💎 {item.cost}</span>
                                    </button>
                                </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
