export interface UserProgress {
  xp: number;
  coins: number;
  level: number;
  completedModules: string[]; // module IDs
  badges: string[]; // badge IDs
  unlockedAvatarItems: string[]; // item IDs
  equippedAvatarItems: {
    hat?: string;
    glasses?: string;
    clothing?: string;
    companion?: string;
  };
  streakCount?: number;
  longestStreak?: number;
  streakFreezes?: number;
  streakCalendar?: string[]; // e.g., ["Mon", "Tue"]
  lastActiveDate?: string; // YYYY-MM-DD
  activityDates?: string[]; // Array of YYYY-MM-DD dates completed
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "basics" | "earning" | "spending" | "saving" | "investing";
  estimatedMinutes: number;
  xpReward: number;
  coinReward: number;
  badge: Badge;
  quizzes: QuizQuestion[];
}

export interface AvatarItem {
  id: string;
  name: string;
  category: "hat" | "glasses" | "clothing" | "companion";
  cost: number;
  asset: string; // text emblem or short emoji representation
  color: string;
}

export interface StockState {
  id: string;
  name: string;
  symbol: string;
  price: number;
  history: number[];
  volatility: number;
  trend: number; // positive or negative modifier
  description: string;
}
