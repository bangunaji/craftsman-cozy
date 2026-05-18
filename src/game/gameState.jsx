import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_STATE, UPGRADES, ITEMS, ORES, HARD_GATES, AREAS } from './gameConfig';
import { getRandomMonster, BODYGUARDS } from './monsterSystem';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const getMaxSlots = (anvilLevel, rentedSlotsExpiry) => {
  let base = 2;
  if (anvilLevel >= 16) base = 7;
  else if (anvilLevel >= 11) base = 6;
  else if (anvilLevel >= 10) base = 5;
  else if (anvilLevel >= 7) base = 4;
  else if (anvilLevel >= 3) base = 3;

  if (rentedSlotsExpiry && Date.now() < rentedSlotsExpiry) {
    return base * 2;
  }
  return base;
};

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('piForgeSave');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration
        if (!parsed.stats) parsed.stats = { totalOrdersCompleted: 0, storageFilledCount: 0 };
        // Clean out prestige
        delete parsed.prestigeStars;
        delete parsed.bestPrestigeTime;
        // Merge missing ores/items
        // Migrate activeCrafts to have proper dates if corrupted
        const activeCrafts = (parsed.activeCrafts || []).map(c => ({
          ...c,
          startTime: c.startTime || Date.now(),
          endTime: c.endTime || Date.now() + 10000
        }));

        return {
          ...INITIAL_STATE,
          ...parsed,
          activeCrafts,
          ores: { ...INITIAL_STATE.ores, ...(parsed.ores || {}) },
          items: { ...INITIAL_STATE.items, ...(parsed.items || {}) }
        };
      } catch (e) {
        console.error('Failed to parse save', e);
      }
    }
    return INITIAL_STATE;
  });

  const clickTimestamps = useRef([]);
  const [offlineEarnings, setOfflineEarnings] = useState(null);
  const [upgradeError, setUpgradeError] = useState(null);

  // Save game automatically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      setState(s => {
        const newState = { ...s, lastSaveTime: Date.now() };
        localStorage.setItem('piForgeSave', JSON.stringify(newState));
        return newState;
      });
    }, 10000);

    return () => clearInterval(saveInterval);
  }, []);

  const calculateMiningYield = useCallback((totalMined, activeAreaId) => {
    const yieldResult = {};
    Object.keys(INITIAL_STATE.ores).forEach(k => yieldResult[k] = 0);

    const area = AREAS[activeAreaId];
    if (!area) return yieldResult;

    let totalWeight = 0;
    for (const weight of Object.values(area.rates)) {
      totalWeight += weight;
    }

    for (const [oreId, weight] of Object.entries(area.rates)) {
      const expected = totalMined * (weight / totalWeight);
      yieldResult[oreId] = expected;
    }
    return yieldResult;
  }, []);

  // Offline earnings calculation
  useEffect(() => {
    const now = Date.now();
    const timeDiff = (now - state.lastSaveTime) / 1000;

    if (timeDiff > 60 && state.upgrades.miner > 0) {
      const minerRate = UPGRADES.miner.effect(state.upgrades.miner);
      const totalMined = minerRate * timeDiff;

      const premiumBonus = Math.min(state.storageExpanders || 0, 2) * 100;
      const capacity = UPGRADES.storage.effect(state.upgrades.storage) + premiumBonus;
      const currentTotal = Object.values(state.ores).reduce((a, b) => a + Math.floor(b), 0);
      const spaceLeft = Math.max(0, capacity - currentTotal);

      const actualEarned = Math.min(totalMined, spaceLeft);

      if (actualEarned > 0) {
        const yields = calculateMiningYield(actualEarned, state.activeAreaId || 'area_1');

        setOfflineEarnings(yields); // Show raw numbers or floor them in UI

        setState(s => {
          const newOres = { ...s.ores };
          Object.keys(yields).forEach(k => {
            newOres[k] += yields[k];
          });

          return {
            ...s,
            ores: newOres,
            lastSaveTime: now
          };
        });
      }
    }
  }, []);

  // Game Loop
  useEffect(() => {
    let lastTick = Date.now();

    const gameLoop = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTick) / 1000;
      lastTick = now;

      setState(s => {
        let newState = { ...s };
        let stateChanged = false;

        // Auto-Mining
        if (s.upgrades.miner > 0) {
          let minerRate = UPGRADES.miner.effect(s.upgrades.miner);
          if (s.turboMinerExpiry && Date.now() < s.turboMinerExpiry) minerRate *= 2;

          // Debuffs
          if (s.monster?.activeDebuff === 'wraith') minerRate = 0;
          if (s.monster?.activeDebuff === 'crawler') minerRate *= 0.7;

          const minedThisTick = minerRate * delta;

          const premiumBonus = Math.min(s.storageExpanders || 0, 2) * 100;
          const capacity = UPGRADES.storage.effect(s.upgrades.storage) + premiumBonus;
          const currentTotal = Object.values(s.ores).reduce((a, b) => a + Math.floor(b), 0);

          // 🛠️ KODE FIX OVERFLOW: Hitung sisa ruang kosong yang tersedia secara ketat
          const spaceLeft = capacity - currentTotal;

          if (spaceLeft > 0) {
            // Ambil nilai terkecil: laju tambang asli ATAU sisa ruang gudang yang tersedia (Clamping)
            const actualMinedThisTick = Math.min(minedThisTick, spaceLeft);

            const yields = calculateMiningYield(actualMinedThisTick, s.activeAreaId || 'area_1');
            const newOres = { ...s.ores };
            Object.keys(yields).forEach(k => newOres[k] += yields[k]);

            newState.ores = newOres;
            stateChanged = true;

            // Track jika storage penuh
            const newTotal = Object.values(newOres).reduce((a, b) => a + Math.floor(b), 0);
            if (newTotal >= capacity && currentTotal < capacity) {
              newState.stats = { ...newState.stats, storageFilledCount: newState.stats.storageFilledCount + 1 };
            }
          }
        }

        // Crafting Processing
        if (s.activeCrafts.length > 0) {
          const nowMs = Date.now();
          const finishedCrafts = s.activeCrafts.filter(c => nowMs >= c.endTime);
          const activeCrafts = s.activeCrafts.filter(c => nowMs < c.endTime);

          if (finishedCrafts.length > 0) {
            const newItems = { ...s.items };
            finishedCrafts.forEach(c => {
              newItems[c.itemId] = (newItems[c.itemId] || 0) + 1;
            });

            newState.items = newItems;
            newState.activeCrafts = activeCrafts;
            stateChanged = true;
          }
        }

        // Monster Logic
        const nowMs = Date.now();
        if (newState.monster && !newState.monster.activeMonster && !newState.monster.activeDebuff) {
          if (nowMs >= newState.monster.nextSpawnTime) {
            const avgLevel = Math.floor((s.upgrades.miner + s.upgrades.anvil + s.upgrades.furnace + s.upgrades.storage) / 4);
            if (newState.bodyguard && newState.bodyguard.expiresAt > nowMs) {
              newState.monster.nextSpawnTime = nowMs + 10 * 60 * 1000;
            } else {
              newState.monster.activeMonster = getRandomMonster(avgLevel);
            }
            stateChanged = true;
          }
        } else if (newState.monster && newState.monster.activeMonster) {
          if (nowMs >= newState.monster.activeMonster.expiresAt) {
            const type = newState.monster.activeMonster.id;
            if (type === 'goblin' || type === 'crawler' || type === 'drake') {
              const newOres = { ...newState.ores };
              Object.keys(newOres).forEach(k => {
                newOres[k] = Math.max(0, Math.floor(newOres[k] * 0.8));
              });
              newState.ores = newOres;
            }
            newState.monster.activeDebuff = type;
            newState.monster.debuffExpiresAt = nowMs + 1800 * 1000; // 30 min debuff
            newState.monster.activeMonster = null;
            const randomMinutes = Math.random() * 15 + 30;
            newState.monster.nextSpawnTime = nowMs + randomMinutes * 60 * 1000;
            stateChanged = true;
          }
        }

        if (newState.monster && newState.monster.activeDebuff && nowMs >= newState.monster.debuffExpiresAt) {
          newState.monster.activeDebuff = null;
          stateChanged = true;
        }

        return stateChanged ? newState : s;
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [calculateMiningYield]);

  const claimFinishedCrafts = useCallback(() => {
    setState(s => {
      const now = Date.now();
      const finished = s.activeCrafts.filter(c => now >= c.endTime);
      if (finished.length === 0) return s;

      const newItems = { ...s.items };
      finished.forEach(c => {
        newItems[c.itemId] = (newItems[c.itemId] || 0) + 1;
      });

      return {
        ...s,
        items: newItems,
        activeCrafts: s.activeCrafts.filter(c => now < c.endTime)
      };
    });
  }, []);

  const buyStoreItem = useCallback((itemId, cost) => {
    setState(s => {
      if ((s.cidiCoins || 0) < cost) return s;
      const newState = { ...s, cidiCoins: s.cidiCoins - cost };

      if (itemId === 'skip_15m' || itemId === 'skip_1h' || itemId === 'skip_4h') {
        const ms = itemId === 'skip_15m' ? 15 * 60 * 1000 : itemId === 'skip_1h' ? 60 * 60 * 1000 : 4 * 60 * 60 * 1000;
        newState.activeCrafts = newState.activeCrafts.map(c => ({
          ...c,
          startTime: c.startTime - ms,
          endTime: c.endTime - ms
        }));
      } else if (itemId === 'storage_exp') {
        newState.storageExpanders = (newState.storageExpanders || 0) + 1;
      } else if (itemId === 'turbo_miner_2h') {
        newState.turboMinerExpiry = Date.now() + 2 * 3600 * 1000;
      }
      return newState;
    });
  }, []);

  const manualMine = useCallback((amount = 1) => {
    const now = Date.now();
    clickTimestamps.current = clickTimestamps.current.filter(t => now - t < 1000);
    if (clickTimestamps.current.length >= 8) return;
    clickTimestamps.current.push(now);

    setState(s => {
      const premiumBonus = Math.min(s.storageExpanders || 0, 2) * 100;
      const capacity = UPGRADES.storage.effect(s.upgrades.storage) + premiumBonus;
      const currentTotal = Object.values(s.ores).reduce((a, b) => a + Math.floor(b), 0);

      // KODE PERBAIKAN: Hitung sisa kapasitas ketat untuk klik manual
      const spaceLeft = capacity - currentTotal;
      if (spaceLeft <= 0) return s; // Tolak mentah-mentah jika sudah penuh

      let finalAmount = amount;
      if (s.turboMinerExpiry && Date.now() < s.turboMinerExpiry) finalAmount *= 2;

      // Pangkas nilai ketukan koin agar pas dengan batas kapasitas maksimal gudang
      finalAmount = Math.min(finalAmount, spaceLeft);

      const yields = calculateMiningYield(finalAmount, s.activeAreaId || 'area_1');
      const newOres = { ...s.ores };
      Object.keys(yields).forEach(k => newOres[k] += yields[k]);

      return {
        ...s,
        ores: newOres
      };
    });
  }, [calculateMiningYield]);

  const clearUpgradeError = useCallback(() => setUpgradeError(null), []);

  const buyUpgrade = useCallback((upgradeId) => {
    setState(s => {
      const upgrade = UPGRADES[upgradeId];
      const currentLevel = s.upgrades[upgradeId] || 0;

      if (currentLevel >= 25) return s; // Max level 25 cap

      const nextLevel = currentLevel + 1;

      // Hard Gates Check
      if (HARD_GATES[upgradeId] && HARD_GATES[upgradeId][nextLevel]) {
        const gate = HARD_GATES[upgradeId][nextLevel];
        let passed = true;
        if (gate.type === 'orders' && s.stats.totalOrdersCompleted < gate.amount) passed = false;
        if (gate.type === 'ore' && s.ores[gate.ore] < gate.amount) passed = false;
        if (gate.type === 'storage_full' && s.stats.storageFilledCount < gate.amount) passed = false;
        if (gate.type === 'avg_level') {
          const avg = Object.values(s.upgrades).reduce((a, b) => a + b, 0) / 4;
          if (avg < gate.amount) passed = false;
        }

        if (!passed) {
          setUpgradeError(gate.msg);
          return s;
        }
      }

      const cost = Math.floor(upgrade.baseCost * Math.pow(1.5, currentLevel));

      if (s.coins >= cost) {
        setUpgradeError(null);
        return {
          ...s,
          coins: s.coins - cost,
          upgrades: {
            ...s.upgrades,
            [upgradeId]: nextLevel
          }
        };
      }
      return s;
    });
  }, []);

  const startCraft = useCallback((itemId, craftTimeSec, materials) => {
    setState(s => {
      const maxSlots = getMaxSlots(s.upgrades.anvil || 0, s.rentedSlotsExpiry);
      if (s.activeCrafts.length >= maxSlots) return s;

      const hasMaterials = Object.entries(materials).every(([mat, amount]) => {
        if (mat === 'blueprint') return (s.items['blueprint'] || 0) >= amount;
        return Math.floor(s.ores[mat] || 0) >= amount;
      });

      if (!hasMaterials) return s;

      const newOres = { ...s.ores };
      const newItems = { ...s.items };
      Object.entries(materials).forEach(([mat, amount]) => {
        if (mat === 'blueprint') newItems[mat] = (newItems[mat] || 0) - amount;
        else newOres[mat] -= amount;
      });

      const speedBoostReduction = UPGRADES.anvil.effect(s.upgrades.anvil || 0);
      let actualTimeMs = (craftTimeSec * 1000) * ((100 - speedBoostReduction) / 100);

      if (s.monster?.activeDebuff === 'imp') actualTimeMs *= 1.5; // 50% slower

      return {
        ...s,
        ores: newOres,
        items: newItems,
        activeCrafts: [
          ...s.activeCrafts,
          {
            id: Date.now() + Math.random(),
            itemId,
            startTime: Date.now(),
            endTime: Date.now() + actualTimeMs
          }
        ]
      };
    });
  }, []);

  const sellItem = useCallback((itemId, price, amount = 1) => {
    setState(s => {
      if (s.items[itemId] >= amount) {
        return {
          ...s,
          items: {
            ...s.items,
            [itemId]: s.items[itemId] - amount
          },
          coins: s.coins + (price * amount)
        }
      }
      return s;
    })
  }, []);

  const acceptOrder = useCallback((orderId) => {
    setState(s => {
      const newOrders = s.orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'active',
            expiresAt: Date.now() + o.durationHours * 60 * 60 * 1000
          };
        }
        return o;
      });
      return { ...s, orders: newOrders };
    });
  }, []);

  const fulfillOrder = useCallback((orderId, rewardCoins) => {
    setState(s => {
      const order = s.orders.find(o => o.id === orderId);
      if (!order) return s;

      const hasItems = Object.entries(order.requirements).every(
        ([item, amt]) => s.items[item] >= amt
      );

      if (!hasItems) return s;

      const newItems = { ...s.items };
      Object.entries(order.requirements).forEach(([item, amt]) => {
        newItems[item] -= amt;
      });

      if (order.extraReward && order.extraReward.toLowerCase().includes('blueprint')) {
        newItems['blueprint'] = (newItems['blueprint'] || 0) + 1;
      }

      return {
        ...s,
        items: newItems,
        coins: s.coins + rewardCoins,
        stats: { ...s.stats, totalOrdersCompleted: s.stats.totalOrdersCompleted + 1 },
        orders: s.orders.filter(o => o.id !== orderId)
      };
    });
  }, []);

  const updateOrders = useCallback((newOrders) => {
    setState(s => ({
      ...s,
      orders: newOrders,
      lastOrderResetTime: Date.now()
    }));
  }, []);

  const repelMonster = useCallback((success) => {
    setState(s => {
      if (!s.monster?.activeMonster) return s;
      const monster = { ...s.monster };
      const active = { ...monster.activeMonster };

      if (success) active.tapsDone += 1;
      // no penalty for failing to make it easier as requested

      if (active.tapsDone >= active.tapsNeeded) {
        monster.activeMonster = null;
        const randomMinutes = Math.random() * 15 + 30;
        monster.nextSpawnTime = Date.now() + randomMinutes * 60 * 1000 // 5 mins until next for demo
      } else {
        monster.activeMonster = active;
      }

      return { ...s, monster };
    });
  }, []);

  const hireBodyguard = useCallback((guardId) => {
    setState(s => {
      const guard = BODYGUARDS.find(g => g.id === guardId);
      if (!guard) return s;

      const avgLevel = Math.floor((s.upgrades.miner + s.upgrades.anvil + s.upgrades.furnace + s.upgrades.storage) / 4);
      const cost = Math.floor(guard.baseCost * Math.pow(1.08, avgLevel));

      if (s.coins < cost) return s;

      return {
        ...s,
        coins: s.coins - cost,
        bodyguard: {
          activeId: guardId,
          expiresAt: Date.now() + guard.durationHrs * 3600 * 1000
        }
      };
    });
  }, []);

  const changeActiveArea = useCallback((areaId) => {
    setState(s => {
      const area = AREAS[areaId];
      if (!area) return s;
      // Check unlock requirement
      if (s.upgrades.furnace < area.reqFurnace) return s;

      return { ...s, activeAreaId: areaId };
    });
  }, []);

  const clearOfflineEarnings = useCallback(() => setOfflineEarnings(null), []);

  const watchAdRental = useCallback(() => {
    setState(s => ({
      ...s,
      rentedSlotsExpiry: Date.now() + 12 * 3600 * 1000
    }));
  }, []);

  const value = {
    state,
    offlineEarnings,
    upgradeError,
    clearUpgradeError,
    manualMine,
    buyUpgrade,
    startCraft,
    sellItem,
    fulfillOrder,
    acceptOrder,
    updateOrders,
    clearOfflineEarnings,
    claimFinishedCrafts,
    buyStoreItem,
    repelMonster,
    hireBodyguard,
    changeActiveArea,
    watchAdRental,
    resetState: () => {
      localStorage.removeItem('piForgeSave');
      setState(INITIAL_STATE);
    }
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
