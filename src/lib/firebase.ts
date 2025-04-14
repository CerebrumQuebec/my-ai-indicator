import { ref, increment, update, get } from "firebase/database";
import { db } from "./firebase-config";

// Get anonymous system info
const getSystemInfo = () => {
  if (typeof window === "undefined") return null;

  const userAgent = window.navigator.userAgent.toLowerCase();
  let deviceType = "desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = "tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  ) {
    deviceType = "mobile";
  }

  const browserInfo = {
    chrome: userAgent.includes("chrome"),
    firefox: userAgent.includes("firefox"),
    safari: userAgent.includes("safari") && !userAgent.includes("chrome"),
    other:
      !userAgent.includes("chrome") &&
      !userAgent.includes("firefox") &&
      !userAgent.includes("safari"),
  };

  const browser =
    Object.entries(browserInfo).find(([, value]) => value)?.[0] || "other";

  const now = new Date();
  const montrealTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Montreal" })
  );
  const hour = montrealTime.getHours();

  return {
    deviceType,
    browser,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language.split("-")[0],
    hour,
  };
};

// Simple page view counter with enhanced analytics
export const incrementPageView = async () => {
  if (typeof window === "undefined") return;

  try {
    const today = new Date().toISOString().split("T")[0];
    const systemInfo = getSystemInfo();
    if (!systemInfo) return;

    const { deviceType, browser, language, hour } = systemInfo;

    const updates = {
      [`pageViews/total`]: increment(1),
      [`pageViews/daily/${today}`]: increment(1),
      [`analytics/devices/${deviceType}`]: increment(1),
      [`analytics/browsers/${browser}`]: increment(1),
      [`analytics/languages/${language}`]: increment(1),
      [`analytics/hours/${hour}`]: increment(1),
    };

    // Add performance data if available
    if (window.performance?.timing) {
      const loadTime =
        window.performance.timing.loadEventEnd -
        window.performance.timing.navigationStart;
      if (loadTime > 0) {
        updates[`analytics/performance`] = {
          avg_load_time: loadTime,
        };
      }
    }

    await update(ref(db), updates);

    // Get current total count for milestone checking
    const snapshot = await get(ref(db, "pageViews/total"));
    const currentCount = snapshot.val() || 0;

    // Check and update milestones
    await checkMilestones(currentCount, new Date());
  } catch (error) {
    console.error("Failed to increment page view:", error);
  }
};

// Check and update milestones
const checkMilestones = async (currentCount: number, timestamp: Date) => {
  try {
    const now = new Date();
    const montrealTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Montreal" })
    );
    const today = montrealTime.toISOString().split("T")[0];

    // Get all daily counts
    const dailyRef = ref(db, "pageViews/daily");
    const dailySnapshot = await get(dailyRef);
    const dailyCounts = dailySnapshot.val() || {};

    // Find the highest daily count and its date
    let maxDailyCount = 0;
    let maxDailyDate = today;
    Object.entries(dailyCounts).forEach(([date, count]) => {
      const countNum = count as number;
      if (countNum > maxDailyCount) {
        maxDailyCount = countNum;
        maxDailyDate = date;
      }
    });

    // Get current records
    const recordsRef = ref(db, "milestones/records");
    const recordsSnapshot = await get(recordsRef);
    const records = recordsSnapshot.val() || {};

    const updates: Record<string, any> = {};

    // Update daily record if we have a new maximum
    if (!records.daily || maxDailyCount > records.daily.count) {
      updates["milestones/records/daily"] = {
        date: maxDailyDate,
        count: maxDailyCount,
      };
    }

    // Sort daily counts by date to find when milestones were reached
    const sortedDates = Object.entries(dailyCounts).sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    );

    let runningTotal = 0;
    const milestones = [100, 250, 500, 1000, 2500, 5000, 10000];
    const reachedMilestones: Record<number, string> = {};

    // Calculate running total and find when each milestone was reached
    for (const [date, count] of sortedDates) {
      const countNum = count as number;
      runningTotal += countNum;

      for (const milestone of milestones) {
        if (!reachedMilestones[milestone] && runningTotal >= milestone) {
          reachedMilestones[milestone] = date;
        }
      }
    }

    // Update milestones with correct dates
    for (const milestone of milestones) {
      if (currentCount >= milestone) {
        const milestoneKey = `milestone_${milestone}`;
        if (!records[milestoneKey] && reachedMilestones[milestone]) {
          updates[`milestones/achievements/${milestoneKey}`] = {
            date: reachedMilestones[milestone],
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
    console.error("Failed to check milestones:", error);
  }
};

// Get page views and analytics data
export const getAnalytics = async () => {
  try {
    const analyticsRef = ref(db);
    const snapshot = await get(analyticsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return {
        total: data.pageViews?.total || 0,
        daily: data.pageViews?.daily || {},
        analytics: {
          devices: data.analytics?.devices || {},
          browsers: data.analytics?.browsers || {},
          languages: data.analytics?.languages || {},
          hours: data.analytics?.hours || {},
          performance: data.analytics?.performance || {},
        },
        milestones: {
          records: data.milestones?.records || {},
          achievements: data.milestones?.achievements || {},
        },
      };
    }
    return {
      total: 0,
      daily: {},
      analytics: {
        devices: {},
        browsers: {},
        languages: {},
        hours: {},
        performance: {},
      },
      milestones: {
        records: {},
        achievements: {},
      },
    };
  } catch (error) {
    console.error("Failed to get analytics:", error);
    return null;
  }
};

// Get page views data
export const getPageViews = async () => {
  try {
    const snapshot = await get(ref(db));
    const data = snapshot.val() || {};

    return {
      total: data.total || 0,
      daily: data.pageViews?.daily || {},
      analytics: {
        devices: data.analytics?.devices || {},
        browsers: data.analytics?.browsers || {},
        languages: data.analytics?.languages || {},
        hours: data.analytics?.hours || {},
        performance: {
          avg_load_time: data.analytics?.performance?.avg_load_time || 0,
        },
      },
    };
  } catch (error) {
    console.error("Failed to get page views:", error);
    return {
      total: 0,
      daily: {},
      analytics: {
        devices: {},
        browsers: {},
        languages: {},
        hours: {},
        performance: {
          avg_load_time: 0,
        },
      },
    };
  }
};

// Force check milestones based on current total
export const forceCheckMilestones = async () => {
  try {
    const snapshot = await get(ref(db, "pageViews/total"));
    const currentCount = snapshot.val() || 0;
    await checkMilestones(currentCount, new Date());
    return true;
  } catch (error) {
    console.error("Failed to force check milestones:", error);
    return false;
  }
};
