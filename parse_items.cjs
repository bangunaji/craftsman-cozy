const fs = require('fs');

const txt = fs.readFileSync('PiForge_GDD_v6.txt', 'utf8');
const lines = txt.split('\n').map(l => l.trim());

const items = {};
let currentItem = null;
let state = 0; // 0 = looking for ID, 1 = name, 2 = materials, 3 = time, 4 = price, 5 = unlock

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    if (state === 0 && /^[CUREL]\d{2}$/.test(line)) {
        currentItem = { id: line };
        state = 1;
    } else if (state === 1) {
        currentItem.name = line;
        state = 2;
    } else if (state === 2) {
        // "3 Clay, 2 Wood" or "5 Ethereal Crystal, 4 Adamantite"
        // Wait, some materials might wrap lines if they are too long.
        // Let's check if the NEXT line ends with "dtk"
        if (lines[i+1] && lines[i+1].includes('dtk')) {
             currentItem.materialsStr = line;
             state = 3;
        } else {
             currentItem.materialsStr = (currentItem.materialsStr ? currentItem.materialsStr + ' ' : '') + line;
             // Stay in state 2
        }
    } else if (state === 3) {
        currentItem.time = parseInt(line);
        state = 4;
    } else if (state === 4) {
        currentItem.price = parseInt(line);
        state = 5;
    } else if (state === 5) {
        currentItem.unlock = line;
        
        // Parse materials string "3 Clay, 2 Wood"
        const mats = {};
        const parts = currentItem.materialsStr.split(',');
        for (const part of parts) {
            let p = part.trim();
            // remove "Blueprint Langka" or "Blueprint" etc since it's special
            if (p.toLowerCase().includes('blueprint')) {
                mats['blueprint'] = parseInt(p) || 1;
                continue;
            }
            const match = p.match(/^(\d+)\s+(.+)$/);
            if (match) {
                let qty = parseInt(match[1]);
                let name = match[2].toLowerCase().replace(/\s+/g, '_');
                mats[name] = qty;
            }
        }
        currentItem.materials = mats;
        
        let rarity = 'common';
        if (currentItem.id.startsWith('U')) rarity = 'uncommon';
        if (currentItem.id.startsWith('R')) rarity = 'rare';
        if (currentItem.id.startsWith('E')) rarity = 'epic';
        if (currentItem.id.startsWith('L')) rarity = 'legendary';
        currentItem.rarity = rarity;
        
        // Parse unlock
        let reqFurnace = 0;
        let reqAnvil = 0;
        if (currentItem.unlock.includes('Furnace Lv.')) {
            reqFurnace = parseInt(currentItem.unlock.split('Furnace Lv.')[1]);
        }
        if (currentItem.unlock.includes('Anvil Lv.')) {
            reqAnvil = parseInt(currentItem.unlock.split('Anvil Lv.')[1]);
        }
        currentItem.reqFurnace = reqFurnace;
        currentItem.reqAnvil = reqAnvil;
        
        const internalId = currentItem.id.toLowerCase();
        
        items[internalId] = {
            id: internalId,
            name: currentItem.name,
            icon: rarity === 'common' ? '⚪' : rarity === 'uncommon' ? '🟢' : rarity === 'rare' ? '🔵' : rarity === 'epic' ? '🟣' : '🟡',
            materials: currentItem.materials,
            craftTime: currentItem.time,
            basePrice: currentItem.price,
            reqFurnace: reqFurnace,
            reqAnvil: reqAnvil,
            rarity: rarity
        };
        
        state = 0;
    }
}

fs.writeFileSync('generated_items.json', JSON.stringify(items, null, 2));
console.log("Extracted " + Object.keys(items).length + " items.");
