const fs = require('fs');
const items = JSON.parse(fs.readFileSync('generated_items.json', 'utf8'));

Object.values(items).forEach(item => {
    const level = item.reqFurnace;
    item.reqFurnace = 0; item.reqAnvil = 0; item.reqAlchemist = 0; item.reqEnchanter = 0;

    const name = item.name.toLowerCase();

    // 1. Epic & Legendary dikunci di Enchanter
    if (item.rarity === 'epic' || item.rarity === 'legendary') {
        item.reqEnchanter = level || 1;
    }
    // 2. Item Sihir / Perhiasan Alam dikunci di Alchemist Lab
    else if (name.includes('ring') || name.includes('pendant') || name.includes('orb') ||
        name.includes('staff') || name.includes('amulet') || name.includes('wand') ||
        name.includes('tiara') || name.includes('core') || name.includes('bow')) {
        item.reqAlchemist = level || 1;
    }
    // 3. Senjata dan Armor dikunci di Anvil
    else if (name.includes('sword') || name.includes('shield') || name.includes('axe') ||
        name.includes('helm') || name.includes('armor') || name.includes('breastplate') ||
        name.includes('boots') || name.includes('gauntlet') || name.includes('dagger')) {
        item.reqAnvil = level || 1;
    }
    // 4. Perabotan Dasar & Bata dikunci di Furnace
    else {
        item.reqFurnace = level || 1;
    }
});

fs.writeFileSync('generated_items.json', JSON.stringify(items, null, 2));
console.log("Recipes successfully rebalanced across 4 buildings!");