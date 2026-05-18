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
};\n`;

const itemsConfig = `export const ITEMS = ${JSON.stringify(itemsData, null, 2)};\n`;

const areasConfig = `
export const AREAS = {
  area_1: { id: 'area_1', name: 'Greenhorn Outskirts', reqFurnace: 0, rates: { stone: 40, wood: 30, iron: 20, clay: 10 } },
  area_2: { id: 'area_2', name: 'Bamboo Forest', reqFurnace: 3, rates: { wood: 40, bamboo_crystal: 25, amber: 20, iron: 15 } },
  area_3: { id: 'area_3', name: 'Silvermine Depths', reqFurnace: 4, rates: { stone: 30, iron: 30, copper: 25, silver: 15 } },
  area_4: { id: 'area_4', name: 'Moonlit Grotto', reqFurnace: 7, rates: { gold: 35, jade: 30, moonstone: 20, mithril: 15 } },
  area_5: { id: 'area_5', name: 'Dragon\\'s Peak', reqFurnace: 12, rates: { obsidian: 40, dragonite: 30, gold: 20, mithril: 10 } },
  area_6: { id: 'area_6', name: 'Aurora Tundra', reqFurnace: 14, rates: { aurora_stone: 45, adamantite: 35, dragonite: 20 } },
  area_7: { id: 'area_7', name: 'Ethereal Void', reqFurnace: 18, rates: { ethereal_crystal: 40, voidstone: 30, sunfire_ore: 20, divine_ingot: 10 } }
};\n`;

const upgradesConfig = `
export const UPGRADES = {
  miner: {
    id: 'miner', name: 'Auto-Miner', icon: '⛏️', desc: 'Otomatis menambang ore tiap detik.',
    baseCost: 80, costMultiplier: 1.5,
    effect: (level) => +(level * 0.2).toFixed(1), // FIXED: Laju awal lebih lambat (0.2/sec) agar gudang aman
  },
  quarry: {
    id: 'quarry', name: 'Quarry', icon: '🪨', desc: 'Membuka area alam dan material kristal.',
    baseCost: 100, costMultiplier: 1.5, effect: (level) => level,
  },
  furnace: {
    id: 'furnace', name: 'Furnace', icon: '🔥', desc: 'Membuka resep perkakas & logam murni.',
    baseCost: 200, costMultiplier: 1.5, effect: (level) => level,
  },
  smelter: {
    id: 'smelter', name: 'Smelter', icon: '♨️', desc: 'Membuka peleburan logam campuran.',
    baseCost: 350, costMultiplier: 1.5, effect: (level) => level,
  },
  anvil: {
    id: 'anvil', name: 'Anvil', icon: '🔨', desc: 'Membuka resep senjata & armor.',
    baseCost: 150, costMultiplier: 1.5,
    effect: (level) => {
      let reduction = 5;
      if (level >= 14) reduction = 10;
      if (level >= 22) reduction = 15;
      return level * reduction;
    },
  },
  alchemist: {
    id: 'alchemist', name: 'Alchemist Lab', icon: '🧪', desc: 'Membuka sihir & resep alam (Rare).',
    baseCost: 500, costMultiplier: 1.5, effect: (level) => level,
  },
  enchanter: {
    id: 'enchanter', name: 'Enchanter', icon: '✨', desc: 'Gerbang utama resep Epic & Legendary.',
    baseCost: 1000, costMultiplier: 1.5, effect: (level) => level,
  },
  storage: {
    id: 'storage', name: 'Storage', icon: '📦', desc: 'Kapasitas maksimal ore untuk offline.',
    baseCost: 60, costMultiplier: 1.5,
    effect: (level) => {
      let capacity = 300; // FIXED: Base naik jadi 300
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
    3: { type: 'orders', amount: 10, msg: 'Selesaikan 10 pesanan NPC' },
    6: { type: 'orders', amount: 20, msg: 'Selesaikan 20 pesanan NPC' },
  },
  furnace: {
    3: { type: 'ore', ore: 'iron', amount: 50, msg: 'Miliki 50 Iron di storage' },
    5: { type: 'ore', ore: 'silver', amount: 20, msg: 'Miliki 20 Silver di storage' }, // FIXED: Soft-lock Gold
    10: { type: 'ore', ore: 'gold', amount: 30, msg: 'Miliki 30 Gold di storage' },
  },
  miner: {
    8: { type: 'avg_level', amount: 5, msg: 'Rata-rata level bangunan lain minimal 5' }
  }
};\n`;

const initialStateConfig = `
export const INITIAL_STATE = {
  coins: 0,
  cidiCoins: 1000,
  storageExpanders: 0,
  turboMinerExpiry: 0,
  autoSubmitOrdersExpiry: 0,
  activeAreaId: 'area_1',
  monster: { activeMonster: null, nextSpawnTime: Date.now() + 5 * 60 * 1000, activeDebuff: null, debuffExpiresAt: 0 },
  bodyguard: { activeId: null, expiresAt: 0 },
  ores: {
    stone: 0, iron: 0, wood: 0, clay: 0,
    copper: 0, silver: 0, bamboo_crystal: 0, amber: 0,
    gold: 0, jade: 0, moonstone: 0, mithril: 0,
    obsidian: 0, dragonite: 0, aurora_stone: 0, adamantite: 0,
    ethereal_crystal: 0, voidstone: 0, sunfire_ore: 0, divine_ingot: 0
  },
  items: Object.keys(ITEMS).reduce((acc, key) => { acc[key] = 0; return acc; }, { blueprint: 0 }),
  upgrades: {
    miner: 0, quarry: 0, furnace: 0, smelter: 0, anvil: 0, alchemist: 0, enchanter: 0, storage: 0
  },
  stats: { totalOrdersCompleted: 0, storageFilledCount: 0 },
  lastSaveTime: Date.now(),
  runStartTime: Date.now(),
  lastOrderResetTime: 0,
  orders: [],
  activeCrafts: []
};\n`;

fs.writeFileSync('src/game/gameConfig.js', oresConfig + itemsConfig + areasConfig + upgradesConfig + initialStateConfig);
console.log('gameConfig.js generated successfully with 8 Buildings and AREAS!');