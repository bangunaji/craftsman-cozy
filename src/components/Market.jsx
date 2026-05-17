import React, { useEffect, useState } from 'react';
import { useGame } from '../game/gameState';
import { ITEMS } from '../game/gameConfig';
import { generateOrders } from '../game/orderSystem';
import { BODYGUARDS, getBodyguardCost } from '../game/monsterSystem';

export const Market = () => {
    const { state, fulfillOrder, acceptOrder, sellItem, updateOrders, hireBodyguard } = useGame();
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [timeLeft, setTimeLeft] = useState('');
    const [selectedNpcOrder, setSelectedNpcOrder] = useState(null);

    useEffect(() => {
        const now = new Date();
        const lastReset = new Date(state.lastOrderResetTime || 0);
        
        const isNewDay = now.getDate() !== lastReset.getDate() ||
                         now.getMonth() !== lastReset.getMonth() ||
                         now.getFullYear() !== lastReset.getFullYear();

        if (isNewDay) {
            updateOrders(generateOrders(1));
        }
    }, [state.lastOrderResetTime, updateOrders]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            const diff = endOfDay - now;
            
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            
            setTimeLeft(`${h}h ${m}m ${s}s`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="market-area">
            <h2>Market</h2>
            
            <div className="orders-section">
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '16px'}}>
                    <h3 style={{margin: 0}}>👥 Visitors (Tap to talk)</h3>

                </div>
                <div className="visitors-scroll">
                    {state.orders.filter(o => o.status === 'pending').map(order => (
                        <div 
                            key={order.id} 
                            onClick={() => setSelectedNpcOrder(order)}
                            className="npc-card" 
                            style={{
                                cursor: 'pointer', 
                                padding: '16px', 
                                borderRadius: '20px', 
                                border: '3px solid var(--border-color)', 
                                background: '#fffcf5',
                                boxShadow: '0 4px 0 0 #d4a373',
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                minWidth: '120px'
                            }}
                        >
                            <span style={{fontSize: '3rem', marginBottom: '8px'}}>👤</span>
                            <h4 style={{margin: 0, textAlign: 'center', fontSize: '1rem', color: '#d4a373'}}>{order.npcName}</h4>
                        </div>
                    ))}
                    {state.orders.filter(o => o.status === 'pending').length === 0 && (
                        <p style={{color: 'var(--text-muted)', fontStyle: 'italic'}}>Tidak ada pengunjung saat ini.</p>
                    )}
                </div>

                <h3 style={{marginTop: '24px'}}>📋 Active Orders</h3>
                <div className="orders-list">
                    {state.orders.filter(o => o.status !== 'pending').length === 0 ? (
                        <div className="all-orders-done glass-card" style={{textAlign: 'center', padding: '2rem'}}>
                            <h4>🎉 No Active Orders!</h4>
                            <p>Check the visitors above or wait for tomorrow.</p>
                            <span className="countdown" style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green-dark)'}}>{timeLeft}</span>
                        </div>
                    ) : (
                        state.orders.filter(o => o.status !== 'pending').map(order => {
                            const hasItems = Object.entries(order.requirements).every(
                                ([item, amt]) => state.items[item] >= amt
                            );

                            const timeLeftMs = Math.max(0, order.expiresAt - currentTime);
                            const h = Math.floor(timeLeftMs / (1000 * 60 * 60));
                            const m = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
                            const s = Math.floor((timeLeftMs % (1000 * 60)) / 1000);
                            const isExpired = timeLeftMs === 0;

                            return (
                                <div key={order.id} className={`order-card ${order.difficulty} ${isExpired ? 'expired' : ''}`} style={isExpired ? {opacity: 0.6, filter: 'grayscale(1)'} : {}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <h4>{order.npcName}</h4>
                                        <span style={{color: isExpired ? 'var(--accent-red-dark)' : 'var(--text-main)', fontWeight: 'bold'}}>
                                            {isExpired ? 'Kedaluwarsa' : `⏱️ ${h}h ${m}m ${s}s`}
                                        </span>
                                    </div>
                                    <div className="order-reqs">
                                        {Object.entries(order.requirements).map(([item, amt]) => (
                                            <span key={item} className={state.items[item] >= amt ? 'has-item' : 'need-item'}>
                                                {ITEMS[item].icon} {state.items[item] || 0}/{amt}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="order-reward">
                                        💰 {order.rewardCoins} Coins
                                        {order.extraReward && <div style={{fontSize: '1rem', color: 'var(--text-main)', marginTop: '4px'}}>✨ {order.extraReward}</div>}
                                    </div>
                                    <div style={{display: 'flex', gap: '0.5rem'}}>
                                        <button 
                                            style={{flex: 2}}
                                            disabled={!hasItems || isExpired}
                                            onClick={() => fulfillOrder(order.id, order.rewardCoins)}
                                        >
                                            {isExpired ? 'Gagal' : 'Serahkan Barang'}
                                        </button>
                                        {isExpired && (
                                            <button style={{flex: 1, background: '#d4cfc4', color: '#5c4033'}} onClick={() => updateOrders(state.orders.filter(o => o.id !== order.id))}>Hapus</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="sell-section" style={{marginTop: '32px'}}>
                <h3>Direct Sell</h3>
                <div className="sell-grid">
                    {Object.values(ITEMS).map(item => {
                        const count = state.items[item.id] || 0;
                        if (count === 0) return null; // Only show items we have
                        
                        return (
                            <div key={item.id} className="sell-card">
                                <span className="item-icon">{item.icon}</span>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Owned: {count}</p>
                                </div>
                                <button onClick={() => sellItem(item.id, item.basePrice)}>
                                    Sell (💰 {item.basePrice})
                                </button>
                            </div>
                        );
                    })}
                    {Object.values(ITEMS).every(item => (state.items[item.id] || 0) === 0) && (
                        <p className="empty-message">No items to sell. Go craft some!</p>
                    )}
                </div>
            </div>

            <div className="tavern-section" style={{marginTop: '32px', paddingBottom: '20px'}}>
                <h3>🛡️ Mercenary Tavern</h3>
                <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px'}}>
                    Sewa penjaga untuk mengusir monster secara otomatis! (Aktif: {state.bodyguard?.expiresAt > currentTime ? BODYGUARDS.find(b => b.id === state.bodyguard.activeId)?.name : 'Tidak Ada'})
                </p>
                <div className="sell-grid">
                    {BODYGUARDS.map(guard => {
                        const avgLevel = Math.floor((state.upgrades.miner + state.upgrades.anvil + state.upgrades.furnace + state.upgrades.storage) / 4);
                        const cost = getBodyguardCost(guard.baseCost, avgLevel);
                        const isActive = state.bodyguard?.activeId === guard.id && state.bodyguard?.expiresAt > currentTime;
                        
                        return (
                            <div key={guard.id} className="sell-card" style={{border: isActive ? '2px solid var(--accent-green-dark)' : '2px solid var(--border-color)', opacity: isActive ? 0.7 : 1}}>
                                <span className="item-icon">{guard.icon}</span>
                                <div>
                                    <h4 style={{fontSize: '0.9rem'}}>{guard.name}</h4>
                                    <p style={{fontSize: '0.8rem'}}>{guard.durationHrs} Jam</p>
                                </div>
                                <button 
                                    onClick={() => hireBodyguard(guard.id, cost)}
                                    disabled={isActive || state.coins < cost}
                                    style={{fontSize: '0.9rem', padding: '6px 12px'}}
                                >
                                    {isActive ? 'Sedang Bertugas' : `Sewa (💰 ${cost})`}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* NPC Dialog Modal */}
            {selectedNpcOrder && (
                <div className="modal-overlay" onClick={() => setSelectedNpcOrder(null)}>
                    <div 
                        className="offline-modal" 
                        onClick={e => e.stopPropagation()}
                        style={{background: '#fffcf5', borderColor: '#d4a373'}}
                    >
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px'}}>
                            <span style={{fontSize: '3.5rem'}}>👤</span>
                            <h2 style={{color: '#d4a373', margin: 0}}>{selectedNpcOrder.npcName}</h2>
                        </div>
                        <p style={{fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '24px', lineHeight: '1.5'}}>
                            "{selectedNpcOrder.dialog}"
                        </p>
                        
                        <div style={{background: 'var(--bg-main)', padding: '16px', borderRadius: '16px', border: '2px solid var(--border-color)', marginBottom: '24px'}}>
                            <h4 style={{marginBottom: '8px'}}>Minta:</h4>
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px'}}>
                                {Object.entries(selectedNpcOrder.requirements).map(([item, amt]) => (
                                    <span key={item} style={{padding: '4px 8px', background: 'white', borderRadius: '8px', border: '2px solid var(--border-color)', fontSize: '0.9rem', fontWeight: 800}}>
                                        {ITEMS[item].icon} {ITEMS[item].name} x{amt}
                                    </span>
                                ))}
                            </div>
                            <h4 style={{marginBottom: '4px'}}>Hadiah:</h4>
                            <div style={{color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: 900}}>
                                💰 {selectedNpcOrder.rewardCoins} Coins
                            </div>
                            {selectedNpcOrder.extraReward && (
                                <div style={{color: 'var(--accent-green-dark)', fontWeight: 800, marginTop: '4px'}}>
                                    ✨ {selectedNpcOrder.extraReward}
                                </div>
                            )}
                        </div>

                        <div style={{display: 'flex', gap: '12px'}}>
                            <button 
                                style={{flex: 1, background: 'var(--accent-green)'}} 
                                onClick={() => {
                                    acceptOrder(selectedNpcOrder.id);
                                    setSelectedNpcOrder(null);
                                }}
                            >
                                Terima<br/>({selectedNpcOrder.durationHours} Jam)
                            </button>
                            <button 
                                style={{flex: 1, background: 'var(--accent-red)'}} 
                                onClick={() => {
                                    updateOrders(state.orders.filter(o => o.id !== selectedNpcOrder.id));
                                    setSelectedNpcOrder(null);
                                }}
                            >
                                Tolak
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
