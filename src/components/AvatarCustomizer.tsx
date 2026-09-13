import React, { useState } from "react";
import { ShoppingBag, Check, Award, Lock, Sparkles, Shirt } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AvatarItem, UserProgress } from "../types";
import { AVATAR_ITEMS } from "../data";

interface AvatarCustomizerProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

export default function AvatarCustomizer({ progress, onUpdateProgress }: AvatarCustomizerProps) {
  const [activeTab, setActiveTab] = useState<"shop" | "closet">("shop");

  const handleBuyItem = (item: AvatarItem) => {
    if (progress.coins < item.cost) {
      alert("You don't have enough Stars yet. Complete more MoneyLab modules to earn stars!");
      return;
    }

    const updatedUnlocked = [...progress.unlockedAvatarItems, item.id];
    const updatedCoins = progress.coins - item.cost;

    onUpdateProgress({
      coins: updatedCoins,
      unlockedAvatarItems: updatedUnlocked
    });
  };

  const handleEquipItem = (item: AvatarItem) => {
    const category = item.category;
    const currentEquipped = { ...progress.equippedAvatarItems };
    
    // Toggle equip/unequip
    if (currentEquipped[category] === item.id) {
      delete currentEquipped[category];
    } else {
      currentEquipped[category] = item.id;
    }

    onUpdateProgress({
      equippedAvatarItems: currentEquipped
    });
  };

  // Get current equipped objects
  const equippedHat = AVATAR_ITEMS.find(i => i.id === progress.equippedAvatarItems.hat);
  const equippedGlasses = AVATAR_ITEMS.find(i => i.id === progress.equippedAvatarItems.glasses);
  const equippedClothing = AVATAR_ITEMS.find(i => i.id === progress.equippedAvatarItems.clothing);
  const equippedCompanion = AVATAR_ITEMS.find(i => i.id === progress.equippedAvatarItems.companion);

  return (
    <div className="bg-white border-2 border-sky-100 rounded-[2rem] p-6 shadow-[0_8px_0_0_#e0f2fe] max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: THE AVATAR MASCOT VIEWER */}
        <div className="bg-sky-50 border-2 border-sky-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-indigo-50/10 pointer-events-none" />
          
          <h3 className="text-sm font-black text-sky-700 uppercase tracking-widest absolute top-4 font-display">Your Lab Avatar</h3>
          
          {/* Avatar Stage */}
          <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-inner border-2 border-sky-100 mt-4">
            
            {/* Companion floating next to mascot */}
            {equippedCompanion && (
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 top-10 text-4xl z-30"
              >
                {equippedCompanion.asset}
              </motion.div>
            )}
 
            {/* Base Avatar: Student Hacker / Learner */}
            <span className="text-7xl relative z-10 select-none">🧑‍💻</span>
 
            {/* Hat Accessory */}
            {equippedHat && (
              <div className="absolute -top-3 z-30 text-5xl">
                {equippedHat.asset}
              </div>
            )}
 
            {/* Glasses Accessory */}
            {equippedGlasses && (
              <div className="absolute top-[52px] z-20 text-4xl">
                {equippedGlasses.asset}
              </div>
            )}
 
            {/* Clothing Accessory */}
            {equippedClothing && (
              <div className="absolute bottom-1 z-20 text-4xl">
                {equippedClothing.asset}
              </div>
            )}
          </div>
 
          <div className="mt-4 space-y-1">
            <h4 className="font-black text-sky-900 text-base font-display">MoneyLab Student Avatar</h4>
            <p className="text-xs text-sky-400 font-black uppercase font-display">Active Simulation Gear</p>
          </div>
        </div>
 
        {/* RIGHT COLUMN (2/3 width): THE CLOSET & SHOP */}
        <div className="md:col-span-2 space-y-5">
          {/* Tabs header & Balance */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-sky-50 pb-3 gap-3">
            <div className="flex bg-sky-100 p-1 rounded-2xl border border-sky-200/50">
              <button
                id="tab-shop"
                onClick={() => setActiveTab("shop")}
                className={`px-4 py-2 rounded-xl text-sm transition-all font-display ${activeTab === "shop" ? "bg-white text-sky-900 shadow-sm border-b-2 border-sky-400 font-black" : "text-sky-500 hover:text-sky-800 font-bold"}`}
              >
                Shop 🛒
              </button>
              <button
                id="tab-closet"
                onClick={() => setActiveTab("closet")}
                className={`px-4 py-2 rounded-xl text-sm transition-all font-display ${activeTab === "closet" ? "bg-white text-sky-900 shadow-sm border-b-2 border-sky-400 font-black" : "text-sky-500 hover:text-sky-800 font-bold"}`}
              >
                Wardrobe 👕
              </button>
            </div>
            
            {/* Wallet Balance */}
            <div className="bg-yellow-100 border-2 border-yellow-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm font-display">
              <span className="text-lg">🪙</span>
              <span className="font-black text-yellow-700 text-sm">{progress.coins} Fin-Coins</span>
            </div>
          </div>
 
          {/* Catalog Listing */}
          <div className="h-[280px] overflow-y-auto pr-1">
            <AnimatePresence mode="wait">
              {activeTab === "shop" ? (
                <motion.div 
                  key="shop-grid" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {AVATAR_ITEMS.map((item) => {
                    const isUnlocked = progress.unlockedAvatarItems.includes(item.id);
                    return (
                      <div 
                        key={item.id} 
                        className={`border-2 rounded-2xl p-3 flex items-center justify-between transition-all ${
                          isUnlocked 
                            ? "bg-sky-50/50 border-sky-100 opacity-60" 
                            : "bg-white border-sky-100 shadow-[0_4px_0_0_#e0f2fe] hover:shadow-[0_6px_0_0_#e0f2fe] hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-sm border border-white/20 shrink-0`}>
                            {item.asset}
                          </div>
                          <div className="text-left">
                            <h4 className="font-black text-sky-900 text-sm sm:text-base font-display">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-sky-500 font-bold uppercase font-display">{item.category}</p>
                          </div>
                        </div>
 
                        {isUnlocked ? (
                          <span className="text-xs sm:text-sm text-sky-600 font-black bg-sky-100/70 px-3 py-1.5 rounded-xl font-display uppercase">Bought</span>
                        ) : (
                          <button
                            id={`buy-shop-${item.id}`}
                            disabled={progress.coins < item.cost}
                            onClick={() => handleBuyItem(item)}
                            className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-100 text-yellow-950 text-xs sm:text-sm font-black px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-md border-b-4 border-yellow-600 disabled:border-b-0 disabled:text-slate-400 font-display"
                          >
                            Buy {item.cost} 🪙
                          </button>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  key="closet-grid" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {progress.unlockedAvatarItems.length === 0 ? (
                    <div className="text-center py-10 space-y-2">
                      <span className="text-3xl">📭</span>
                      <h4 className="font-black text-sky-900 text-sm font-display">Wardrobe is empty!</h4>
                      <p className="text-xs text-sky-400 font-medium">Head over to the Shop and purchase accessories using your earned coins!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AVATAR_ITEMS.filter(item => progress.unlockedAvatarItems.includes(item.id)).map((item) => {
                        const isEquipped = progress.equippedAvatarItems[item.category] === item.id;
                        return (
                          <button
                            key={item.id}
                            id={`equip-closet-${item.id}`}
                            onClick={() => handleEquipItem(item)}
                            className={`border-2 rounded-2xl p-3 flex items-center justify-between text-left transition-all ${
                              isEquipped 
                                ? "bg-emerald-50 border-emerald-300 shadow-[0_4px_0_0_#a7f3d0]" 
                                : "bg-white border-sky-100 shadow-[0_4px_0_0_#e0f2fe] hover:shadow-[0_6px_0_0_#e0f2fe] hover:-translate-y-0.5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-sm border border-white/20 shrink-0`}>
                                {item.asset}
                              </div>
                              <div>
                                <h4 className="font-black text-sky-900 text-sm sm:text-base font-display">{item.name}</h4>
                                <p className="text-xs sm:text-sm text-sky-500 font-bold uppercase font-display">{item.category}</p>
                              </div>
                            </div>
 
                            <span className={`text-xs sm:text-sm font-black px-3 py-1.5 rounded-xl transition-all font-display uppercase ${
                              isEquipped 
                                ? "bg-emerald-500 text-white shadow-sm" 
                                : "bg-sky-100 text-sky-700"
                            }`}>
                              {isEquipped ? "Equipped" : "Equip"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
 
      </div>
    </div>
  );
}
