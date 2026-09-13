import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Flame, Zap, Shield, Sparkles, Snowflake, AlertTriangle, HelpCircle, ArrowRight
} from "lucide-react";
import { UserProgress } from "../types";
import { getCurrentWeekDays, getTodayFormatted, recordActivityForToday } from "../utils/streakUtils";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

export default function StreakModal({ isOpen, onClose, progress, onUpdateProgress }: StreakModalProps) {
  const [simulationMsg, setSimulationMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Defaults
  const streakCount = progress.streakCount ?? 0;
  const longestStreak = progress.longestStreak ?? 0;
  const streakFreezes = progress.streakFreezes ?? 1;
  const activityDates = progress.activityDates ?? [];
  const streakCalendar = progress.streakCalendar ?? [];

  const weekDays = getCurrentWeekDays();

  // Buy Streak Freeze (insurance)
  const buyFreeze = () => {
    if (progress.coins < 50) {
      setSimulationMsg("❌ Not enough coins! You need 50 Coins to purchase a Streak Freeze.");
      return;
    }
    onUpdateProgress({
      coins: progress.coins - 50,
      streakFreezes: streakFreezes + 1
    });
    setSimulationMsg("❄️ Purchased 1 Streak Freeze! Your streak is now protected against missed days.");
  };

  // Check in for a specific day in current week
  const simulateCheckInForDay = (dateStr: string, dayName: string) => {
    if (activityDates.includes(dateStr) || streakCalendar.includes(dayName)) {
      setSimulationMsg(`✨ Activity already logged for ${dayName} (${dateStr})! Pick another day to practice.`);
      return;
    }

    const updatedActivityDates = [...activityDates, dateStr];
    const updatedCalendar = [...streakCalendar, dayName];
    const updatedStreak = streakCount + 1;
    const updatedLongest = Math.max(updatedStreak, longestStreak);
    let coinsBonus = 0;
    let bonusMsg = "";

    if (updatedStreak === 4) {
      coinsBonus = 30;
      bonusMsg = " 🎉 +30 Coins Milestone Bonus!";
    } else if (updatedStreak === 7) {
      coinsBonus = 100;
      bonusMsg = " 🔥 +100 Coins Super Streak Bonus!";
    } else if (updatedStreak === 14) {
      coinsBonus = 250;
      bonusMsg = " 👑 +250 Coins Ultimate Streak Bonus!";
    }

    onUpdateProgress({
      streakCount: updatedStreak,
      longestStreak: updatedLongest,
      lastActiveDate: dateStr,
      activityDates: updatedActivityDates,
      streakCalendar: updatedCalendar,
      coins: progress.coins + coinsBonus
    });

    setSimulationMsg(`🔥 Checked in for ${dayName} (${dateStr})! Streak increased to ${updatedStreak} days!${bonusMsg}`);
  };

  // Simulate missed day (to demonstrate how Streak Freezes work as "insurance")
  const simulateMissedDay = () => {
    if (streakFreezes > 0) {
      // Consume a freeze to protect streak
      onUpdateProgress({
        streakFreezes: streakFreezes - 1
      });
      setSimulationMsg("❄️ Streak Freeze Activated! You missed a day, but your streak freeze saved your streak from resetting!");
    } else {
      // Reset streak!
      onUpdateProgress({
        streakCount: 0,
        streakCalendar: [],
        activityDates: []
      });
      setSimulationMsg("😢 Oh no! You missed a day without a Streak Freeze. Your learning streak reset to 0. Finish a lesson today to fire it up again!");
    }
  };

  // Reset calendar simulation
  const resetSimulationCalendar = () => {
    onUpdateProgress({
      streakCalendar: [],
      activityDates: [],
      streakCount: 0
    });
    setSimulationMsg("⏳ Reset complete! Calendar cleared. Complete lessons on consecutive days to build your real streak!");
  };

  // Calculate milestone percentage
  const nextMilestone = streakCount < 4 ? 4 : streakCount < 7 ? 7 : 14;
  const milestoneProgress = Math.min((streakCount / nextMilestone) * 100, 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-[2.5rem] border-4 border-rose-100 shadow-2xl max-w-lg w-full overflow-hidden text-left"
        >
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-6 text-white relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl animate-bounce">
                🔥
              </div>
              <div>
                <span className="text-xs bg-white/20 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  DAILY STREAK
                </span>
                <h3 className="text-2xl font-black font-display tracking-tight mt-1">
                  {streakCount} Day Learning Streak!
                </h3>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Week Calendar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-slate-800 text-sm tracking-wide font-display uppercase">
                  This Week's Track
                </h4>
                <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-rose-500" /> Keep learning to light the fire!
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {weekDays.map(({ dayName, dateStr, isToday }) => {
                  const isCompleted = activityDates.includes(dateStr) || streakCalendar.includes(dayName);
                  return (
                    <button
                      key={dateStr}
                      onClick={() => simulateCheckInForDay(dateStr, dayName)}
                      title={`Click to check in for ${dayName} (${dateStr})`}
                      className={`flex flex-col items-center justify-between p-2 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
                        isCompleted
                          ? "bg-rose-50 border-rose-300 shadow-[0_3px_0_0_#fecdd3]"
                          : isToday
                          ? "bg-amber-50 border-amber-300 text-amber-700 font-bold animate-pulse"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      <span className="text-xs font-black uppercase">{dayName}</span>
                      <div className="my-1.5 text-xl filter drop-shadow">
                        {isCompleted ? "🔥" : isToday ? "⭐" : "⚪"}
                      </div>
                      <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                        isCompleted 
                          ? "bg-rose-100 text-rose-700" 
                          : isToday 
                          ? "bg-amber-200 text-amber-800" 
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {isCompleted ? "DONE" : isToday ? "TODAY" : "MISS"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Streak Milestone Rewards */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-100 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-amber-900 text-xs uppercase tracking-wide">
                    Next Reward Milestone
                  </h4>
                  <p className="text-xs font-bold text-amber-700">
                    Reach a {nextMilestone}-Day streak to earn bonuses!
                  </p>
                </div>
                <div className="bg-amber-400 text-amber-950 px-2.5 py-1 rounded-xl text-xs font-black shadow-sm">
                  {streakCount} / {nextMilestone} Days
                </div>
              </div>

              <div className="w-full h-3.5 bg-amber-100 rounded-full overflow-hidden border border-amber-200/50">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-black text-amber-800">
                <span>Current: {streakCount} Days</span>
                <span className="flex items-center gap-1">
                  🎁 Next: +{nextMilestone === 4 ? "30" : nextMilestone === 7 ? "100" : "250"} Coins
                </span>
              </div>
            </div>

            {/* Stats Grill */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border-2 border-slate-100 p-3.5 rounded-2xl text-center">
                <p className="text-xs font-black text-slate-400 uppercase">Longest Streak</p>
                <p className="text-2xl font-black text-slate-800 font-display mt-0.5">👑 {longestStreak} Days</p>
              </div>
              <div className="bg-slate-50 border-2 border-slate-100 p-3.5 rounded-2xl text-center relative overflow-hidden">
                <p className="text-xs font-black text-slate-400 uppercase flex items-center justify-center gap-1">
                  <Snowflake className="w-3.5 h-3.5 text-sky-400" /> STREAK FREEZE
                </p>
                <p className="text-2xl font-black text-sky-600 font-display mt-0.5">{streakFreezes} Owned</p>
              </div>
            </div>

            {/* Simulated interactive feedback alert */}
            {simulationMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-sky-50 border border-sky-100 text-xs sm:text-sm p-3.5 rounded-2xl text-sky-800 font-semibold leading-relaxed flex items-start gap-2.5 shadow-inner"
              >
                <span className="text-lg">🦉</span>
                <div>
                  <p className="font-bold text-sky-900 font-display">Finny's Streak Guide:</p>
                  <p className="mt-0.5">{simulationMsg}</p>
                </div>
              </motion.div>
            )}

            {/* FINNY'S EXPLAINER: Insurance & Emergency Fund */}
            <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 flex gap-3 text-left">
              <span className="text-2xl">💡</span>
              <div className="space-y-1">
                <h5 className="font-black text-sky-900 text-xs sm:text-sm uppercase tracking-wide">
                  Financial Connection: Streak Freeze & Insurance
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  A <strong>Streak Freeze</strong> works exactly like <strong>Insurance</strong>! You pay a small premium (50 Coins) to guard against a large loss (losing a 10-day streak!). Just like an emergency fund or medical insurance, it keeps you secure when the unexpected happens!
                </p>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              
              <div className="flex gap-2">
                <button
                  onClick={buyFreeze}
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-2xl shadow-md border-b-4 border-sky-700 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Snowflake className="w-4 h-4 fill-sky-200" /> Buy Streak Freeze (50 🪙)
                </button>

                <button
                  onClick={simulateMissedDay}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-black py-3 rounded-2xl shadow-md border-b-4 border-slate-950 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-4 h-4 text-rose-400" /> Miss a Day (Test Freeze)
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={resetSimulationCalendar}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-all"
                >
                  ⏳ Reset Simulation Calendar (Warp Time)
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
