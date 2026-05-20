import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../game/gameState';
import { animate as animeAnimate } from 'animejs';

export const MonsterThreat = () => {
    const { state, repelMonster } = useGame();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDefeated, setIsDefeated] = useState(false);
    const [guardRepelAnim, setGuardRepelAnim] = useState(false);
    const [lastGuardRepel, setLastGuardRepel] = useState(false);

    // Performance refs
    const needleRef = useRef(null);
    const posRef = useRef(0);
    const modalRef = useRef(null);
    const monsterIconRef = useRef(null);

    const TARGET_WIDTH = 15;
    const [targetStart, setTargetStart] = useState(40);

    // ── Deteksi monster baru → screen shake + elastic popup
    useEffect(() => {
        if (state.monster?.activeMonster && !isModalOpen) {
            setIsModalOpen(true);
            setTargetStart(10 + Math.random() * 75);
            setIsDefeated(false);

            // Screen shake
            document.body.classList.add('screen-shake');
            setTimeout(() => document.body.classList.remove('screen-shake'), 600);

            // Modal pop-in elastic
            setTimeout(() => {
                if (modalRef.current) {
                    animeAnimate(modalRef.current, {
                        scale: [0.3, 1.08, 0.95, 1.0],
                        opacity: [0, 1],
                        duration: 700,
                        ease: 'outElastic(1, .6)',
                    });
                }
            }, 50);
        }
    }, [state.monster?.activeMonster]);

    // ── Guard auto-repel animasi
    useEffect(() => {
        const guardJustRepelled = state.monster?.autoRepelledByGuard && !lastGuardRepel;
        if (guardJustRepelled) {
            setGuardRepelAnim(true);
            setLastGuardRepel(true);

            if (monsterIconRef.current) {
                animeAnimate(monsterIconRef.current, {
                    translateX: [0, 300],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                    duration: 800,
                    ease: 'inQuad',
                });
            }
            setTimeout(() => {
                setGuardRepelAnim(false);
                setIsModalOpen(false);
            }, 1000);
        }
        if (!state.monster?.autoRepelledByGuard) {
            setLastGuardRepel(false);
        }
    }, [state.monster?.autoRepelledByGuard, lastGuardRepel]);

    // ── Needle animation loop (60fps, bypasses React)
    useEffect(() => {
        if (!isModalOpen || !state.monster?.activeMonster || isDefeated) return;

        let frameId;
        let pos = posRef.current || 0;
        let dir = 1;
        const speed = 1.0;

        const tick = () => {
            pos += speed * dir;
            if (pos >= 100) { pos = 100; dir = -1; }
            else if (pos <= 0) { pos = 0; dir = 1; }
            posRef.current = pos;
            if (needleRef.current) needleRef.current.style.left = `${pos}%`;
            frameId = requestAnimationFrame(tick);
        };
        tick();
        return () => cancelAnimationFrame(frameId);
    }, [isModalOpen, isDefeated]);

    const active = state.monster?.activeMonster;

    const handleTap = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!active || isDefeated) return;

        const currentPos = posRef.current;
        const success = currentPos >= targetStart - 2 && currentPos <= targetStart + TARGET_WIDTH + 2;

        if (success) {
            // Flash hijau
            if (needleRef.current) {
                animeAnimate(needleRef.current, {
                    scale: [1, 2, 1],
                    backgroundColor: ['#5c4033', '#4ade80', '#5c4033'],
                    duration: 300,
                    ease: 'outQuad',
                });
            }

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
            setTargetStart(10 + Math.random() * 75);

            // Guncangan kecil saat miss
            if (modalRef.current) {
                animeAnimate(modalRef.current, {
                    translateX: [-6, 6, -4, 4, 0],
                    duration: 300,
                    ease: 'linear',
                });
            }
            if (needleRef.current) {
                animeAnimate(needleRef.current, {
                    backgroundColor: ['#5c4033', '#ef4444', '#5c4033'],
                    duration: 300,
                    ease: 'outQuad',
                });
            }
        }
    };

    if (!state.monster?.activeMonster && !state.monster?.activeDebuff) return null;

    // Guard repel banner
    if (guardRepelAnim) {
        return (
            <div style={{
                position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #166534, #15803d)',
                color: 'white', borderRadius: '20px', padding: '16px 28px',
                zIndex: 1100, display: 'flex', alignItems: 'center', gap: '12px',
                boxShadow: '0 8px 32px rgba(21, 128, 61, 0.5)'
            }}>
                <span style={{ fontSize: '2rem' }}>🛡️</span>
                <div>
                    <div style={{ fontWeight: 900, fontSize: '1rem' }}>Guard Mengusir Monster!</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Penjaga kita berhasil memukul mundur musuh.</div>
                </div>
                <span ref={monsterIconRef} style={{ fontSize: '2rem', marginLeft: '8px' }}>
                    {active?.icon || '👺'}
                </span>
            </div>
        );
    }

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
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <strong>{state.monster.activeMonster.name} Mengintai!</strong>
            </div>
        );
    }

    if (state.monster?.activeDebuff) {
        return (
            <div className="glass-card" style={{
                position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                background: '#faedea', borderColor: 'var(--accent-red-dark)',
                padding: '12px 24px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px'
            }}>
                <span style={{ fontSize: '1.5rem' }}>💀</span>
                <div>
                    <strong>Efek {state.monster.activeDebuff} Aktif!</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Sisa: {Math.max(0, Math.ceil((state.monster.debuffExpiresAt - Date.now()) / 60000))} menit
                    </p>
                </div>
            </div>
        );
    }

    if (!active) return null;

    const timeLeftSec = Math.max(0, Math.floor((active.expiresAt - Date.now()) / 1000));

    return (
        <div className="modal-overlay" onPointerDown={handleTap} style={{ cursor: 'pointer' }}>
            <div
                ref={modalRef}
                className="offline-modal"
                style={{ background: '#faedea', borderColor: 'var(--accent-red-dark)', cursor: 'default' }}
                onPointerDown={(e) => e.stopPropagation()}
            >
                <h2 style={{ color: 'var(--accent-red-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>{active.icon}</span> {active.name}
                </h2>
                <p style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{active.desc}</p>

                {!isDefeated && (
                    <p style={{ color: 'var(--accent-red-dark)', fontSize: '0.9rem', marginBottom: '20px' }}>
                        ⏱️ Berubah wujud: {Math.floor(timeLeftSec / 3600)}h {Math.floor((timeLeftSec % 3600) / 60)}m
                    </p>
                )}

                <div style={{
                    margin: '20px 0', background: 'var(--bg-card)', padding: '20px',
                    borderRadius: '16px', border: '2px solid var(--border-color)', position: 'relative'
                }}>
                    {isDefeated ? (
                        <div style={{ padding: '40px 10px', textAlign: 'center', animation: 'popIn 0.5s ease-out forwards' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🎉</div>
                            <h3 style={{ color: 'var(--accent-green-dark)' }}>Monster Berhasil Diusir!</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Toko Anda aman untuk sementara.</p>
                        </div>
                    ) : (
                        <>
                            <h4>Minigame Pengusiran</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                                Tap saat jarum berada di area hijau!
                            </p>

                            <div style={{
                                position: 'relative', width: '100%', height: '30px',
                                background: '#d4cfc4', borderRadius: '15px',
                                border: '2px solid var(--border-color)', marginBottom: '20px', overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute', left: `${targetStart}%`, width: `${TARGET_WIDTH}%`,
                                    height: '100%', background: 'var(--accent-green-dark)', opacity: 0.8
                                }} />
                                <div ref={needleRef} style={{
                                    position: 'absolute', left: '0%', top: '50%',
                                    transform: 'translate(-50%, -50%)', width: '6px', height: '40px',
                                    background: '#5c4033', borderRadius: '4px', zIndex: 10,
                                    transition: 'background-color 0.1s'
                                }} />
                            </div>

                            <button
                                onPointerDown={handleTap}
                                style={{ width: '100%', padding: '16px', fontSize: '1.2rem', background: 'var(--accent-yellow)', marginBottom: '20px' }}
                            >
                                TAP! (Atau sentuh layar)
                            </button>

                            <div style={{ marginTop: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontWeight: 'bold' }}>
                                    <span>Progress</span>
                                    <span>{active.tapsDone} / {active.tapsNeeded}</span>
                                </div>
                                <div className="progress-bg">
                                    <div className="progress-fill" style={{ width: `${(active.tapsDone / active.tapsNeeded) * 100}%` }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {!isDefeated && (
                    <button style={{ background: 'var(--bg-main)' }} onClick={() => setIsModalOpen(false)}>Sembunyikan</button>
                )}
            </div>
        </div>
    );
};
