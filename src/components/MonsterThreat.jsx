import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../game/gameState';

export const MonsterThreat = () => {
    const { state, repelMonster } = useGame();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Performance-friendly refs for the needle game
    const needleRef = useRef(null);
    const posRef = useRef(0);
    
    const TARGET_WIDTH = 15; // made smaller per user request
    const [targetStart, setTargetStart] = useState(40);
    const [isDefeated, setIsDefeated] = useState(false);

    // Auto-open modal if monster spawns
    useEffect(() => {
        if (state.monster?.activeMonster && !isModalOpen) {
            setIsModalOpen(true);
            setTargetStart(10 + Math.random() * 75);
            setIsDefeated(false);
        }
    }, [state.monster?.activeMonster]);

    // Needle animation loop (bypasses React render for 60fps smoothness)
    useEffect(() => {
        if (!isModalOpen || !state.monster?.activeMonster || isDefeated) return;
        
        let animationFrameId;
        // Resume from current pos to prevent teleporting
        let pos = posRef.current || 0;
        let direction = 1; // 1 = right, -1 = left
        const speed = 1.0; 

        const animate = () => {
            pos += speed * direction;
            if (pos >= 100) {
                pos = 100;
                direction = -1;
            } else if (pos <= 0) {
                pos = 0;
                direction = 1;
            }
            
            posRef.current = pos;
            
            if (needleRef.current) {
                needleRef.current.style.left = `${pos}%`;
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isModalOpen, isDefeated]); // Removed state.monster dependency so it doesn't restart on every tap

    const active = state.monster?.activeMonster;

    const handleTap = (e) => {
        // Prevent default to avoid double-firing if both touch and click happen
        if (e && e.preventDefault) e.preventDefault();
        
        if (!active || isDefeated) return;

        const currentPos = posRef.current;
        // Added 2% leniency on both sides for mobile fingers
        const success = currentPos >= targetStart - 2 && currentPos <= targetStart + TARGET_WIDTH + 2;
        
        if (success) {
            if (active.tapsDone + 1 >= active.tapsNeeded) {
                setIsDefeated(true);
                setTimeout(() => {
                    repelMonster(true);
                    setIsModalOpen(false);
                }, 1500);
            } else {
                repelMonster(true);
                setTargetStart(10 + Math.random() * 75);
            }
        } else {
            repelMonster(false);
            setTargetStart(10 + Math.random() * 75); // Move target even on miss
        }
        
        // Optional visual feedback on the needle
        if (needleRef.current) {
            needleRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
            needleRef.current.style.backgroundColor = success ? 'var(--accent-green-dark)' : 'var(--accent-red-dark)';
            
            setTimeout(() => {
                if (needleRef.current) {
                    needleRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                    needleRef.current.style.backgroundColor = '#5c4033'; // back to default
                }
            }, 200);
        }
    };

    if (!state.monster?.activeMonster && !state.monster?.activeDebuff) return null;

    if (!isModalOpen && state.monster?.activeMonster) {
        return (
            <div 
                className="glass-card active-pulse" 
                onClick={() => setIsModalOpen(true)}
                style={{
                    position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                    background: '#faedea', borderColor: 'var(--accent-red-dark)', cursor: 'pointer',
                    padding: '12px 24px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px'
                }}
            >
                <span style={{fontSize: '1.5rem'}}>⚠️</span>
                <strong>{state.monster.activeMonster.name} Mengintai!</strong>
            </div>
        );
    }

    if (state.monster?.activeDebuff) {
        return (
            <div 
                className="glass-card" 
                style={{
                    position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                    background: '#faedea', borderColor: 'var(--accent-red-dark)', 
                    padding: '12px 24px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px'
                }}
            >
                <span style={{fontSize: '1.5rem'}}>💀</span>
                <div>
                    <strong>Efek {state.monster.activeDebuff} Aktif!</strong>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                        Sisa waktu: {Math.max(0, Math.ceil((state.monster.debuffExpiresAt - Date.now())/60000))} menit.
                    </p>
                </div>
            </div>
        );
    }

    if (!active) return null;

    const timeLeftSec = Math.max(0, Math.floor((active.expiresAt - Date.now())/1000));

    return (
        <div className="modal-overlay" onPointerDown={handleTap} style={{ cursor: 'pointer' }}>
            <div className="offline-modal" style={{background: '#faedea', borderColor: 'var(--accent-red-dark)', cursor: 'default'}} onPointerDown={(e) => e.stopPropagation()}>
                <h2 style={{color: 'var(--accent-red-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                    <span>{active.icon}</span> {active.name}
                </h2>
                <p style={{fontWeight: 'bold', color: 'var(--text-main)'}}>{active.desc}</p>
                
                {!isDefeated && (
                    <p style={{color: 'var(--accent-red-dark)', fontSize: '0.9rem', marginBottom: '20px'}}>
                        Berubah wujud dalam: {Math.floor(timeLeftSec/3600)}h {Math.floor((timeLeftSec%3600)/60)}m
                    </p>
                )}

                <div style={{margin: '20px 0', background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '2px solid var(--border-color)', position: 'relative'}}>
                    {isDefeated ? (
                        <div style={{ padding: '40px 10px', textAlign: 'center', animation: 'popIn 0.5s ease-out forwards' }}>
                            <div style={{fontSize: '4rem', marginBottom: '10px'}}>🎉</div>
                            <h3 style={{color: 'var(--accent-green-dark)'}}>Monster Berhasil Diusir!</h3>
                            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Toko Anda aman untuk sementara waktu.</p>
                        </div>
                    ) : (
                        <>
                            <h4>Minigame Pengusiran</h4>
                            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px'}}>
                                Tap tombol saat jarum berada di area hijau!
                            </p>
                            
                            {/* The Timing Bar Game */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '30px',
                                background: '#d4cfc4',
                                borderRadius: '15px',
                                border: '2px solid var(--border-color)',
                                marginBottom: '20px',
                                overflow: 'hidden'
                            }}>
                                {/* Target Area (Green Box) */}
                                <div style={{
                                    position: 'absolute',
                                    left: `${targetStart}%`,
                                    width: `${TARGET_WIDTH}%`,
                                    height: '100%',
                                    background: 'var(--accent-green-dark)',
                                    opacity: 0.8
                                    /* Removed transition so it snaps instantly, preventing visual desync */
                                }}></div>

                                {/* Moving Needle */}
                                <div 
                                    ref={needleRef}
                                    style={{
                                        position: 'absolute',
                                        left: '0%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '6px',
                                        height: '40px',
                                        background: '#5c4033',
                                        borderRadius: '4px',
                                        zIndex: 10,
                                        transition: 'transform 0.1s, background-color 0.1s'
                                    }}
                                ></div>
                            </div>

                            <button 
                                onPointerDown={handleTap}
                                style={{ width: '100%', padding: '16px', fontSize: '1.2rem', background: 'var(--accent-yellow)', marginBottom: '20px' }}
                            >
                                TAP! (Atau sentuh layar)
                            </button>

                            <div style={{marginTop: '10px'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontWeight: 'bold'}}>
                                    <span>Progress</span>
                                    <span>{active.tapsDone} / {active.tapsNeeded}</span>
                                </div>
                                <div className="progress-bg">
                                    <div className="progress-fill" style={{width: `${(active.tapsDone / active.tapsNeeded)*100}%`}}></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {!isDefeated && <button style={{background: 'var(--bg-main)'}} onClick={() => setIsModalOpen(false)}>Sembunyikan</button>}
            </div>
        </div>
    );
};
