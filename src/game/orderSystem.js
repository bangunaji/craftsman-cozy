import { ITEMS } from './gameConfig';

const pickRandomItem = (rarity) => {
    const validItems = Object.values(ITEMS).filter(i => i.rarity === rarity);
    return validItems[Math.floor(Math.random() * validItems.length)];
};

export const generateOrders = () => {
    const idSuffix = Math.floor(Math.random() * 1000);
    
    // Pick dynamic items based on intended rarity
    const commonItem1 = pickRandomItem('common');
    const commonItem2 = pickRandomItem('common');
    const uncommonItem = pickRandomItem('uncommon');
    const rareItem1 = pickRandomItem('rare');
    const rareItem2 = pickRandomItem('rare');
    const epicItem = pickRandomItem('epic');
    
    return [
        {
            id: `penduduk_${idSuffix}`,
            npcName: "Penduduk Desa",
            dialog: `Permisi tuan pandai besi... desa kami butuh ${commonItem1.name} untuk berjaga-jaga.`,
            difficulty: 'easy',
            requirements: {
                [commonItem1.id]: 2
            },
            rewardCoins: Math.floor(commonItem1.basePrice * 2.5),
            durationHours: 24,
            status: 'pending'
        },
        {
            id: `pedagang_${idSuffix}`,
            npcName: "Pedagang Pasar",
            dialog: `Halo kawan! Aku butuh barang berkualitas untuk dijual. Bisa buatkan ${commonItem2.name} dan ${uncommonItem.name}?`,
            difficulty: 'medium',
            requirements: {
                [commonItem2.id]: 1,
                [uncommonItem.id]: 1
            },
            rewardCoins: Math.floor((commonItem2.basePrice + uncommonItem.basePrice) * 3),
            durationHours: 8,
            status: 'pending' // pending -> active -> fulfilled
        },
        {
            id: `raja_${idSuffix}`,
            npcName: "Raja Aldric",
            dialog: `Pandai besi! Kerajaanku membutuhkan ${rareItem1.name} dan ${rareItem2.name} sebelum fajar. Sanggup?`,
            difficulty: 'hard',
            requirements: {
                [rareItem1.id]: 1,
                [rareItem2.id]: 1
            },
            rewardCoins: Math.floor((rareItem1.basePrice + rareItem2.basePrice) * 3.5),
            extraReward: "Lencana Raja",
            durationHours: 6,
            status: 'pending'
        },
        {
            id: `petualang_${idSuffix}`,
            npcName: "Petualang Misterius",
            dialog: `Ssst... aku butuh ${epicItem.name}. Buatkan untukku, dan aku kasih blueprint langka.`,
            difficulty: 'hard',
            requirements: {
                [epicItem.id]: 1
            },
            rewardCoins: Math.floor(epicItem.basePrice * 4),
            extraReward: "Blueprint Eksklusif",
            durationHours: 12,
            status: 'pending'
        },
        {
            id: `emissary_${idSuffix}`,
            npcName: "Emissary Ethereal",
            dialog: `Tuan pandai besi... Aku datang dari dimensi lain untuk mencari ${epicItem.name}. Imbalan besar menantimu.`,
            difficulty: 'extreme',
            requirements: {
                [epicItem.id]: 2
            },
            rewardCoins: Math.floor(epicItem.basePrice * 5),
            extraReward: "Ethereal Relic",
            durationHours: 24,
            status: 'pending'
        }
    ];
}
