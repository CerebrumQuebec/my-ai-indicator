import { ref, increment, update, get, set } from "firebase/database";
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
    //console.log("[trackTimezone] Fuseau détecté :", timezone);

    // Obtenir l'offset en heures
    const now = new Date();
    const offset = -now.getTimezoneOffset() / 60; // Convertir minutes en heures

    // Convertir l'offset en code (50-74 comme pour hours)
    // -12 devient 50, 0 devient 62, +12 devient 74
    const timezoneCode = Math.floor(offset + 12 + 50);

    //console.log("[trackTimezone] Code du fuseau:", timezoneCode);

    // Mettre à jour le compteur dans analytics/timezones
    await update(ref(db), {
      [`analytics/timezones/${timezoneCode}`]: increment(1),
    });

    //console.log(
    //  "[trackTimezone] Fuseau enregistré avec le code:",
    //  timezoneCode
    //);
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

    // Get today's count specifically for daily record
    const today = timestamp.toISOString().split("T")[0];
    const dailyRef = ref(db, `pageViews/daily/${today}`);
    const dailySnapshot = await get(dailyRef);
    const todayCount = dailySnapshot.val() || 0;

    // Check daily record against today's actual count
    if (!records.daily || todayCount > records.daily.count) {
      updates["milestones/records/daily"] = {
        date: today,
        count: todayCount,
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
    weekStart.setDate(now.getDate() - now.getDay()); // Get start of week (Sunday)
    const weekKey = weekStart.toISOString().split("T")[0];
    const today = now.toISOString().split("T")[0];
    const monthKey = now.toISOString().slice(0, 7); // YYYY-MM format

    // Get today's count from pageViews
    const dailyRef = ref(db, `pageViews/daily/${today}`);
    const dailySnapshot = await get(dailyRef);
    const todayCount = dailySnapshot.val() || 0;

    // Initialize comparisons node if it doesn't exist
    const comparisonsRef = ref(db, "comparisons");
    const comparisonsSnapshot = await get(comparisonsRef);

    if (!comparisonsSnapshot.exists()) {
      // Initialize the structure if it doesn't exist
      await set(ref(db, "comparisons"), {
        weekly: {},
        monthly: {},
        peaks: {
          daily: { date: today, count: todayCount },
          weekly: { weekStart: weekKey, count: todayCount },
        },
      });
    }

    // Get current weekly total
    let weeklyTotal = 0;
    const weeklyRef = ref(db, `comparisons/weekly/${weekKey}`);
    const weeklySnapshot = await get(weeklyRef);
    weeklyTotal = weeklySnapshot.val() || 0;

    // Get current monthly total
    let monthlyTotal = 0;
    const monthlyRef = ref(db, `comparisons/monthly/${monthKey}`);
    const monthlySnapshot = await get(monthlyRef);
    monthlyTotal = monthlySnapshot.val() || 0;

    // Get current peaks
    const peaksRef = ref(db, "comparisons/peaks");
    const peaksSnapshot = await get(peaksRef);
    const peaks = peaksSnapshot.val() || {
      daily: { date: today, count: todayCount },
      weekly: { weekStart: weekKey, count: weeklyTotal },
    };

    const updates: Record<string, any> = {
      // Update weekly and monthly totals
      [`comparisons/weekly/${weekKey}`]: weeklyTotal + 1,
      [`comparisons/monthly/${monthKey}`]: monthlyTotal + 1,
    };

    // Update daily peak if today's count is higher
    if (!peaks.daily || todayCount > peaks.daily.count) {
      updates["comparisons/peaks/daily"] = {
        date: today,
        count: todayCount,
      };
    }

    // Update weekly peak if this week's count is higher
    const newWeeklyTotal = weeklyTotal + 1;
    if (!peaks.weekly || newWeeklyTotal > peaks.weekly.count) {
      updates["comparisons/peaks/weekly"] = {
        weekStart: weekKey,
        count: newWeeklyTotal,
      };
    }

    // Apply all updates
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

// Force check all historical records
export const forceCheckHistoricalRecords = async () => {
  try {
    // Get all daily page views
    const pageViewsRef = ref(db, "pageViews/daily");
    const snapshot = await get(pageViewsRef);
    const dailyCounts = snapshot.val() || {};

    // Find the highest daily count
    let maxDailyCount = 0;
    let maxDailyDate = "";

    Object.entries(dailyCounts).forEach(([date, count]) => {
      const dailyCount = count as number;
      if (dailyCount > maxDailyCount) {
        maxDailyCount = dailyCount;
        maxDailyDate = date;
      }
    });

    // Update the record if we found a higher count
    if (maxDailyCount > 0) {
      await update(ref(db), {
        "milestones/records/daily": {
          date: maxDailyDate,
          count: maxDailyCount,
        },
      });
    }

    return {
      maxDailyCount,
      maxDailyDate,
    };
  } catch (error) {
    console.error("Failed to force check historical records:", error);
    throw error;
  }
};
