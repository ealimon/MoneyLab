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

export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * School days (Mon-Fri) strictly between two dates. Weekends never count as
 * missed, so a class that plays Mon-Fri keeps its streak through the weekend.
 */
export function weekdaysBetween(from: string, to: string): number {
  const span = getDaysBetween(from, to);
  let count = 0;
  for (let i = 1; i < span && i < 400; i++) {
    const dow = new Date(addDays(from, i) + "T00:00:00").getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
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
export function evaluateUserStreakOnLoad(progress: UserProgress, today: string = getTodayFormatted()): {
  updatedProgress: UserProgress;
  notificationMessage?: string;
} {
  const lastActive = progress.lastActiveDate;

  // If no previous activity date exists, initialize with current values
  if (!lastActive) {
    return { updatedProgress: progress };
  }

  // School days (Mon-Fri) skipped since the last lesson. Weekends are free.
  const missedDays = weekdaysBetween(lastActive, today);

  // Nothing missed: the streak is alive and healthy!
  if (missedDays === 0) {
    return { updatedProgress: progress };
  }

  const currentStreak = progress.streakCount ?? 0;
  const freezes = progress.streakFreezes ?? 0;

  if (currentStreak > 0 && freezes >= missedDays) {
    // Each missed day consumes one streak freeze
    const yesterday = addDays(today, -1);
    const updatedProgress: UserProgress = {
      ...progress,
      streakFreezes: freezes - missedDays,
      lastActiveDate: yesterday // Protects streak so today continues it
    };
    return {
      updatedProgress,
      notificationMessage: `❄️ Streak Freeze Activated! You missed ${missedDays} school day${missedDays === 1 ? "" : "s"}, and ${missedDays} streak freeze${missedDays === 1 ? "" : "s"} protected your hard-earned streak!`
    };
  } else if (currentStreak > 0) {
    // Not enough freezes to cover every missed day -> Streak resets (freezes are kept)
    const updatedProgress: UserProgress = {
      ...progress,
      streakCount: 0,
      streakCalendar: []
    };
    return {
      updatedProgress,
      notificationMessage: `😢 Oh no! You missed ${missedDays} school day${missedDays === 1 ? "" : "s"} and didn't have enough Streak Freezes, so your streak reset to 0. Finish a lesson today to start a fresh fire!`
    };
  }

  return { updatedProgress: progress };
}

/**
 * Called when user completes an activity/quiz today.
 */
export function recordActivityForToday(progress: UserProgress, today: string = getTodayFormatted()): {
  updatedProgress: UserProgress;
  milestoneCoinsBonus: number;
  message: string;
} {
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
    if (weekdaysBetween(lastActive, today) === 0) {
      newStreakCount += 1;
    } else {
      // Missed school days
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
    bonusMsg = " 🎉 Earned +30 Stars Milestone Bonus!";
  } else if (newStreakCount === 7) {
    milestoneCoinsBonus = 100;
    bonusMsg = " 🔥 Earned +100 Stars Super Streak Bonus!";
  } else if (newStreakCount === 14) {
    milestoneCoinsBonus = 250;
    bonusMsg = " 👑 Earned +250 Stars Ultimate Streak Bonus!";
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
