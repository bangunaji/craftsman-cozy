import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../game/gameState';
import { UPGRADES, AREAS } from '../game/gameConfig';
import { animate } from 'animejs';

// Komponen floating ore label teranimate
const FloatingOreLabel = ({ text, onDone }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return;
        animate(ref.current, {
            translateY: [-10, -70],
            opacity: [1, 0],
            scale: [1.2, 0.8],
            duration: 1400,
            ease: 'easeOutCubic',
            onComplete: onDone
        });
    }, [onDone]);
    return (
        <span ref={ref} style={{
            position: 'fixed', top: '45%', left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none', zIndex: 9999,
            fontWeight: 900, fontSize: '1.1rem',
            color: '#166534', textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            background: 'rgba(255,255,255,0.85)', borderRadius: '12px',
            padding: '4px 12px', border: '2px solid #4ade80',
            whiteSpace: 'nowrap'
        }}>
            🌿 {text}
        </span>
    );
};

export const MiningArea = () => {
    const { state, manualMine, changeActiveArea, floatingPopups } = useGame();
    const [clicks, setClicks] = useState([]);


    const handleMine = (e) => {
        const id = Date.now() + Math.random();
        const rect = e.currentTarget ? e.currentTarget.getBoundingClientRect() : { left: 0, top: 0, width: 220, height: 220 };
        const clientX = e.clientX || rect.left + rect.width / 2;
        const clientY = e.clientY || rect.top + rect.height / 2;
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        setClicks(prev => [...prev, { id, x, y, amount: 1 }]);
        
        setTimeout(() => {
            setClicks(prev => prev.filter(c => c.id !== id));
        }, 800);

        manualMine(1);
    };

    const activeArea = AREAS[state.activeAreaId] || AREAS['area_1'];
    
    // Separate areas
    const unlockedAreas = Object.values(AREAS).filter(a => state.upgrades.furnace >= a.reqFurnace);
    const lockedAreas = Object.values(AREAS).filter(a => state.upgrades.furnace < a.reqFurnace);

    // Dynamic emoji based on area ID for visual flair
    const areaEmojis = {
        'area_1': '🏕️',
        'area_2': '🎋',
        'area_3': '⛰️',
        'area_4': '🌛',
        'area_5': '🌋',
        'area_6': '❄️',
        'area_7': '🌌'
    };

    return (
        <div className="mining-area">
            
            {/* Tags for Areas */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px' }}>
                {unlockedAreas.map(area => (
                    <button 
                        key={area.id}
                        onClick={() => changeActiveArea(area.id)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: `2px solid ${state.activeAreaId === area.id ? '#5c4033' : '#d4a373'}`,
                            background: state.activeAreaId === area.id ? 'var(--accent-yellow)' : 'var(--bg-card)',
                            color: '#5c4033',
                            fontWeight: '900',
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap',
                            boxShadow: state.activeAreaId === area.id ? '0 3px 0 0 #5c4033' : 'none',
                        }}
                    >
                        {areaEmojis[area.id]} {area.name}
                    </button>
                ))}
                
                {lockedAreas.map(area => (
                    <div 
                        key={area.id}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: '2px dashed #d88978',
                            background: '#faedea',
                            color: '#d88978',
                            fontWeight: '800',
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap',
                            opacity: 0.7,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        🔒 {area.name} <span style={{fontSize: '0.75rem', marginLeft: '6px'}}>(Furnace Lv.{area.reqFurnace})</span>
                    </div>
                ))}
            </div>

            {/* Active Area Card */}
            <div className="active-ore-viewport glass-card" style={{marginTop: '10px', background: 'linear-gradient(to bottom, #e8f4f8, #fdfaf3)'}}>
                <div className="viewport-header">
                    <h3>{areaEmojis[activeArea.id]} {activeArea.name}</h3>
                    <p className="ore-value">Tap area untuk mengumpulkan material</p>
                </div>

                <div className="ore-3d-container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div 
                        onClick={handleMine}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'var(--accent-green)',
                            border: '6px solid var(--border-color)',
                            boxShadow: '0 8px 0 0 var(--border-color), inset 0 -10px 0 0 rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 4px 0 0 var(--border-color), inset 0 -10px 0 0 rgba(0,0,0,0.1)'; }}
                        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 0 0 var(--border-color), inset 0 -10px 0 0 rgba(0,0,0,0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 0 0 var(--border-color), inset 0 -10px 0 0 rgba(0,0,0,0.1)'; }}
                    >
                        <span style={{ fontSize: '5rem', userSelect: 'none' }}>{areaEmojis[activeArea.id]}</span>
                    </div>
                    
                    {clicks.map(click => (
                        <span 
                            key={click.id} 
                            className="floating-number"
                            style={{ left: `${click.x}px`, top: `${click.y}px` }}
                        >
                            +🌿
                        </span>
                    ))}
                </div>

                <div className="tap-instruction">
                    TAPTAP AREA
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {Object.keys(activeArea.rates).map(oreId => (
                        <span key={oreId} style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-muted)', background: 'var(--bg-main)', padding: '6px 10px', borderRadius: '12px', border: '2px solid var(--border-color)'}}>
                            {oreId.replace('_', ' ').toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mining-stats-row">
                <div className="stat-card glass-card">
                    <h4>Explore Power</h4>
                    <p className="stat-val">+1 / tap</p>
                </div>
            </div>

            {state.upgrades.miner > 0 && (
                <div className="auto-miner-status glass-card active-pulse">
                    <span className="robot-icon">🏕️</span>
                    <div>
                        <strong>Auto-Explore Active</strong>
                        <p>+{UPGRADES.miner.effect(state.upgrades.miner)} tindakan/detik di {activeArea.name}</p>
                    </div>
                </div>
            )}

            {/* Floating ore popup labels (Anime.js animated) */}
            {(floatingPopups || []).filter(p => p.type === 'ore').map(popup => (
                <FloatingOreLabel key={popup.id} text={popup.text} onDone={() => {}} />
            ))}
        </div>
    );
};
