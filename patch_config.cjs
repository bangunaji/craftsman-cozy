const fs = require('fs');
const filePath = './src/game/gameConfig.js';

if (!fs.existsSync(filePath)) {
    console.error("❌ Eror: file src/game/gameConfig.js tidak ditemukan!");
    process.exit(1);
}

let fileContent = fs.readFileSync(filePath, 'utf8');
const startMarker = 'export const ITEMS = ';
const endMarker = 'export const AREAS =';

let startIndex = fileContent.indexOf(startMarker);
let endIndex = fileContent.indexOf(endMarker);

try {
    let jsonText = fileContent.substring(startIndex + startMarker.length, endIndex).trim().replace(/;$/, '');
    let items = JSON.parse(jsonText);

    Object.values(items).forEach(item => {
        const rarity = item.rarity;
        const name = item.name.toLowerCase();
        const idNum = parseInt(item.id.replace(/[^\d]/g, '')); // Ambil angka dari ID (misal c03 -> 3)

        // Reset total seluruh prasyarat bangunan untuk kalkulasi ulang yang bersih
        item.reqFurnace = 0; item.reqAnvil = 0; item.reqAlchemist = 0; item.reqEnchanter = 0;

        let targetLevel = 0;

        // 1. HITUNG ULANG TIER LEVEL ASLI BERDASARKAN URUTAN ID GDD MURNI
        if (rarity === 'common') {
            if (idNum <= 10) targetLevel = 0;
            else if (idNum <= 14) targetLevel = 1;
            else if (idNum <= 19) targetLevel = 2;
            else if (idNum <= 24) targetLevel = 3;
            else targetLevel = 4;

            // Tentukan bangunan starter (Anvil untuk senjata/armor, Furnace untuk perabotan)
            if (name.includes('sword') || name.includes('shield') || name.includes('axe') || name.includes('helm') || name.includes('dagger') || name.includes('bow') || name.includes('spear') || name.includes('gauntlet') || name.includes('breastplate') || name.includes('boots')) {
                item.reqAnvil = targetLevel;
            } else {
                item.reqFurnace = targetLevel;
            }

        } else if (rarity === 'uncommon') {
            if (idNum <= 7) targetLevel = 5;
            else if (idNum <= 13) targetLevel = 6;
            else if (idNum <= 19) targetLevel = 7;
            else targetLevel = 8;

            if (name.includes('ring') || name.includes('pendant') || name.includes('orb') || name.includes('staff') || name.includes('amulet') || name.includes('wand') || name.includes('tiara') || name.includes('core')) {
                item.reqAlchemist = targetLevel;
            } else if (name.includes('sword') || name.includes('shield') || name.includes('axe') || name.includes('helm') || name.includes('armor') || name.includes('breastplate') || name.includes('boots')) {
                item.reqAnvil = targetLevel;
            } else {
                item.reqFurnace = targetLevel;
            }

        } else if (rarity === 'rare') {
            if (idNum <= 4) targetLevel = 9;
            else if (idNum <= 9) targetLevel = 10;
            else if (idNum <= 13) targetLevel = 11;
            else if (idNum <= 17) targetLevel = 12;
            else targetLevel = 13;

            if (name.includes('ring') || name.includes('pendant') || name.includes('orb') || name.includes('staff') || name.includes('amulet') || name.includes('wand') || name.includes('tiara') || name.includes('core')) {
                item.reqAlchemist = targetLevel;
            } else if (name.includes('sword') || name.includes('shield') || name.includes('axe') || name.includes('helm') || name.includes('armor') || name.includes('breastplate') || name.includes('boots')) {
                item.reqAnvil = targetLevel;
            } else {
                item.reqFurnace = targetLevel;
            }

        } else if (rarity === 'epic') {
            if (idNum <= 3) targetLevel = 14;
            else if (idNum <= 6) targetLevel = 15;
            else if (idNum <= 9) targetLevel = 16;
            else if (idNum <= 12) targetLevel = 17;
            else if (idNum <= 15) targetLevel = 18;
            else targetLevel = 19;

            item.reqEnchanter = targetLevel;

        } else if (rarity === 'legendary') {
            if (idNum <= 2) targetLevel = 20;
            else if (idNum <= 4) targetLevel = 21;
            else if (idNum <= 6) targetLevel = 22;
            else if (idNum <= 7) targetLevel = 23;
            else if (idNum <= 9) targetLevel = 24;
            else targetLevel = 25;

            item.reqEnchanter = targetLevel;
        }

        // 2. PENYEIMBANGAN BIAYA MATERIAL (Resource Sink)
        if (!item._scaled) {
            Object.keys(item.materials).forEach(mat => {
                if (mat !== 'blueprint') {
                    let multiplier = 4; // Common butuh bahan 4x lipat lebih banyak dari bawaan JSON dasar
                    if (rarity === 'uncommon') multiplier = 10;
                    if (rarity === 'rare') multiplier = 25;
                    if (rarity === 'epic') multiplier = 60;
                    if (rarity === 'legendary') multiplier = 120;

                    item.materials[mat] = Math.floor(item.materials[mat] * multiplier);
                }
            });
            item._scaled = true; // Tandai agar tidak dikalikan ganda di masa depan
        }
    });

    let beforeItems = fileContent.substring(0, startIndex + startMarker.length);
    let afterItems = fileContent.substring(endIndex);
    fs.writeFileSync(filePath, beforeItems + JSON.stringify(items, null, 2) + ';\n\n' + afterItems);
    console.log("============== RECOVERY SUCCESS ==============");
    console.log("✅ Berhasil memulihkan susunan resep dari kekacauan cache!");
    console.log("🟢 Item Common awal (c01 - c10) kini dijamin kembali ke Level 0.");
    console.log("==============================================");

} catch (e) { console.error("❌ Gagal memulihkan data:", e.message); }