export const MONSTERS = {
    goblin: { id: 'goblin', name: 'Goblin Thief', tapsNeeded: 15, timeLimit: 2 * 3600 * 1000, icon: '👺', desc: 'Curi 15-25% ore dari storage jika tidak diusir.' },
    imp: { id: 'imp', name: 'Furnace Imp', tapsNeeded: 20, timeLimit: 3 * 3600 * 1000, icon: '👿', desc: 'Crafting melambat 50% selama 1 jam.' },
    wraith: { id: 'wraith', name: 'Wind Wraith', tapsNeeded: 10, timeLimit: 4 * 3600 * 1000, icon: '👻', desc: 'Blokir Auto-Miner selama 2 jam.' },
    crawler: { id: 'crawler', name: 'Stone Crawler', tapsNeeded: 25, timeLimit: 2 * 3600 * 1000, icon: '🪨', desc: 'Curi ore + lambatkan mining 30%.' },
    watcher: { id: 'watcher', name: 'Shadow Watcher', tapsNeeded: 30, timeLimit: 6 * 3600 * 1000, icon: '👁️', desc: 'Sembunyikan Market selama 3 jam.' },
    drake: { id: 'drake', name: 'Ember Drake', tapsNeeded: 35, timeLimit: 2 * 3600 * 1000, icon: '🐉', desc: 'Curi ore + blokir 1 crafting slot 2 jam.' }
};

export const getRandomMonster = (workshopAvgLevel) => {
    const pool = ['goblin', 'imp', 'wraith'];
    if (workshopAvgLevel >= 9) pool.push('crawler');
    if (workshopAvgLevel >= 15) { pool.push('watcher'); pool.push('drake'); }
    
    const id = pool[Math.floor(Math.random() * pool.length)];
    return { ...MONSTERS[id], tapsDone: 0, expiresAt: Date.now() + MONSTERS[id].timeLimit };
};

export const BODYGUARDS = [
    { id: 'guard_village', name: 'Village Guard', durationHrs: 6, baseCost: 80, icon: '🛡️' },
    { id: 'guard_knight', name: 'Mercenary Knight', durationHrs: 12, baseCost: 150, icon: '⚔️' },
    { id: 'guard_elite', name: 'Elite Guardian', durationHrs: 24, baseCost: 280, icon: '🏰' },
    { id: 'guard_arcane', name: 'Arcane Warden', durationHrs: 48, baseCost: 500, icon: '🔮' }
];

export const getBodyguardCost = (baseCost, avgLevel) => {
    return Math.floor(baseCost * Math.pow(1.08, avgLevel));
};
