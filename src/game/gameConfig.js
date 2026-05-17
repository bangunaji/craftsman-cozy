export const ORES = {
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

export const ITEMS = {
  "c01": {
    "id": "c01",
    "name": "Clay Pot",
    "icon": "⚪",
    "materials": {
      "clay": 3
    },
    "craftTime": 20,
    "basePrice": 10,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c02": {
    "id": "c02",
    "name": "Wooden Stick",
    "icon": "⚪",
    "materials": {
      "wood": 2
    },
    "craftTime": 15,
    "basePrice": 12,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c03": {
    "id": "c03",
    "name": "Stone Ring",
    "icon": "⚪",
    "materials": {
      "stone": 2
    },
    "craftTime": 30,
    "basePrice": 18,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c04": {
    "id": "c04",
    "name": "Iron Nail",
    "icon": "⚪",
    "materials": {
      "iron": 1
    },
    "craftTime": 20,
    "basePrice": 20,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c05": {
    "id": "c05",
    "name": "Wooden Shield",
    "icon": "⚪",
    "materials": {
      "wood": 4,
      "iron": 1
    },
    "craftTime": 45,
    "basePrice": 35,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c06": {
    "id": "c06",
    "name": "Stone Axe",
    "icon": "⚪",
    "materials": {
      "stone": 3,
      "wood": 1
    },
    "craftTime": 40,
    "basePrice": 38,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c07": {
    "id": "c07",
    "name": "Clay Brick",
    "icon": "⚪",
    "materials": {
      "clay": 5
    },
    "craftTime": 35,
    "basePrice": 40,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c08": {
    "id": "c08",
    "name": "Iron Dagger",
    "icon": "⚪",
    "materials": {
      "iron": 2,
      "wood": 1
    },
    "craftTime": 50,
    "basePrice": 45,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c09": {
    "id": "c09",
    "name": "Wooden Bow",
    "icon": "⚪",
    "materials": {
      "wood": 5,
      "stone": 2
    },
    "craftTime": 55,
    "basePrice": 48,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c10": {
    "id": "c10",
    "name": "Iron Sword",
    "icon": "⚪",
    "materials": {
      "stone": 4,
      "iron": 2
    },
    "craftTime": 60,
    "basePrice": 55,
    "reqFurnace": 0,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c11": {
    "id": "c11",
    "name": "Stone Wall Piece",
    "icon": "⚪",
    "materials": {
      "stone": 6,
      "clay": 2
    },
    "craftTime": 65,
    "basePrice": 60,
    "reqFurnace": 1,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c12": {
    "id": "c12",
    "name": "Iron Shield",
    "icon": "⚪",
    "materials": {
      "stone": 6,
      "iron": 3
    },
    "craftTime": 80,
    "basePrice": 75,
    "reqFurnace": 1,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c13": {
    "id": "c13",
    "name": "Wooden Chest",
    "icon": "⚪",
    "materials": {
      "wood": 6,
      "iron": 2
    },
    "craftTime": 75,
    "basePrice": 70,
    "reqFurnace": 1,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c14": {
    "id": "c14",
    "name": "Clay Vase",
    "icon": "⚪",
    "materials": {
      "clay": 4,
      "stone": 1
    },
    "craftTime": 60,
    "basePrice": 65,
    "reqFurnace": 1,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c15": {
    "id": "c15",
    "name": "Iron Helm",
    "icon": "⚪",
    "materials": {
      "iron": 5,
      "stone": 2
    },
    "craftTime": 90,
    "basePrice": 90,
    "reqFurnace": 2,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c16": {
    "id": "c16",
    "name": "Stone Hammer",
    "icon": "⚪",
    "materials": {
      "stone": 4,
      "iron": 3
    },
    "craftTime": 85,
    "basePrice": 85,
    "reqFurnace": 2,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c17": {
    "id": "c17",
    "name": "Wooden Spear",
    "icon": "⚪",
    "materials": {
      "wood": 6,
      "stone": 2,
      "iron": 1
    },
    "craftTime": 95,
    "basePrice": 95,
    "reqFurnace": 2,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c18": {
    "id": "c18",
    "name": "Iron Gauntlet",
    "icon": "⚪",
    "materials": {
      "iron": 4,
      "stone": 2
    },
    "craftTime": 100,
    "basePrice": 105,
    "reqFurnace": 2,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c19": {
    "id": "c19",
    "name": "Clay Lantern",
    "icon": "⚪",
    "materials": {
      "clay": 3,
      "wood": 2
    },
    "craftTime": 70,
    "basePrice": 80,
    "reqFurnace": 2,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c20": {
    "id": "c20",
    "name": "Stone Statue",
    "icon": "⚪",
    "materials": {
      "stone": 8,
      "clay": 2
    },
    "craftTime": 110,
    "basePrice": 120,
    "reqFurnace": 3,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c21": {
    "id": "c21",
    "name": "Iron Breastplate",
    "icon": "⚪",
    "materials": {
      "iron": 6,
      "stone": 4
    },
    "craftTime": 120,
    "basePrice": 130,
    "reqFurnace": 3,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c22": {
    "id": "c22",
    "name": "Wooden Cabin",
    "icon": "⚪",
    "materials": {
      "wood": 10,
      "stone": 3
    },
    "craftTime": 130,
    "basePrice": 140,
    "reqFurnace": 3,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c23": {
    "id": "c23",
    "name": "Iron Boots",
    "icon": "⚪",
    "materials": {
      "iron": 5,
      "clay": 2
    },
    "craftTime": 115,
    "basePrice": 125,
    "reqFurnace": 3,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c24": {
    "id": "c24",
    "name": "Stone Tower",
    "icon": "⚪",
    "materials": {
      "stone": 10,
      "clay": 4
    },
    "craftTime": 140,
    "basePrice": 155,
    "reqFurnace": 3,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c25": {
    "id": "c25",
    "name": "Iron Full Armor",
    "icon": "⚪",
    "materials": {
      "iron": 10,
      "stone": 4
    },
    "craftTime": 160,
    "basePrice": 200,
    "reqFurnace": 4,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c26": {
    "id": "c26",
    "name": "Wooden Siege Bow",
    "icon": "⚪",
    "materials": {
      "wood": 8,
      "iron": 4
    },
    "craftTime": 150,
    "basePrice": 185,
    "reqFurnace": 4,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c27": {
    "id": "c27",
    "name": "Clay Golem Core",
    "icon": "⚪",
    "materials": {
      "clay": 8,
      "stone": 4
    },
    "craftTime": 145,
    "basePrice": 175,
    "reqFurnace": 4,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c28": {
    "id": "c28",
    "name": "Iron War Axe",
    "icon": "⚪",
    "materials": {
      "iron": 6,
      "wood": 3
    },
    "craftTime": 155,
    "basePrice": 190,
    "reqFurnace": 4,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c29": {
    "id": "c29",
    "name": "Stone Fortress Wall",
    "icon": "⚪",
    "materials": {
      "stone": 12,
      "clay": 5
    },
    "craftTime": 170,
    "basePrice": 210,
    "reqFurnace": 4,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "c30": {
    "id": "c30",
    "name": "Iron Tower Shield",
    "icon": "⚪",
    "materials": {
      "iron": 8,
      "stone": 6
    },
    "craftTime": 180,
    "basePrice": 230,
    "reqFurnace": 4,
    "reqAnvil": 0,
    "rarity": "common"
  },
  "u01": {
    "id": "u01",
    "name": "Copper Bracelet",
    "icon": "🟢",
    "materials": {
      "copper": 3,
      "stone": 1
    },
    "craftTime": 90,
    "basePrice": 500,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u02": {
    "id": "u02",
    "name": "Amber Pendant",
    "icon": "🟢",
    "materials": {
      "amber": 2,
      "wood": 1
    },
    "craftTime": 95,
    "basePrice": 520,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u03": {
    "id": "u03",
    "name": "Silver Ring",
    "icon": "🟢",
    "materials": {
      "silver": 3,
      "stone": 1
    },
    "craftTime": 100,
    "basePrice": 550,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u04": {
    "id": "u04",
    "name": "Bamboo Staff",
    "icon": "🟢",
    "materials": {
      "bamboo_crystal": 4,
      "wood": 2
    },
    "craftTime": 110,
    "basePrice": 580,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u05": {
    "id": "u05",
    "name": "Copper Sword",
    "icon": "🟢",
    "materials": {
      "copper": 4,
      "iron": 2
    },
    "craftTime": 120,
    "basePrice": 620,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u06": {
    "id": "u06",
    "name": "Amber Necklace",
    "icon": "🟢",
    "materials": {
      "amber": 3,
      "stone": 2
    },
    "craftTime": 115,
    "basePrice": 610,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u07": {
    "id": "u07",
    "name": "Silver Earring",
    "icon": "🟢",
    "materials": {
      "silver": 2,
      "copper": 1
    },
    "craftTime": 105,
    "basePrice": 590,
    "reqFurnace": 5,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u08": {
    "id": "u08",
    "name": "Bamboo Armor",
    "icon": "🟢",
    "materials": {
      "bamboo_crystal": 5,
      "wood": 3
    },
    "craftTime": 130,
    "basePrice": 660,
    "reqFurnace": 6,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u09": {
    "id": "u09",
    "name": "Copper Shield",
    "icon": "🟢",
    "materials": {
      "copper": 5,
      "iron": 3
    },
    "craftTime": 135,
    "basePrice": 680,
    "reqFurnace": 6,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u10": {
    "id": "u10",
    "name": "Silver Dagger",
    "icon": "🟢",
    "materials": {
      "silver": 4,
      "copper": 2
    },
    "craftTime": 125,
    "basePrice": 650,
    "reqFurnace": 6,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u11": {
    "id": "u11",
    "name": "Amber Totem",
    "icon": "🟢",
    "materials": {
      "amber": 4,
      "bamboo_crystal": 2
    },
    "craftTime": 140,
    "basePrice": 700,
    "reqFurnace": 6,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u12": {
    "id": "u12",
    "name": "Copper War Helm",
    "icon": "🟢",
    "materials": {
      "copper": 5,
      "stone": 2
    },
    "craftTime": 145,
    "basePrice": 720,
    "reqFurnace": 6,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u13": {
    "id": "u13",
    "name": "Silver Amulet",
    "icon": "🟢",
    "materials": {
      "silver": 4,
      "amber": 2
    },
    "craftTime": 150,
    "basePrice": 750,
    "reqFurnace": 6,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u14": {
    "id": "u14",
    "name": "Bamboo Wind Bow",
    "icon": "🟢",
    "materials": {
      "bamboo_crystal": 6,
      "wood": 3
    },
    "craftTime": 155,
    "basePrice": 780,
    "reqFurnace": 7,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u15": {
    "id": "u15",
    "name": "Copper Full Plate",
    "icon": "🟢",
    "materials": {
      "copper": 7,
      "iron": 4
    },
    "craftTime": 170,
    "basePrice": 820,
    "reqFurnace": 7,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u16": {
    "id": "u16",
    "name": "Silver Crown",
    "icon": "🟢",
    "materials": {
      "silver": 5,
      "copper": 3
    },
    "craftTime": 165,
    "basePrice": 800,
    "reqFurnace": 7,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u17": {
    "id": "u17",
    "name": "Amber Staff",
    "icon": "🟢",
    "materials": {
      "amber": 5,
      "bamboo_crystal": 3
    },
    "craftTime": 175,
    "basePrice": 840,
    "reqFurnace": 7,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u18": {
    "id": "u18",
    "name": "Copper Cannon",
    "icon": "🟢",
    "materials": {
      "copper": 6,
      "stone": 4
    },
    "craftTime": 180,
    "basePrice": 870,
    "reqFurnace": 7,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u19": {
    "id": "u19",
    "name": "Silver Battle Axe",
    "icon": "🟢",
    "materials": {
      "silver": 5,
      "copper": 4
    },
    "craftTime": 185,
    "basePrice": 900,
    "reqFurnace": 7,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u20": {
    "id": "u20",
    "name": "Bamboo Golem",
    "icon": "🟢",
    "materials": {
      "bamboo_crystal": 8,
      "wood": 4
    },
    "craftTime": 200,
    "basePrice": 950,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u21": {
    "id": "u21",
    "name": "Amber War Mask",
    "icon": "🟢",
    "materials": {
      "amber": 5,
      "copper": 3
    },
    "craftTime": 195,
    "basePrice": 930,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u22": {
    "id": "u22",
    "name": "Silver Fortress Key",
    "icon": "🟢",
    "materials": {
      "silver": 6,
      "amber": 3
    },
    "craftTime": 205,
    "basePrice": 960,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u23": {
    "id": "u23",
    "name": "Copper Dragon Blade",
    "icon": "🟢",
    "materials": {
      "copper": 7,
      "silver": 3
    },
    "craftTime": 210,
    "basePrice": 990,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u24": {
    "id": "u24",
    "name": "Bamboo Spirit Shield",
    "icon": "🟢",
    "materials": {
      "bamboo_crystal": 7,
      "amber": 4
    },
    "craftTime": 215,
    "basePrice": 1020,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u25": {
    "id": "u25",
    "name": "Silver War Armor",
    "icon": "🟢",
    "materials": {
      "silver": 7,
      "copper": 5
    },
    "craftTime": 220,
    "basePrice": 1100,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u26": {
    "id": "u26",
    "name": "Amber Golem Heart",
    "icon": "🟢",
    "materials": {
      "amber": 6,
      "bamboo_crystal": 4
    },
    "craftTime": 225,
    "basePrice": 1150,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u27": {
    "id": "u27",
    "name": "Copper Siege Tower",
    "icon": "🟢",
    "materials": {
      "copper": 9,
      "stone": 5
    },
    "craftTime": 235,
    "basePrice": 1200,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "u28": {
    "id": "u28",
    "name": "Silver Dragon Scale",
    "icon": "🟢",
    "materials": {
      "silver": 8,
      "amber": 4
    },
    "craftTime": 240,
    "basePrice": 1300,
    "reqFurnace": 8,
    "reqAnvil": 0,
    "rarity": "uncommon"
  },
  "r01": {
    "id": "r01",
    "name": "Gold Ring",
    "icon": "🔵",
    "materials": {
      "gold": 3,
      "silver": 2
    },
    "craftTime": 180,
    "basePrice": 2000,
    "reqFurnace": 9,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r02": {
    "id": "r02",
    "name": "Jade Pendant",
    "icon": "🔵",
    "materials": {
      "jade": 3,
      "bamboo_crystal": 2
    },
    "craftTime": 190,
    "basePrice": 2100,
    "reqFurnace": 9,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r03": {
    "id": "r03",
    "name": "Moonstone Orb",
    "icon": "🔵",
    "materials": {
      "moonstone": 3,
      "amber": 2
    },
    "craftTime": 200,
    "basePrice": 2200,
    "reqFurnace": 9,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r04": {
    "id": "r04",
    "name": "Mithril Dagger",
    "icon": "🔵",
    "materials": {
      "mithril": 3,
      "silver": 2
    },
    "craftTime": 210,
    "basePrice": 2350,
    "reqFurnace": 9,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r05": {
    "id": "r05",
    "name": "Gold Crown",
    "icon": "🔵",
    "materials": {
      "gold": 5,
      "silver": 3
    },
    "craftTime": 240,
    "basePrice": 2600,
    "reqFurnace": 10,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r06": {
    "id": "r06",
    "name": "Jade War Staff",
    "icon": "🔵",
    "materials": {
      "jade": 4,
      "bamboo_crystal": 3
    },
    "craftTime": 250,
    "basePrice": 2700,
    "reqFurnace": 10,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r07": {
    "id": "r07",
    "name": "Moonstone Shield",
    "icon": "🔵",
    "materials": {
      "moonstone": 4,
      "mithril": 3
    },
    "craftTime": 260,
    "basePrice": 2900,
    "reqFurnace": 10,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r08": {
    "id": "r08",
    "name": "Mithril Sword",
    "icon": "🔵",
    "materials": {
      "mithril": 5,
      "gold": 3
    },
    "craftTime": 270,
    "basePrice": 3100,
    "reqFurnace": 10,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r09": {
    "id": "r09",
    "name": "Gold Armor",
    "icon": "🔵",
    "materials": {
      "gold": 6,
      "silver": 4
    },
    "craftTime": 300,
    "basePrice": 3400,
    "reqFurnace": 10,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r10": {
    "id": "r10",
    "name": "Jade Amulet",
    "icon": "🔵",
    "materials": {
      "jade": 5,
      "moonstone": 3
    },
    "craftTime": 310,
    "basePrice": 3600,
    "reqFurnace": 11,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r11": {
    "id": "r11",
    "name": "Moonstone Wand",
    "icon": "🔵",
    "materials": {
      "moonstone": 5,
      "jade": 3
    },
    "craftTime": 320,
    "basePrice": 3800,
    "reqFurnace": 11,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r12": {
    "id": "r12",
    "name": "Mithril Breastplate",
    "icon": "🔵",
    "materials": {
      "mithril": 6,
      "gold": 4
    },
    "craftTime": 330,
    "basePrice": 4000,
    "reqFurnace": 11,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r13": {
    "id": "r13",
    "name": "Gold Trident",
    "icon": "🔵",
    "materials": {
      "gold": 6,
      "mithril": 4
    },
    "craftTime": 350,
    "basePrice": 4200,
    "reqFurnace": 11,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r14": {
    "id": "r14",
    "name": "Jade Dragon Helm",
    "icon": "🔵",
    "materials": {
      "jade": 5,
      "gold": 4
    },
    "craftTime": 360,
    "basePrice": 4400,
    "reqFurnace": 12,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r15": {
    "id": "r15",
    "name": "Moonstone Tiara",
    "icon": "🔵",
    "materials": {
      "moonstone": 6,
      "silver": 4
    },
    "craftTime": 370,
    "basePrice": 4600,
    "reqFurnace": 12,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r16": {
    "id": "r16",
    "name": "Mithril War Axe",
    "icon": "🔵",
    "materials": {
      "mithril": 7,
      "gold": 4
    },
    "craftTime": 380,
    "basePrice": 4900,
    "reqFurnace": 12,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r17": {
    "id": "r17",
    "name": "Gold Dragon Scale",
    "icon": "🔵",
    "materials": {
      "gold": 7,
      "mithril": 5
    },
    "craftTime": 400,
    "basePrice": 5200,
    "reqFurnace": 12,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r18": {
    "id": "r18",
    "name": "Jade Fortress Key",
    "icon": "🔵",
    "materials": {
      "jade": 6,
      "moonstone": 4
    },
    "craftTime": 410,
    "basePrice": 5500,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r19": {
    "id": "r19",
    "name": "Moonstone Full Armor",
    "icon": "🔵",
    "materials": {
      "moonstone": 7,
      "mithril": 5
    },
    "craftTime": 420,
    "basePrice": 5800,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r20": {
    "id": "r20",
    "name": "Mithril Dragon Blade",
    "icon": "🔵",
    "materials": {
      "mithril": 8,
      "gold": 5
    },
    "craftTime": 440,
    "basePrice": 6100,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r21": {
    "id": "r21",
    "name": "Gold Phoenix Crown",
    "icon": "🔵",
    "materials": {
      "gold": 8,
      "jade": 5
    },
    "craftTime": 460,
    "basePrice": 6500,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r22": {
    "id": "r22",
    "name": "Jade Golem Core",
    "icon": "🔵",
    "materials": {
      "jade": 7,
      "moonstone": 5
    },
    "craftTime": 470,
    "basePrice": 6800,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r23": {
    "id": "r23",
    "name": "Moonstone Dragon Orb",
    "icon": "🔵",
    "materials": {
      "moonstone": 8,
      "jade": 5
    },
    "craftTime": 480,
    "basePrice": 7200,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "r24": {
    "id": "r24",
    "name": "Mithril Royal Armor",
    "icon": "🔵",
    "materials": {
      "mithril": 9,
      "gold": 6
    },
    "craftTime": 500,
    "basePrice": 7800,
    "reqFurnace": 13,
    "reqAnvil": 0,
    "rarity": "rare"
  },
  "e01": {
    "id": "e01",
    "name": "Obsidian Blade",
    "icon": "🟣",
    "materials": {
      "obsidian": 4,
      "mithril": 3
    },
    "craftTime": 480,
    "basePrice": 8000,
    "reqFurnace": 14,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e02": {
    "id": "e02",
    "name": "Dragonite Scale",
    "icon": "🟣",
    "materials": {
      "dragonite": 3,
      "obsidian": 4
    },
    "craftTime": 500,
    "basePrice": 8500,
    "reqFurnace": 14,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e03": {
    "id": "e03",
    "name": "Aurora Wand",
    "icon": "🟣",
    "materials": {
      "aurora_stone": 4,
      "jade": 3
    },
    "craftTime": 510,
    "basePrice": 9000,
    "reqFurnace": 14,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e04": {
    "id": "e04",
    "name": "Adamantite Gauntlet",
    "icon": "🟣",
    "materials": {
      "adamantite": 4,
      "mithril": 3
    },
    "craftTime": 520,
    "basePrice": 9500,
    "reqFurnace": 15,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e05": {
    "id": "e05",
    "name": "Obsidian War Armor",
    "icon": "🟣",
    "materials": {
      "obsidian": 6,
      "adamantite": 4
    },
    "craftTime": 560,
    "basePrice": 10500,
    "reqFurnace": 15,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e06": {
    "id": "e06",
    "name": "Dragonite Helm",
    "icon": "🟣",
    "materials": {
      "dragonite": 5,
      "obsidian": 3
    },
    "craftTime": 570,
    "basePrice": 11000,
    "reqFurnace": 15,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e07": {
    "id": "e07",
    "name": "Aurora Shield",
    "icon": "🟣",
    "materials": {
      "aurora_stone": 5,
      "moonstone": 4
    },
    "craftTime": 580,
    "basePrice": 11500,
    "reqFurnace": 16,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e08": {
    "id": "e08",
    "name": "Adamantite Sword",
    "icon": "🟣",
    "materials": {
      "adamantite": 6,
      "obsidian": 4
    },
    "craftTime": 600,
    "basePrice": 12500,
    "reqFurnace": 16,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e09": {
    "id": "e09",
    "name": "Obsidian Dragon Crown",
    "icon": "🟣",
    "materials": {
      "obsidian": 6,
      "dragonite": 5
    },
    "craftTime": 620,
    "basePrice": 13500,
    "reqFurnace": 16,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e10": {
    "id": "e10",
    "name": "Dragonite Full Armor",
    "icon": "🟣",
    "materials": {
      "dragonite": 7,
      "adamantite": 5
    },
    "craftTime": 650,
    "basePrice": 14500,
    "reqFurnace": 17,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e11": {
    "id": "e11",
    "name": "Aurora Dragon Staff",
    "icon": "🟣",
    "materials": {
      "aurora_stone": 6,
      "dragonite": 4
    },
    "craftTime": 660,
    "basePrice": 15500,
    "reqFurnace": 17,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e12": {
    "id": "e12",
    "name": "Adamantite War Axe",
    "icon": "🟣",
    "materials": {
      "adamantite": 7,
      "dragonite": 5
    },
    "craftTime": 680,
    "basePrice": 16500,
    "reqFurnace": 17,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e13": {
    "id": "e13",
    "name": "Obsidian Golem",
    "icon": "🟣",
    "materials": {
      "obsidian": 8,
      "aurora_stone": 5
    },
    "craftTime": 700,
    "basePrice": 17500,
    "reqFurnace": 18,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e14": {
    "id": "e14",
    "name": "Dragonite Siege Cannon",
    "icon": "🟣",
    "materials": {
      "dragonite": 7,
      "adamantite": 6
    },
    "craftTime": 720,
    "basePrice": 18500,
    "reqFurnace": 18,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e15": {
    "id": "e15",
    "name": "Aurora Phoenix Bow",
    "icon": "🟣",
    "materials": {
      "aurora_stone": 7,
      "dragonite": 5
    },
    "craftTime": 740,
    "basePrice": 20000,
    "reqFurnace": 18,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e16": {
    "id": "e16",
    "name": "Adamantite Royal Armor",
    "icon": "🟣",
    "materials": {
      "adamantite": 8,
      "obsidian": 6
    },
    "craftTime": 760,
    "basePrice": 22000,
    "reqFurnace": 19,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e17": {
    "id": "e17",
    "name": "Obsidian Dragon Trident",
    "icon": "🟣",
    "materials": {
      "obsidian": 9,
      "dragonite": 6
    },
    "craftTime": 780,
    "basePrice": 25000,
    "reqFurnace": 19,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "e18": {
    "id": "e18",
    "name": "Aurora Celestial Crown",
    "icon": "🟣",
    "materials": {
      "aurora_stone": 8,
      "adamantite": 6
    },
    "craftTime": 800,
    "basePrice": 28000,
    "reqFurnace": 19,
    "reqAnvil": 0,
    "rarity": "epic"
  },
  "l01": {
    "id": "l01",
    "name": "Ethereal Blade",
    "icon": "🟡",
    "materials": {
      "ethereal_crystal": 5,
      "adamantite": 4
    },
    "craftTime": 900,
    "basePrice": 30000,
    "reqFurnace": 20,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l02": {
    "id": "l02",
    "name": "Voidstone Orb",
    "icon": "🟡",
    "materials": {
      "voidstone": 4,
      "ethereal_crystal": 4
    },
    "craftTime": 950,
    "basePrice": 33000,
    "reqFurnace": 20,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l03": {
    "id": "l03",
    "name": "Sunfire Armor",
    "icon": "🟡",
    "materials": {
      "sunfire_ore": 5,
      "aurora_stone": 4
    },
    "craftTime": 1000,
    "basePrice": 36000,
    "reqFurnace": 21,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l04": {
    "id": "l04",
    "name": "Divine Ring",
    "icon": "🟡",
    "materials": {
      "divine_ingot": 3,
      "sunfire_ore": 4
    },
    "craftTime": 1050,
    "basePrice": 40000,
    "reqFurnace": 21,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l05": {
    "id": "l05",
    "name": "Voidstone Crown",
    "icon": "🟡",
    "materials": {
      "voidstone": 5,
      "dragonite": 4
    },
    "craftTime": 1100,
    "basePrice": 44000,
    "reqFurnace": 22,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l06": {
    "id": "l06",
    "name": "Sunfire Dragon Staff",
    "icon": "🟡",
    "materials": {
      "sunfire_ore": 6,
      "ethereal_crystal": 4
    },
    "craftTime": 1150,
    "basePrice": 48000,
    "reqFurnace": 22,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l07": {
    "id": "l07",
    "name": "Divine War Armor",
    "icon": "🟡",
    "materials": {
      "divine_ingot": 5,
      "voidstone": 5
    },
    "craftTime": 1200,
    "basePrice": 52000,
    "reqFurnace": 23,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l08": {
    "id": "l08",
    "name": "Ethereal Phoenix Set",
    "icon": "🟡",
    "materials": {
      "blueprint": 1
    },
    "craftTime": 1400,
    "basePrice": 60000,
    "reqFurnace": 23,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l09": {
    "id": "l09",
    "name": "Voidstone Celestial Blade",
    "icon": "🟡",
    "materials": {
      "blueprint": 1
    },
    "craftTime": 1600,
    "basePrice": 70000,
    "reqFurnace": 24,
    "reqAnvil": 0,
    "rarity": "legendary"
  },
  "l10": {
    "id": "l10",
    "name": "Divine Forge Relic",
    "icon": "🟡",
    "materials": {
      "sunfire_ore": 3,
      "blueprint": 2
    },
    "craftTime": 2000,
    "basePrice": 80000,
    "reqFurnace": 25,
    "reqAnvil": 0,
    "rarity": "legendary"
  }
};


export const AREAS = {
  area_1: { id: 'area_1', name: 'Greenhorn Outskirts', reqFurnace: 0, rates: { stone: 40, wood: 30, iron: 20, clay: 10 } },
  area_2: { id: 'area_2', name: 'Bamboo Forest', reqFurnace: 3, rates: { wood: 40, bamboo_crystal: 25, amber: 20, iron: 15 } },
  area_3: { id: 'area_3', name: 'Silvermine Depths', reqFurnace: 4, rates: { stone: 30, iron: 30, copper: 25, silver: 15 } },
  area_4: { id: 'area_4', name: 'Moonlit Grotto', reqFurnace: 7, rates: { gold: 35, jade: 30, moonstone: 20, mithril: 15 } },
  area_5: { id: 'area_5', name: 'Dragon\'s Peak', reqFurnace: 12, rates: { obsidian: 40, dragonite: 30, gold: 20, mithril: 10 } },
  area_6: { id: 'area_6', name: 'Aurora Tundra', reqFurnace: 14, rates: { aurora_stone: 45, adamantite: 35, dragonite: 20 } },
  area_7: { id: 'area_7', name: 'Ethereal Void', reqFurnace: 18, rates: { ethereal_crystal: 40, voidstone: 30, sunfire_ore: 20, divine_ingot: 10 } }
};

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
      return 150 + (level * 50);
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


export const INITIAL_STATE = {
  coins: 0,
  cidiCoins: 1000,
  storageExpanders: 0,
  turboMinerExpiry: 0,
  autoSubmitOrdersExpiry: 0,
  activeAreaId: 'area_1',
  monster: {
    activeMonster: null,
    nextSpawnTime: Date.now() + 5 * 60 * 1000,
    activeDebuff: null,
    debuffExpiresAt: 0
  },
  bodyguard: {
    activeId: null,
    expiresAt: 0
  },
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
  }, { blueprint: 0 }),
  upgrades: {
    miner: 0,
    anvil: 0,
    furnace: 0,
    storage: 0,
  },
  stats: {
    totalOrdersCompleted: 0,
    storageFilledCount: 0,
    manualTaps: 0
  },
  lastSaveTime: Date.now(),
  runStartTime: Date.now(),
  lastOrderResetTime: 0,
  orders: [],
  activeCrafts: [] // { itemId, startTime, endTime }
};
