import { UserProgress } from "../types";

export function getTodayFormatted(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayFormatted(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDaysBetween(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + "T00:00:00");
  const d2 = new Date(dateStr2 + "T00:00:00");
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 3600 * 24));
}

export function getDayName(dateStr: string): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(dateStr + "T00:00:00");
  return days[d.getDay()];
}

/**
 * Returns the 7 days (Mon-Sun) for the current week containing `referenceDateStr`.
 */
export function getCurrentWeekDays(referenceDateStr: string = getTodayFormatted()): Array<{
  dayName: string;
  dateStr: string;
  isToday: boolean;
}> {
  const ref = new Date(referenceDateStr + "T00:00:00");
  const dayOfWeek = ref.getDay(); // 0 is Sun, 1 is Mon...
  
  // Calculate distance to Monday
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(ref);
  monday.setDate(ref.getDate() + distanceToMonday);

  const daysNameMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayStr = getTodayFormatted();

  return daysNameMap.map((dayName, idx) => {
    const dayObj = new Date(monday);
    dayObj.setDate(monday.getDate() + idx);
    const year = dayObj.getFullYear();
    const month = String(dayObj.getMonth() + 1).padStart(2, "0");
    const day = String(dayObj.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    return {
      dayName,
      dateStr,
      isToday: dateStr === todayStr
    };
  });
}

/**
 * Evaluates the user's streak status when the app loads or wakes up.
 * Checks if streak needs protection via Streak Freeze or if it broke due to inactive days.
 */
export function evaluateUserStreakOnLoad(progress: UserProgress): {
  updatedProgress: UserProgress;
  notificationMessage?: string;
} {
  const today = getTodayFormatted();
  const lastActive = progress.lastActiveDate;

  // If no previous activity date exists, initialize with current values
  if (!lastActive) {
    return { updatedProgress: progress };
  }

  // Days since last active lesson
  const daysDiff = getDaysBetween(lastActive, today);

  // If active today or yesterday, streak is alive and healthy!
  if (daysDiff <= 1) {
    return { updatedProgress: progress };
  }

  // User missed 2 or more days!
  const currentStreak = progress.streakCount ?? 0;
  const freezes = progress.streakFreezes ?? 0;

  if (currentStreak > 0 && freezes > 0) {
    // Consume 1 streak freeze to protect the streak!
    const yesterday = getYesterdayFormatted();
    const updatedProgress: UserProgress = {
      ...progress,
      streakFreezes: freezes - 1,
      lastActiveDate: yesterday // Protects streak so today continues it
    };
    return {
      updatedProgress,
      notificationMessage: "❄️ Streak Freeze Activated! You missed a day, but your streak freeze protected your hard-earned streak!"
    };
  } else if (currentStreak > 0) {
    // No freeze available -> Streak resets
    const updatedProgress: UserProgress = {
      ...progress,
      streakCount: 0,
      streakCalendar: []
    };
    return {
      updatedProgress,
      notificationMessage: "😢 Oh no! You missed a day without a Streak Freeze, so your streak reset to 0. Finish a lesson today to start a fresh fire!"
    };
  }

  return { updatedProgress: progress };
}

/**
 * Called when user completes an activity/quiz today.
 */
export function recordActivityForToday(progress: UserProgress): {
  updatedProgress: UserProgress;
  milestoneCoinsBonus: number;
  message: string;
} {
  const today = getTodayFormatted();
  const todayDayName = getDayName(today);
  const activityDates = progress.activityDates ?? [];
  const streakCalendar = progress.streakCalendar ?? [];
  const lastActive = progress.lastActiveDate;

  // Already completed an activity today
  if (activityDates.includes(today)) {
    return {
      updatedProgress: progress,
      milestoneCoinsBonus: 0,
      message: `✨ Great job continuing to practice today!`
    };
  }

  // Calculate new streak count
  let newStreakCount = progress.streakCount ?? 0;
  if (!lastActive) {
    newStreakCount = 1;
  } else {
    const daysDiff = getDaysBetween(lastActive, today);
    if (daysDiff <= 1) {
      newStreakCount += 1;
    } else {
      // Missed days
      newStreakCount = 1;
    }
  }

  const newLongestStreak = Math.max(newStreakCount, progress.longestStreak ?? 0);
  const updatedActivityDates = Array.from(new Set([...activityDates, today]));
  const updatedCalendar = Array.from(new Set([...streakCalendar, todayDayName]));

  // Milestone bonuses
  let milestoneCoinsBonus = 0;
  let bonusMsg = "";
  if (newStreakCount === 4) {
    milestoneCoinsBonus = 30;
    bonusMsg = " 🎉 Earned +30 Coins Milestone Bonus!";
  } else if (newStreakCount === 7) {
    milestoneCoinsBonus = 100;
    bonusMsg = " 🔥 Earned +100 Coins Super Streak Bonus!";
  } else if (newStreakCount === 14) {
    milestoneCoinsBonus = 250;
    bonusMsg = " 👑 Earned +250 Coins Ultimate Streak Bonus!";
  }

  const updatedProgress: UserProgress = {
    ...progress,
    streakCount: newStreakCount,
    longestStreak: newLongestStreak,
    lastActiveDate: today,
    activityDates: updatedActivityDates,
    streakCalendar: updatedCalendar,
    coins: progress.coins + milestoneCoinsBonus
  };

  return {
    updatedProgress,
    milestoneCoinsBonus,
    message: `🔥 Completed today's lesson! Your streak is now ${newStreakCount} day${newStreakCount === 1 ? "" : "s"}!${bonusMsg}`
  };
}
