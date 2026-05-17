const fs = require('fs');

const itemsData = JSON.parse(fs.readFileSync('generated_items.json', 'utf8'));

const oresConfig = `export const ORES = {
  stone: { id: 'stone', name: 'Stone', icon: '🪨', baseValue: 1, dropRate: 35, tier: 1 },
  iron: { id: 'iron', name: 'Iron', icon: '🔩', baseValue: 5, dropRate: 20, tier: 1 },
  wood: { id: 'wood', name: 'Wood', icon: '🪵', baseValue: 3, dropRate: 15, tier: 1 },
  clay: { id: 'clay', name: 'Clay', icon: '🏺', baseValue: 2, dropRate: 10, tier: 1 },
  
  copper: { id: 'copper', name: 'Copper', icon: '🪙', baseValue: 10, dropRate: 6, tier: 2 },
  silver: { id: 'silver', name: 'Silver', icon: '🥈', baseValue: 15, dropRate: 4, tier: 2 },
  bamboo_crystal: { id: 'bamboo_crystal', name: 'Bamboo Crystal', icon: '🎋', baseValue: 20, dropRate: 3, tier: 2 },
  amber: { id: 'amber', name: 'Amber', icon: '🍯', baseValue: 25, dropRate: 2, tier: 2 },
  
  gold: { id: 'gold', name: 'Gold', icon: '🥇', baseValue: 40, dropRate: 1.5, tier: 3 },
  jade: { id: 'jade', name: 'Jade', icon: '📿', baseValue: 50, dropRate: 1, tier: 3 },
  moonstone: { id: 'moonstone', name: 'Moonstone', icon: '🌜', baseValue: 60, dropRate: 0.8, tier: 3 },
  mithril: { id: 'mithril', name: 'Mithril', icon: '✨', baseValue: 70, dropRate: 0.6, tier: 3 },
  
  obsidian: { id: 'obsidian', name: 'Obsidian', icon: '⬛', baseValue: 100, dropRate: 0.4, tier: 4 },
  dragonite: { id: 'dragonite', name: 'Dragonite', icon: '🐲', baseValue: 120, dropRate: 0.3, tier: 4 },
  aurora_stone: { id: 'aurora_stone', name: 'Aurora Stone', icon: '🌌', baseValue: 150, dropRate: 0.2, tier: 4 },
  adamantite: { id: 'adamantite', name: 'Adamantite', icon: '🦾', baseValue: 200, dropRate: 0.15, tier: 4 },
  
  ethereal_crystal: { id: 'ethereal_crystal', name: 'Ethereal Crystal', icon: '🔮', baseValue: 300, dropRate: 0.1, tier: 5 },
  voidstone: { id: 'voidstone', name: 'Voidstone', icon: '🕳️', baseValue: 400, dropRate: 0.07, tier: 5 },
  sunfire_ore: { id: 'sunfire_ore', name: 'Sunfire Ore', icon: '☀️', baseValue: 500, dropRate: 0.05, tier: 5 },
  divine_ingot: { id: 'divine_ingot', name: 'Divine Ingot', icon: '👼', baseValue: 800, dropRate: 0.03, tier: 5 }
};
`;

const itemsConfig = `export const ITEMS = ${JSON.stringify(itemsData, null, 2)};\n`;

const upgradesConfig = `
export const UPGRADES = {
  miner: {
    id: 'miner',
    name: 'Auto-Miner',
    icon: '⛏️',
    desc: 'Otomatis menambang ore tiap detik.',
    baseCost: 80,
    costMultiplier: 1.5,
    effect: (level) => {
      let multiplier = 1;
      if (level >= 12) multiplier = 1.5;
      if (level >= 17) multiplier = 2;
      return level * 1 * multiplier;
    },
  },
  anvil: {
    id: 'anvil',
    name: 'Anvil (Landasan)',
    icon: '🔨',
    desc: 'Mempercepat waktu craft & menambah Slot.',
    baseCost: 150,
    costMultiplier: 1.5,
    effect: (level) => {
      let reduction = 5;
      if (level >= 14) reduction = 10;
      if (level >= 22) reduction = 15;
      return level * reduction;
    },
  },
  furnace: {
    id: 'furnace',
    name: 'Furnace (Tungku)',
    icon: '🔥',
    desc: 'Membuka resep item baru (Tier 2-5).',
    baseCost: 200,
    costMultiplier: 1.5,
    effect: (level) => level,
  },
  storage: {
    id: 'storage',
    name: 'Storage (Gudang)',
    icon: '📦',
    desc: 'Kapasitas maksimal ore untuk offline.',
    baseCost: 60,
    costMultiplier: 1.5,
    effect: (level) => {
      // Base 150. Level 1-12 (+50), Level 13-19 (+100), Level 20-25 (+200)
      let capacity = 150;
      for (let i = 1; i <= level; i++) {
        if (i >= 20) capacity += 200;
        else if (i >= 13) capacity += 100;
        else capacity += 50;
      }
      return capacity;
    },
  }
};

export const HARD_GATES = {
  anvil: {
    3: { type: 'orders', amount: 10, msg: 'Selesaikan minimal 10 pesanan NPC' },
    // Simplified specific NPC orders to general orders for ease of implementation right now
    6: { type: 'orders', amount: 20, msg: 'Selesaikan 20 pesanan NPC' },
    10: { type: 'orders', amount: 30, msg: 'Selesaikan 30 pesanan NPC' },
  },
  furnace: {
    3: { type: 'ore', ore: 'iron', amount: 50, msg: 'Miliki 50 Iron di storage' },
    5: { type: 'ore', ore: 'gold', amount: 20, msg: 'Miliki 20 Gold di storage' },
    10: { type: 'ore', ore: 'jade', amount: 10, msg: 'Miliki 10 Jade di storage' },
  },
  storage: {
    5: { type: 'storage_full', amount: 1, msg: 'Pernah penuhkan storage 1x' }
  },
  miner: {
    8: { type: 'avg_level', amount: 5, msg: 'Workshop average level minimal 5' }
  }
};
`;

const initialStateConfig = `
export const INITIAL_STATE = {
  coins: 0,
  ores: {
    stone: 0, iron: 0, wood: 0, clay: 0,
    copper: 0, silver: 0, bamboo_crystal: 0, amber: 0,
    gold: 0, jade: 0, moonstone: 0, mithril: 0,
    obsidian: 0, dragonite: 0, aurora_stone: 0, adamantite: 0,
    ethereal_crystal: 0, voidstone: 0, sunfire_ore: 0, divine_ingot: 0
  },
  items: Object.keys(ITEMS).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {}),
  upgrades: {
    miner: 0,
    anvil: 0,
    furnace: 0,
    storage: 0,
  },
  stats: {
    totalOrdersCompleted: 0,
    storageFilledCount: 0
  },
  lastSaveTime: Date.now(),
  runStartTime: Date.now(),
  lastOrderResetTime: 0,
  orders: [],
  activeCrafts: [] // { itemId, startTime, endTime }
};
`;

const fileContent = oresConfig + '\n' + itemsConfig + '\n' + upgradesConfig + '\n' + initialStateConfig;

fs.writeFileSync('src/game/gameConfig.js', fileContent);
console.log('gameConfig.js generated successfully');
