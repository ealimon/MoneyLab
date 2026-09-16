import React, { useState, useEffect } from "react";
import { 
  Coins, Award, BookOpen, Star, RefreshCw, Sparkles, ChevronRight, CheckCircle,
  GraduationCap, Play, Lock, AlertCircle, Sparkle, ArrowLeft, Printer, Flame,
  FlaskConical, Zap, Volume2, VolumeX
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { MODULES } from "./data";
import { ADVENTURE_MODULES, AdventureModuleConfig } from "./modulesConfig";
import { UserProgress } from "./types";
import ModuleInteractive from "./components/modules/ModuleInteractive";
import ModuleQuiz from "./components/ModuleQuiz";
import ModuleWorksheet from "./components/ModuleWorksheet";
import StreakModal from "./components/StreakModal";
import JuniorSaverCertificateModal from "./components/JuniorSaverCertificateModal";
import { 
  evaluateUserStreakOnLoad, 
  recordActivityForToday, 
  getCurrentWeekDays 
} from "./utils/streakUtils";
import { 
  playPopSound, 
  playSuccessChime, 
  isAudioMuted, 
  toggleAudioMuted 
} from "./utils/audio";

const STORAGE_KEY = "finance_quest_academy_progress";

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  coins: 100, // Start with a 100 coin sign-up bonus!
  level: 1,
  completedModules: [],
  badges: [],
  unlockedAvatarItems: [],
  equippedAvatarItems: {},
  streakCount: 0,
  longestStreak: 0,
  streakFreezes: 1,
  streakCalendar: [],
  activityDates: []
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [activeTab, setActiveTab] = useState<"modules" | "badges">("modules");
  const [viewMode, setViewMode] = useState<"playground" | "activity">("playground");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("m1");
  const [workspaceTab, setWorkspaceTab] = useState<"game" | "worksheet">("game");
  const [moduleStage, setModuleStage] = useState<"intro" | "game" | "quiz" | "complete">("intro");
  const [gradeFilter, setGradeFilter] = useState<"all" | "gr6" | "gr7" | "gr8">("all");
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => isAudioMuted());

  // Attach global tactile click feedback for tactile wooden pop sound
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("button, [role='button'], input[type='button'], input[type='submit']");
      if (target) {
        // Skip audio toggle itself to avoid playing click before mute updates
        if ((target as HTMLElement).id === "audio-toggle-btn") return;
        playPopSound();
      }
    };
    document.addEventListener("click", handleDocumentClick, { passive: true });
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleToggleAudio = () => {
    const next = toggleAudioMuted();
    setIsMuted(next);
  };

  // Load progress from LocalStorage on mount & evaluate streak
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let loadedProgress = DEFAULT_PROGRESS;

    if (saved) {
      try {
        loadedProgress = { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to load user progress:", e);
      }
    }

    // Run real daily date streak evaluation
    const { updatedProgress, notificationMessage } = evaluateUserStreakOnLoad(loadedProgress);
    setProgress(updatedProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));

    if (notificationMessage) {
      console.log("Streak status update:", notificationMessage);
    }
  }, []);

  // Save progress changes
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const handleUpdateProgress = (updates: Partial<UserProgress>) => {
    const updated = { ...progress, ...updates };
    saveProgress(updated);
  };

  const handleResetProgress = () => {
    if (window.confirm("Hoot! Are you sure you want to reset your academy learning history, unlocked coins, and accessories? This cannot be undone!")) {
      saveProgress(DEFAULT_PROGRESS);
      setSelectedModuleId("m1");
      setWorkspaceTab("game");
      setModuleStage("intro");
      setViewMode("playground");
      setActiveTab("modules");
    }
  };

  // Helper to calculate next level threshold
  const getXpThreshold = (lvl: number) => lvl * 200;

  const activeModule = MODULES.find(m => m.id === selectedModuleId) || MODULES[0];
  const activeAdventure = ADVENTURE_MODULES.find(m => m.id === selectedModuleId) || ADVENTURE_MODULES[0];

  const currentAdvIndex = ADVENTURE_MODULES.findIndex(a => a.id === selectedModuleId);
  const nextAdventure = currentAdvIndex >= 0 && currentAdvIndex < ADVENTURE_MODULES.length - 1
    ? ADVENTURE_MODULES[currentAdvIndex + 1]
    : ADVENTURE_MODULES[0];

  const handleOpenGame = (modId: string) => {
    setSelectedModuleId(modId);
    setWorkspaceTab("game");
    setModuleStage("intro");
    setViewMode("activity");
    setActiveTab("modules");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenWorksheet = (modId: string) => {
    setSelectedModuleId(modId);
    setWorkspaceTab("worksheet");
    setViewMode("activity");
    setActiveTab("modules");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPlayground = () => {
    setViewMode("playground");
    setActiveTab("modules");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToNextActivity = () => {
    setSelectedModuleId(nextAdventure.id);
    setWorkspaceTab("game");
    setModuleStage("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModuleStageTransition = (stage: "intro" | "game" | "quiz" | "complete") => {
    setModuleStage(stage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinishQuiz = () => {
    if (!activeModule) return;

    const isAlreadyCompleted = progress.completedModules.includes(activeModule.id);
    const updatedCompleted = isAlreadyCompleted 
      ? progress.completedModules 
      : [...progress.completedModules, activeModule.id];

    const isBadgeAlreadyOwned = progress.badges.includes(activeModule.badge.id);
    const updatedBadges = isBadgeAlreadyOwned 
      ? progress.badges 
      : [...progress.badges, activeModule.badge.id];

    // Record today's activity in streak engine
    const { updatedProgress: streakProgress, milestoneCoinsBonus } = recordActivityForToday(progress);

    // Accumulate rewards
    let newXp = streakProgress.xp + activeModule.xpReward;
    let newCoins = streakProgress.coins + activeModule.coinReward + milestoneCoinsBonus;
    let newLevel = streakProgress.level;

    while (newXp >= getXpThreshold(newLevel)) {
      newXp -= getXpThreshold(newLevel);
      newLevel += 1;
    }
    
    saveProgress({
      ...streakProgress,
      xp: newXp,
      coins: newCoins,
      level: newLevel,
      completedModules: updatedCompleted,
      badges: updatedBadges
    });

    playSuccessChime();
    setModuleStage("complete");
  };

  // Filter modules according to selected grade pill
  const filteredAdventures = ADVENTURE_MODULES.filter(adv => {
    if (gradeFilter === "all") return true;
    return adv.gradeFilter === gradeFilter;
  });

  return (
    <div className="min-h-screen bg-[#fefce8] text-slate-900 flex flex-col justify-between font-sans selection:bg-yellow-300 selection:text-black">
      
      {/* HEADER SECTION */}
      <header className="bg-white border-b-4 border-black px-4 sm:px-6 py-3.5 sticky top-0 z-40 shadow-[0_4px_0_0_#000000] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button 
              id="header-home-btn"
              onClick={handleBackToPlayground}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 bg-yellow-400 border-2 border-black rounded-2xl flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000] group-hover:rotate-6 transition-transform">
                <FlaskConical className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 font-display block leading-none">
                  Financial Simulation Lab
                </span>
                <span className="text-xl sm:text-2xl font-black font-display text-black tracking-tight flex items-center gap-1.5 leading-tight">
                  MONEYLAB <span className="text-[10px] bg-black text-yellow-400 font-mono px-1.5 py-0.5 rounded border border-black uppercase">SIM</span>
                </span>
              </div>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1 bg-[#fef08a] border-2 border-black text-black px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0px_0px_#000] uppercase font-display">
              GRADES 6–8 LABS
            </span>
          </div>

          {/* Gamified Stat Meters & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end w-full md:w-auto">
            
            {/* Audio Toggle (Wooden Bubble Pop / Mute) */}
            <button
              id="audio-toggle-btn"
              onClick={handleToggleAudio}
              className={`border-2 border-black px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 font-display transition-all active:translate-y-0.5 cursor-pointer ${
                isMuted ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-emerald-100 text-emerald-950 hover:bg-emerald-200"
              }`}
              title={isMuted ? "Audio is Muted — Click to Enable Sound" : "Audio is Enabled — Click to Mute"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600" />
                  <span className="hidden sm:inline text-xs text-rose-700 font-bold">MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span className="hidden sm:inline text-xs text-emerald-800 font-bold">SOUND ON</span>
                </>
              )}
            </button>

            {/* Stars / Coins Balance */}
            <div className="bg-[#fde047] border-2 border-black text-black px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 font-display">
              <Star className="w-4 h-4 fill-amber-500 text-black" />
              <span>{progress.coins} STARS</span>
            </div>

            {/* Certificate Button */}
            <button
              id="certificate-btn"
              onClick={() => {
                playSuccessChime();
                setIsCertificateModalOpen(true);
              }}
              className="bg-[#fcd34d] hover:bg-[#fbbf24] border-2 border-black text-black px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 font-display transition-all active:translate-y-0.5 cursor-pointer"
              title="View your official Middle School Financial Literacy Diploma"
            >
              <Award className="w-4 h-4 text-black" />
              <span>DIPLOMA UNLOCKED</span>
            </button>

            {/* Streak Counter */}
            <button
              id="streak-btn"
              onClick={() => setIsStreakModalOpen(true)}
              className="bg-white hover:bg-slate-50 border-2 border-black text-black px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 font-display transition-all active:translate-y-0.5 cursor-pointer"
              title="View Daily Learning Streak"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{progress.streakCount || 0}d</span>
            </button>

            {/* Reset Stats */}
            <button
              id="reset-stats-btn"
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset All Progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-8 print:p-0 print:m-0 print:max-w-none print:w-full print:space-y-0">
        
        {/* ========================================================
            PLAYGROUND VIEW: 10 MODULES EVENLY DISPLAYED IN 2-COL GRID
            ======================================================== */}
        {activeTab === "modules" && viewMode === "playground" && (
          <div className="space-y-8">
            
            {/* HERO DUAL BANNERS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* LEFT CARD: WELCOME & LAB INTRO */}
              <div className="lg:col-span-7 bg-[#f59e0b] border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between text-left">
                <div>
                  <span className="bg-white border-2 border-black text-black px-3 py-1 rounded-full text-xs font-black uppercase font-display inline-block mb-3 shadow-[2px_2px_0px_0px_#000]">
                    MONEYLAB SIMULATOR 🧪
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-950 tracking-tight leading-none">
                    FINANCIAL MASTERY LAB
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-3 max-w-xl leading-relaxed">
                    Master real-world money systems: trade with villagers, evaluate career paychecks, balance 50/30/20 budgets, calculate compound interest, write bank checks, avoid credit card traps, and simulate stock market portfolios!
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-black font-display tracking-wider uppercase">
                    10 REAL-WORLD MODULES
                  </span>
                  <span className="bg-white text-black border-2 border-black px-3.5 py-1.5 rounded-xl text-xs font-black font-display uppercase shadow-[2px_2px_0px_0px_#000]">
                    GRADES 6–8 CURRICULUM
                  </span>
                </div>
              </div>

              {/* RIGHT CARD: TROPHY CASE PROGRESS */}
              <div className="lg:col-span-5 bg-white border-4 border-black rounded-3xl p-6 sm:p-7 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black font-display text-base sm:text-lg text-slate-950 uppercase tracking-wide flex items-center gap-2">
                      <span>🏆</span> TROPHY CASE
                    </span>
                    <span className="text-xs font-black font-display bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-300">
                      GRADUATION GOAL
                    </span>
                  </div>

                  <div>
                    <p className="text-3xl font-black font-display text-amber-600 leading-tight">
                      {progress.completedModules.length} of 10 Modules Mastered
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                      {10 - progress.completedModules.length > 0 
                        ? `${10 - progress.completedModules.length} more to master all modules and earn your MoneyLab Certificate of Mastery!` 
                        : "🎉 Outstanding! You've mastered all 10 modules! Claim your official MoneyLab certificate!"}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 border-2 border-black rounded-full h-5 p-0.5 overflow-hidden shadow-inner">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all duration-500 border-r-2 border-black"
                      style={{ width: `${Math.max(5, (progress.completedModules.length / 10) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveTab("badges")}
                    className="text-xs font-black font-display text-slate-700 hover:text-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    View Badges ({progress.badges.length}) 🏅
                  </button>
                  <button
                    onClick={() => setIsCertificateModalOpen(true)}
                    className="bg-amber-300 hover:bg-amber-400 text-black border-2 border-black px-3.5 py-1.5 rounded-xl font-black text-xs font-display shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
                  >
                    View Diploma 📜
                  </button>
                </div>
              </div>

            </div>

            {/* FILTER & CATEGORY NAV BAR */}
            <div className="bg-white border-4 border-black rounded-2xl p-3 sm:p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
                <span className="text-xs font-black font-display uppercase tracking-wider text-slate-500 mr-1">
                  FILTER BY GRADE:
                </span>
                <button
                  onClick={() => setGradeFilter("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-display uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                    gradeFilter === "all"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  ALL MODULES
                </button>
                <button
                  onClick={() => setGradeFilter("gr6")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-display uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                    gradeFilter === "gr6"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  GRADE 6
                </button>
                <button
                  onClick={() => setGradeFilter("gr7")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-display uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                    gradeFilter === "gr7"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  GRADE 7
                </button>
                <button
                  onClick={() => setGradeFilter("gr8")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-display uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                    gradeFilter === "gr8"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  GRADE 8
                </button>
              </div>

              {/* Quick Links to Extras */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setActiveTab("badges")}
                  className="bg-slate-100 hover:bg-slate-200 border-2 border-black text-black px-3.5 py-1.5 rounded-xl text-xs font-black font-display shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                >
                  Badges 🏅
                </button>
              </div>
            </div>

            {/* THE 10 MODULES EVENLY DISPLAYED IN 2 COLUMNS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAdventures.map((adv) => {
                const isCompleted = progress.completedModules.includes(adv.id);

                return (
                  <div 
                    key={adv.id}
                    id={`adventure-card-${adv.id}`}
                    className="bg-white border-4 border-black rounded-3xl p-6 shadow-[5px_5px_0px_0px_#000] hover:shadow-[7px_7px_0px_0px_#000] hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-5 text-left"
                  >
                    {/* Top Row: Category Tag + Grade Badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black font-display tracking-wider uppercase shadow-[2px_2px_0px_0px_#000] ${adv.categoryBg}`}>
                        {adv.categoryTag}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#67e8f9] text-black border-2 border-black px-2.5 py-1 rounded-xl text-xs font-black font-display shadow-[2px_2px_0px_0px_#000]">
                          {adv.grade}
                        </span>
                        {isCompleted && (
                          <span className="bg-[#86efac] text-black border-2 border-black px-2.5 py-1 rounded-xl text-xs font-black font-display shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                            DONE ✓
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-950 tracking-tight flex items-center gap-2">
                        <span>{adv.cardTitle}</span>
                        <span className="text-2xl shrink-0">{adv.icon}</span>
                      </h3>
                      <p className="text-sm sm:text-base font-bold text-slate-700 leading-snug font-sans">
                        {adv.description}
                      </p>
                    </div>

                    {/* Footer: Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-dashed border-slate-100">
                      <button
                        id={`play-btn-${adv.id}`}
                        onClick={() => handleOpenGame(adv.id)}
                        className={`${adv.actionBg} font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl font-display flex items-center gap-1.5 transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider`}
                      >
                        {adv.actionLabel}
                      </button>
                      <button
                        id={`worksheet-btn-${adv.id}`}
                        onClick={() => handleOpenWorksheet(adv.id)}
                        className="bg-[#f472b6] hover:bg-[#f43f5e] text-black font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 transition-all active:translate-y-0.5 cursor-pointer font-display"
                      >
                        <BookOpen className="w-4 h-4" /> WORKSHEET
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================
            FOCUSED ACTIVITY VIEW: WHEN USER CLICKS PLAY OR WORKSHEET
            ======================================================== */}
        {activeTab === "modules" && viewMode === "activity" && (
          <div className="space-y-6 print:space-y-0">
            
            {/* TOP NAVIGATION CONTROLS */}
            <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
              
              {/* Back to Playground Button */}
              <button
                id="back-to-playground-btn"
                onClick={handleBackToPlayground}
                className="bg-white hover:bg-slate-100 text-black font-black text-sm px-4 py-2.5 rounded-2xl border-3 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 cursor-pointer font-display transition-all active:translate-y-0.5 w-full md:w-auto justify-center"
              >
                <ArrowLeft className="w-4 h-4" /> BACK TO PLAYGROUND
              </button>

              {/* Center Activity Badge */}
              <div className="bg-[#fef08a] border-2 border-black text-black px-4 py-1.5 rounded-2xl text-xs sm:text-sm font-black font-display shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider">
                PLAYING {activeAdventure.cardTitle.toUpperCase()}
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center">
                <button
                  id="tab-mode-game"
                  onClick={() => setWorkspaceTab("game")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black font-display border-2 border-black transition-all cursor-pointer ${
                    workspaceTab === "game"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🎮 PLAY GAME
                </button>
                <button
                  id="tab-mode-worksheet"
                  onClick={() => setWorkspaceTab("worksheet")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black font-display border-2 border-black transition-all cursor-pointer ${
                    workspaceTab === "worksheet"
                      ? "bg-pink-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🖨️ WORKSHEET
                </button>
              </div>

            </div>

            {/* MAIN ACTIVITY CONTENT */}
            <div>
              {workspaceTab === "worksheet" ? (
                <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] print:border-0 print:p-0 print:shadow-none print:rounded-none print:bg-transparent">
                  <ModuleWorksheet
                    moduleId={activeModule.id}
                    moduleTitle={activeModule.title}
                    moduleSubtitle={activeModule.subtitle}
                    moduleCategory={activeModule.category}
                  />
                </div>
              ) : (
                <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] space-y-6">
                  
                  {/* GAME STAGES FLOW */}
                  {moduleStage === "intro" && (
                    <div className="max-w-2xl mx-auto space-y-6 text-left">
                      <div className="space-y-2 pb-4 border-b-2 border-dashed border-slate-200">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black font-display uppercase tracking-wider border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]">
                          {activeAdventure.scenarioTag}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-950 mt-2">
                          {activeAdventure.cardTitle}
                        </h2>
                        <p className="text-sm font-bold text-slate-600 font-sans">
                          {activeModule.subtitle}
                        </p>
                      </div>

                      <div className="bg-amber-50/70 p-6 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3.5 text-sm sm:text-base font-medium text-slate-800">
                        <p className="font-black text-slate-950 flex items-center gap-2 font-display text-lg">
                          <GraduationCap className="w-6 h-6 text-amber-600 shrink-0" /> Learning Core Concepts:
                        </p>
                        <p className="leading-relaxed">
                          {activeModule.description}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-amber-950 bg-amber-200/70 p-3 rounded-xl border border-amber-300">
                          💡 In this activity, you'll solve hands-on practical scenarios and test your skills to earn Stars and official Diplomas!
                        </p>
                      </div>

                      <button
                        id="launch-interactive-game"
                        onClick={() => handleModuleStageTransition("game")}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black py-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_#000] active:translate-y-0.5 transition-all text-base sm:text-lg flex items-center justify-center gap-2 font-display uppercase tracking-wider cursor-pointer"
                      >
                        Start Interactive Game! <Play className="w-5 h-5 fill-slate-950" />
                      </button>
                    </div>
                  )}

                  {moduleStage === "game" && activeModule && (
                    <ModuleInteractive
                      module={activeModule}
                      userCoins={progress.coins}
                      onComplete={() => handleModuleStageTransition("quiz")}
                    />
                  )}

                  {moduleStage === "quiz" && activeModule && (
                    <ModuleQuiz
                      module={activeModule}
                      onComplete={handleFinishQuiz}
                    />
                  )}

                  {moduleStage === "complete" && activeModule && (
                    <div className="bg-[#fffbeb] border-4 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_#000] text-center space-y-6 max-w-md mx-auto">
                      <div className="text-7xl animate-bounce">
                        🦉🏅
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-3xl font-black text-slate-950 tracking-tight font-display">Lesson Mastered!</h2>
                        <p className="text-sm text-slate-700 font-bold">
                          Congratulations! You've claimed the <strong>{activeModule.badge.title}</strong> badge and completed this adventure!
                        </p>
                      </div>

                      <div className="bg-emerald-100 border-2 border-black rounded-2xl py-3 px-5 text-sm font-black text-emerald-950 inline-block font-display shadow-[2px_2px_0px_0px_#000]">
                        +{activeModule.coinReward} Stars • +{activeModule.xpReward} XP Awarded!
                      </div>

                      <div className="flex flex-col gap-3 pt-2">
                        <button
                          id="next-adventure-btn"
                          onClick={handleGoToNextActivity}
                          className="w-full bg-emerald-400 hover:bg-emerald-300 text-black font-black py-3.5 px-4 rounded-2xl border-3 border-black shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 transition-all text-sm font-display flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                          Next: {nextAdventure.cardTitle} ➡️
                        </button>
                        <button
                          onClick={handleBackToPlayground}
                          className="w-full bg-white hover:bg-slate-100 text-black font-black py-3 px-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_#000] text-sm font-display cursor-pointer"
                        >
                          Back to Playground 🗺️
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* BOTTOM NAV BAR */}
            <div className="flex items-center justify-between gap-4 pt-2 print:hidden">
              <button
                onClick={handleBackToPlayground}
                className="bg-white hover:bg-slate-100 text-black font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 cursor-pointer font-display"
              >
                <ArrowLeft className="w-4 h-4" /> All Activities
              </button>

              <button
                onClick={handleGoToNextActivity}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 cursor-pointer font-display"
              >
                Next: {nextAdventure.cardTitle} <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: BADGES GALLERY
            ======================================================== */}
        {activeTab === "badges" && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Trophy Collection</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">Your Badge Accomplishments</h2>
                <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                  Unlocked {progress.badges.length} of {MODULES.length} Collectible Medals
                </p>
              </div>

              <button
                onClick={handleBackToPlayground}
                className="bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black px-4 py-2 rounded-2xl font-black text-xs sm:text-sm font-display shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              >
                Back to Activities 🗺️
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {MODULES.map((mod) => {
                const isEarned = progress.badges.includes(mod.badge.id);
                return (
                  <div 
                    key={mod.badge.id}
                    className={`border-3 border-black rounded-3xl p-5 text-center space-y-3 transition-all flex flex-col justify-between ${
                      isEarned 
                        ? "bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1" 
                        : "bg-slate-100 border-dashed opacity-60 select-none"
                    }`}
                  >
                    <div className="relative inline-block mx-auto">
                      <div className={`w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center text-3xl mx-auto shadow-[2px_2px_0px_0px_#000] ${
                        isEarned ? "bg-amber-300" : "bg-slate-200 text-slate-400"
                      }`}>
                        {isEarned ? "🏅" : "🔒"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-black text-slate-950 text-sm leading-tight font-display">{mod.badge.title}</h4>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wide font-display">{mod.title.replace(/\d+\.\s+/, "")}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-normal line-clamp-2 font-medium">
                      {isEarned ? mod.badge.description : "Locked. Pass this module evaluation to claim!"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* JUNIOR SAVER CERTIFICATE MODAL */}
      <JuniorSaverCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        progress={progress}
      />

      {/* STREAK CALENDAR MODAL */}
      <div className="print:hidden">
        <StreakModal 
          isOpen={isStreakModalOpen}
          onClose={() => setIsStreakModalOpen(false)}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
        />
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t-4 border-black py-6 mt-12 shadow-inner print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 font-black font-display gap-3">
          <p>© 2026 STORYBOOK FINANCE. Designed for future financial champions.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Sparkle className="w-3.5 h-3.5 text-yellow-500" /> 10 ADVENTURES</span>
            <span className="flex items-center gap-1"><Sparkle className="w-3.5 h-3.5 text-indigo-500" /> PRINTABLE WORKSHEETS</span>
            <span className="flex items-center gap-1"><Sparkle className="w-3.5 h-3.5 text-emerald-500" /> OFFICIAL DIPLOMA</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
