import React from 'react';
import { useGame } from '../game/gameState';

const STORE_ITEMS = [
    { id: 'skip_15m', name: 'Time Skip 15m', cost: 25, type: 'qol', desc: 'Mempercepat semua proses crafting aktif selama 15 menit.', icon: '⏱️' },
    { id: 'skip_1h', name: 'Time Skip 1h', cost: 80, type: 'qol', desc: 'Mempercepat semua proses crafting aktif selama 1 jam.', icon: '⏳' },
    { id: 'skip_4h', name: 'Time Skip 4h', cost: 250, type: 'qol', desc: 'Mempercepat semua proses crafting aktif selama 4 jam.', icon: '⌛' },
    { id: 'storage_exp', name: 'Storage Expander', cost: 200, type: 'progression', desc: '+100 Kapasitas Gudang Permanen (Maks 2x).', icon: '📦' },
    { id: 'turbo_miner_2h', name: 'Turbo Miner (2h)', cost: 100, type: 'boost', desc: '2x hasil mining selama 2 jam.', icon: '⛏️' }
];

export const Store = () => {
    const { state, buyStoreItem } = useGame();

    return (
        <div className="store-area">
            <h2>💎 CiDi Coin Store</h2>
            
            <div className="glass-card" style={{padding: '20px', textAlign: 'center', marginBottom: '24px', background: 'linear-gradient(135deg, #fdf5e6, #fffcf5)'}}>
                <h3 style={{color: '#d4a373', fontSize: '1.2rem', margin: '0 0 8px 0'}}>Saldo CiDi Coin Anda</h3>
                <div style={{fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)'}}>
                    💎 {state.cidiCoins || 0}
                </div>
                <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px'}}>
                    *Untuk keperluan Demo/MVP, Anda diberikan 1000 koin gratis.
                </p>
            </div>

            <div className="store-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {STORE_ITEMS.map(item => {
                    const isStorageExp = item.id === 'storage_exp';
                    const maxed = isStorageExp && (state.storageExpanders || 0) >= 2;
                    
                    return (
                        <div key={item.id} className="store-item glass-card" style={{display: 'flex', alignItems: 'center', padding: '16px', gap: '16px', opacity: maxed ? 0.6 : 1}}>
                            <div style={{fontSize: '2.5rem'}}>{item.icon}</div>
                            <div style={{flex: 1}}>
                                <h4 style={{margin: '0 0 4px 0', fontSize: '1.1rem'}}>{item.name}</h4>
                                <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4'}}>
                                    {item.desc}
                                </p>
                                {isStorageExp && <div style={{fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-green-dark)', marginTop: '4px'}}>Dimiliki: {state.storageExpanders || 0}/2</div>}
                            </div>
                            <button 
                                onClick={() => buyStoreItem(item.id, item.cost)}
                                disabled={maxed || (state.cidiCoins || 0) < item.cost}
                                style={{
                                    background: 'var(--bg-card)', 
                                    border: '2px solid #d4a373',
                                    color: '#d4a373',
                                    padding: '8px 16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '2px'
                                }}
                            >
                                <span style={{fontSize: '0.8rem', color: 'var(--text-main)'}}>{maxed ? 'Maksimal' : 'Beli'}</span>
                                {!maxed && <span style={{fontWeight: 900}}>💎 {item.cost}</span>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
