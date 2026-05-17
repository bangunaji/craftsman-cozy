import React from 'react';
import { useGame } from '../game/gameState';

const LEGENDARY_SET_IDS = ['l01', 'l02', 'l03', 'l04', 'l05', 'l06', 'l07'];

const EndgameProgress = () => {
    const { state } = useGame();
    const { upgrades, items } = state;

    const allMaxLevel = Object.values(upgrades).every(lvl => lvl >= 25);
    const craftedLegendaries = LEGENDARY_SET_IDS.filter(id => items[id] && items[id] > 0);
    const setCompleted = craftedLegendaries.length === LEGENDARY_SET_IDS.length;
    const isMasterBlacksmith = allMaxLevel && setCompleted;

    return (
        <div className="section-card" style={{ background: 'linear-gradient(135deg, #fdfaf3, #f4e8c1)', border: '2px solid #d4a373' }}>
            <h2 style={{ textAlign: 'center', color: '#5c4033', textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>🏆 Forge Master Progress 🏆</h2>
            
            {isMasterBlacksmith ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h1 style={{ color: '#d4a373', fontSize: '32px', margin: '10px 0' }}>Master Blacksmith</h1>
                    <p style={{ color: '#5c4033' }}>Kamu telah mencapai puncak seni tempa! Seluruh workshop mencapai level maksimal dan Set Legendaris telah diselesaikan.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="progress-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontWeight: 'bold', color: '#5c4033' }}>Pilar 1: Workshop Level 25</span>
                            <span style={{ color: allMaxLevel ? '#a3b18a' : '#d88978', fontWeight: 'bold' }}>
                                {allMaxLevel ? 'Selesai ✓' : 'Dalam Proses'}
                            </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '12px' }}>
                            <div>Miner: Lv {upgrades.miner}/25</div>
                            <div>Anvil: Lv {upgrades.anvil}/25</div>
                            <div>Furnace: Lv {upgrades.furnace}/25</div>
                            <div>Storage: Lv {upgrades.storage}/25</div>
                        </div>
                    </div>
                    
                    <div className="progress-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontWeight: 'bold', color: '#5c4033' }}>Pilar 2: Legendary Set (7 Item)</span>
                            <span style={{ color: setCompleted ? '#a3b18a' : '#d88978', fontWeight: 'bold' }}>
                                {craftedLegendaries.length}/7
                            </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#5c4033' }}>
                            Selesaikan crafting 7 item tingkat Legendary untuk membuktikan keahlianmu.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EndgameProgress;
