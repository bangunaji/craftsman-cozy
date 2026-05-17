import React from 'react';
import { useGame, getMaxSlots } from '../game/gameState';
import { ITEMS, ORES, UPGRADES } from '../game/gameConfig';

export const CraftingTable = () => {
    const { state, startCraft } = useGame();

    const anvilLevel = state.upgrades.anvil || 0;
    const maxSlots = getMaxSlots(anvilLevel, state.rentedSlotsExpiry);
    const hasFreeSlot = state.activeCrafts.length < maxSlots;
    const isAdActive = state.rentedSlotsExpiry && Date.now() < state.rentedSlotsExpiry;

    const [now, setNow] = React.useState(Date.now());
    
    React.useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 100);
        return () => clearInterval(timer);
    }, []);

    const renderSlots = () => {
        const slots = [];
        for (let i = 0; i < maxSlots; i++) {
            const craft = state.activeCrafts[i];
            if (craft) {
                const item = ITEMS[craft.itemId];
                const progress = Math.max(0, Math.min(100, ((now - craft.startTime) / (craft.endTime - craft.startTime)) * 100));
                
                const timeLeftMs = Math.max(0, craft.endTime - now);
                const secs = Math.ceil(timeLeftMs / 1000);
                const durationText = secs > 60 ? `${Math.floor(secs/60)}m ${secs%60}s` : `${secs}s`;

                slots.push(
                    <div key={craft.id} className="craft-slot active-slot">
                        <div className="slot-header" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                            <span style={{fontWeight: 800, color: 'var(--text-main)'}}>{item.icon} Slot {i + 1}: {item.name}</span>
                            <span style={{color: 'var(--accent-green-dark)', fontWeight: 900}}>{Math.floor(progress)}%</span>
                        </div>
                        <div className="progress-bg" style={{ marginTop: '0', marginBottom: '6px' }}>
                            <div className="progress-fill" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                            ⏱️ Selesai dalam {durationText}
                        </div>
                    </div>
                );
            } else {
                slots.push(
                    <div key={`empty-${i}`} className="craft-slot empty-slot">
                        <span style={{fontWeight: 800, color: 'var(--text-muted)'}}>Slot {i + 1}: 🪹 Kosong (Siap digunakan)</span>
                    </div>
                );
            }
        }
        
        if (maxSlots < 7) {
            let nextLevelNeeded = 3;
            if (maxSlots === 3) nextLevelNeeded = 7;
            if (maxSlots === 4) nextLevelNeeded = 10;
            if (maxSlots === 5) nextLevelNeeded = 11;
            if (maxSlots === 6) nextLevelNeeded = 16;
            
            slots.push(
                <div key="locked-teaser" className="craft-slot locked-slot">
                    <span style={{fontWeight: 800, color: '#d88978'}}>Slot {maxSlots + 1}: 🔒 Locked — Upgrade Anvil Lv.{nextLevelNeeded}</span>
                </div>
            );
        }
        
        return slots;
    };

    return (
        <div className="crafting-area">
            <h2>Crafting Table</h2>
            
            <div className="active-crafts">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                    <h3 style={{margin: 0}}>Crafting Slots</h3>
                    {isAdActive && (
                        <span style={{background: 'var(--accent-green-dark)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900}}>
                            🚀 2x Ad Boost Aktif
                        </span>
                    )}
                </div>
                <div className="slots-container" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {renderSlots()}
                </div>
            </div>

            <div className="recipe-grid">
                {Object.values(ITEMS).map(item => {
                    const canAfford = Object.entries(item.materials).every(
                        ([mat, amt]) => {
                            if (mat === 'blueprint') return (state.items['blueprint'] || 0) >= amt;
                            return state.ores[mat] >= amt;
                        }
                    );

                    const speedBoost = UPGRADES.anvil.effect(state.upgrades.anvil);
                    const actualTime = item.craftTime * (100 / (100 + speedBoost));

                    const furnaceLevel = state.upgrades.furnace || 0;
                    const anvilLevel = state.upgrades.anvil || 0;

                    const isUnlocked = furnaceLevel >= item.reqFurnace && anvilLevel >= item.reqAnvil;

                    if (!isUnlocked) {
                        return (
                            <div key={item.id} className={`recipe-card locked-recipe ${item.rarity}`} style={{ borderStyle: 'dashed', background: 'rgba(0,0,0,0.05)', opacity: 0.7 }}>
                                <div className="recipe-header">
                                    <span className="item-icon" style={{filter: 'grayscale(100%) opacity(0.5)'}}>{item.icon}</span>
                                    <h3 style={{color: '#888'}}>{item.name}</h3>
                                </div>
                                <div className="recipe-footer" style={{marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                    {item.reqFurnace > furnaceLevel && (
                                        <span style={{fontSize: '0.9rem', color: '#ffcc00'}}>Requires Furnace Lv.{item.reqFurnace}</span>
                                    )}
                                    {item.reqAnvil > anvilLevel && (
                                        <span style={{fontSize: '0.9rem', color: '#ffcc00'}}>Requires Anvil Lv.{item.reqAnvil}</span>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={item.id} className={`recipe-card ${item.rarity}`}>
                            <div className="recipe-header">
                                <span className="item-icon">{item.icon}</span>
                                <h3>{item.name}</h3>
                            </div>
                            
                            <div className="materials-list">
                                {Object.entries(item.materials).map(([mat, amt]) => {
                                    if (mat === 'blueprint') {
                                        return (
                                            <span key={mat} className={(state.items['blueprint'] || 0) >= amt ? 'has-mat' : 'need-mat'}>
                                                📜 {state.items['blueprint'] || 0}/{amt}
                                            </span>
                                        );
                                    }
                                    return (
                                        <span key={mat} className={state.ores[mat] >= amt ? 'has-mat' : 'need-mat'}>
                                            {ORES[mat].icon} {Math.floor(state.ores[mat])}/{amt}
                                        </span>
                                    );
                                })}
                            </div>
                            
                            <div className="recipe-footer">
                                <span className="craft-time">⏱️ {Math.ceil(actualTime)}s</span>
                                <button 
                                    disabled={!canAfford || !hasFreeSlot}
                                    onClick={() => startCraft(item.id, item.craftTime, item.materials)}
                                >
                                    {!hasFreeSlot ? 'Slot Penuh' : 'Craft'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
