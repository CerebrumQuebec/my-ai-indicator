import { ref, increment, update, get } from "firebase/database";
import { db } from "./firebase-config";

type RecordUpdate = {
  date?: string;
  datetime?: string;
  count?: number;
  type?: string;
  value?: number;
  weekStart?: string;
};

// Track platform clicks
export const trackPlatformClick = async (platform: string) => {
  try {
    await update(ref(db), {
      [`platformClicks/${platform}`]: increment(1),
    });
  } catch (error) {
    console.error("Failed to track platform click:", error);
  }
};

// Track timezone
export const trackTimezone = async () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await update(ref(db), {
      [`timezones/${timezone}`]: increment(1),
    });
  } catch (error) {
    console.error("Failed to track timezone:", error);
  }
};

// Check and update records/milestones
export const checkRecords = async (currentCount: number, timestamp: Date) => {
  try {
    const recordsRef = ref(db, "milestones/records");
    const snapshot = await get(recordsRef);
    const records = snapshot.val() || {};

    const updates: Record<string, RecordUpdate> = {};

    // Check daily record
    const today = timestamp.toISOString().split("T")[0];
    if (!records.daily || currentCount > records.daily.count) {
      updates["milestones/records/daily"] = {
        date: today,
        count: currentCount,
      };
    }

    // Check hourly record
    const hour = timestamp.toISOString().split(":")[0] + ":00";
    if (!records.hourly || currentCount > records.hourly.count) {
      updates["milestones/records/hourly"] = {
        datetime: hour,
        count: currentCount,
      };
    }

    // Check minute record
    const minute = timestamp.toISOString().split(".")[0];
    if (!records.minute || currentCount > records.minute.count) {
      updates["milestones/records/minute"] = {
        datetime: minute,
        count: currentCount,
      };
    }

    // Check milestones (100, 1000, 10000, etc.)
    const milestones = [100, 1000, 10000, 100000];
    for (const milestone of milestones) {
      if (currentCount >= milestone) {
        const milestoneKey = `milestone_${milestone}`;
        if (!records[milestoneKey]) {
          updates[`milestones/achievements/${milestoneKey}`] = {
            date: timestamp.toISOString(),
            type: "visitors",
            value: milestone,
          };
        }
      }
    }

    if (Object.keys(updates).length > 0) {
      await update(ref(db), updates);
    }
  } catch (error) {
    console.error("Failed to check records:", error);
  }
};

// Track comparative stats
export const updateComparisons = async () => {
  try {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekKey = weekStart.toISOString().split("T")[0];
    const today = now.toISOString().split("T")[0];
    const monthKey = now.toISOString().slice(0, 7); // YYYY-MM format

    // Get current daily and weekly counts
    const dailyRef = ref(db, `pageViews/daily/${today}`);
    const weeklyRef = ref(db, `comparisons/weekly/${weekKey}`);
    const [dailySnapshot, weeklySnapshot] = await Promise.all([
      get(dailyRef),
      get(weeklyRef),
    ]);

    const dailyCount = dailySnapshot.val() || 0;
    const weeklyCount = weeklySnapshot.val() || 0;

    // Get current peaks
    const peaksRef = ref(db, "comparisons/peaks");
    const peaksSnapshot = await get(peaksRef);
    const peaks = peaksSnapshot.val() || {};

    const updates: Record<
      string,
      | number
      | ReturnType<typeof increment>
      | { date?: string; weekStart?: string; count: number }
    > = {
      [`comparisons/weekly/${weekKey}`]: increment(1),
      [`comparisons/monthly/${monthKey}`]: increment(1),
    };

    // Update daily peak if current count is higher
    if (!peaks.daily || dailyCount > peaks.daily.count) {
      updates["comparisons/peaks/daily"] = {
        date: today,
        count: dailyCount,
      };
    }

    // Update weekly peak if current count is higher
    if (!peaks.weekly || weeklyCount > peaks.weekly.count) {
      updates["comparisons/peaks/weekly"] = {
        weekStart: weekKey,
        count: weeklyCount,
      };
    }

    await update(ref(db), updates);
  } catch (error) {
    console.error("Failed to update comparisons:", error);
  }
};

// Get enhanced analytics data
export const getEnhancedAnalytics = async () => {
  try {
    const snapshot = await get(ref(db));
    const data = snapshot.val() || {};

    return {
      platformClicks: data.platformClicks || {},
      timezones: data.timezones || {},
      milestones: {
        records: data.milestones?.records || {
          daily: null,
          hourly: null,
          minute: null,
        },
        achievements: data.milestones?.achievements || {},
      },
      comparisons: {
        weekly: data.comparisons?.weekly || {},
        monthly: data.comparisons?.monthly || {},
        peaks: {
          daily: data.comparisons?.peaks?.daily || null,
          weekly: data.comparisons?.peaks?.weekly || null,
        },
      },
    };
  } catch (error) {
    console.error("Failed to get enhanced analytics:", error);
    return null;
  }
};
