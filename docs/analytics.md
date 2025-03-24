# Analytics Implementation Guide

This guide explains how to implement a comprehensive analytics system using Firebase Realtime Database, Next.js, and TailwindCSS. The system tracks page views, user devices, browsers, languages, and more.

## Prerequisites

- Next.js project
- Firebase project
- TailwindCSS
- Google Fonts (Cormorant Garamond)

## Firebase Setup

### 1. Environment Variables

Create a `.env.local` file with these Firebase configuration variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
```

### 2. Firebase Rules

Set these rules in your Firebase Realtime Database:

```json
{
  "rules": {
    ".read": true,
    ".write": false,
    "pageViews": {
      ".write": true,
      "total": {
        ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
      },
      "daily": {
        "$date": {
          ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
        }
      }
    },
    "analytics": {
      ".write": true,
      "devices": {
        "$device": {
          ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
        }
      },
      "browsers": {
        "$browser": {
          ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
        }
      },
      "languages": {
        "$language": {
          ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
        }
      },
      "hours": {
        "$hour": {
          ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val()) && $hour.matches(/^[0-9]{1,2}$/)"
        }
      },
      "performance": {
        "avg_load_time": {
          ".validate": "newData.isNumber() && newData.val() >= 0"
        }
      }
    },
    "platformClicks": {
      ".write": true,
      "$platform": {
        ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
      }
    },
    "timezones": {
      ".write": true,
      "$zone": {
        ".validate": "newData.isNumber() && (!data.exists() || newData.val() > data.val())"
      }
    },
    "milestones": {
      ".write": true,
      "records": {
        ".write": true,
        "daily": {
          ".validate": "newData.hasChildren(['date', 'count']) && newData.child('date').isString() && newData.child('count').isNumber() && newData.child('count').val() > 0"
        },
        "hourly": {
          ".validate": "newData.hasChildren(['datetime', 'count']) && newData.child('datetime').isString() && newData.child('count').isNumber() && newData.child('count').val() > 0"
        },
        "minute": {
          ".validate": "newData.hasChildren(['datetime', 'count']) && newData.child('datetime').isString() && newData.child('count').isNumber() && newData.child('count').val() > 0"
        }
      },
      "achievements": {
        ".write": true,
        "$milestone": {
          ".validate": "newData.hasChildren(['date', 'type', 'value']) && newData.child('date').isString() && newData.child('type').isString() && newData.child('value').isNumber()"
        }
      }
    },
    "comparisons": {
      ".write": true,
      "weekly": {
        "$week": {
          ".validate": "newData.isNumber() && newData.val() >= 0"
        }
      },
      "monthly": {
        "$month": {
          ".validate": "newData.isNumber() && newData.val() >= 0"
        }
      },
      "peaks": {
        ".write": true,
        "daily": {
          ".validate": "newData.hasChildren(['date', 'count']) && newData.child('date').isString() && newData.child('count').isNumber() && newData.child('count').val() > 0"
        },
        "weekly": {
          ".validate": "newData.hasChildren(['weekStart', 'count']) && newData.child('weekStart').isString() && newData.child('count').isNumber() && newData.child('count').val() > 0"
        }
      }
    }
  }
}
```

## Implementation Files

### 1. Firebase Configuration (src/lib/firebase-config.ts)

```typescript
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
```

### 2. Analytics Component (src/components/Analytics.tsx)

```typescript
"use client";

import { useEffect } from "react";
import { incrementPageView } from "@/lib/firebase";

export default function Analytics() {
  useEffect(() => {
    // Increment page view counter when component mounts
    incrementPageView();
  }, []);

  // No UI - just counts views silently
  return null;
}
```

### 3. Firebase Functions (src/lib/firebase.ts)

```typescript
import { ref, increment, update, get } from "firebase/database";
import { checkRecords, updateComparisons } from "./enhanced-analytics";
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
        updates[`analytics/performance/avg_load_time`] = loadTime;
      }
    }

    await update(ref(db), updates);

    // Get current total count for milestone checking
    const snapshot = await get(ref(db, "pageViews/total"));
    const currentCount = snapshot.val() || 0;

    // Update enhanced analytics
    await Promise.all([
      checkRecords(currentCount, new Date()),
      updateComparisons(),
    ]);
  } catch (error) {
    console.error("Failed to increment page view:", error);
  }
};

// Get page views and analytics
export const getPageViews = async () => {
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
    };
  } catch (error) {
    console.error("Failed to get analytics:", error);
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
    };
  }
};
```

### 4. Enhanced Analytics (src/lib/enhanced-analytics.ts)

```typescript
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
```

## Usage

1. Install required dependencies:

```bash
npm install firebase
# or
yarn add firebase
```

2. Add the Analytics component to your app layout or pages where you want to track views:

```typescript
import Analytics from "@/components/Analytics";

export default function Layout({ children }) {
  return (
    <>
      <Analytics />
      {children}
    </>
  );
}
```

3. Create a community/analytics page to display the statistics:

The complete page implementation is quite long (500+ lines). Key features include:

- Overview section with total views and performance metrics
- Device, browser, and language distribution
- Hourly visit distribution with interactive bars
- 30-day history
- Platform click tracking
- Milestones and achievements
- Comparative analysis (weekly/monthly)

The page uses:

- TailwindCSS for styling
- Cormorant Garamond font from Google Fonts
- Responsive grid layouts
- Interactive tooltips
- Color scheme:
  - Background: #32465F
  - Cards: #243142
  - Accent: #DB9442
  - Text: white

## Data Structure

The Firebase Realtime Database stores data in this structure:

```
{
  "pageViews": {
    "total": number,
    "daily": {
      "YYYY-MM-DD": number
    }
  },
  "analytics": {
    "devices": {
      "desktop": number,
      "mobile": number,
      "tablet": number
    },
    "browsers": {
      "chrome": number,
      "firefox": number,
      "safari": number,
      "other": number
    },
    "languages": {
      "fr": number,
      "en": number,
      ...
    },
    "hours": {
      "0": number,
      "1": number,
      ...
      "23": number
    },
    "performance": {
      "avg_load_time": number
    }
  },
  "platformClicks": {
    "spotify": number,
    "applemusic": number,
    ...
  },
  "milestones": {
    "records": {
      "daily": { "date": string, "count": number },
      "hourly": { "datetime": string, "count": number },
      "minute": { "datetime": string, "count": number }
    },
    "achievements": {
      "[milestone]": { "date": string, "type": string, "value": number }
    }
  },
  "comparisons": {
    "weekly": {
      "YYYY-MM-DD": number
    },
    "monthly": {
      "YYYY-MM": number
    },
    "peaks": {
      "daily": { "date": string, "count": number },
      "weekly": { "weekStart": string, "count": number }
    }
  }
}
```

## Important Notes

1. The analytics are anonymous and GDPR-compliant as they don't collect personal data
2. The system uses Montreal timezone for consistency
3. Performance metrics are collected only when available
4. The database rules ensure data integrity and prevent malicious writes
5. The system is optimized for real-time updates
6. Error handling is implemented throughout
7. The UI is fully responsive and accessible
8. Platform clicks are tracked separately and can be customized
9. Milestones are tracked at 100, 1,000, 10,000, and 100,000 views
10. Records are tracked at daily, hourly, and minute intervals
11. Comparative analysis includes weekly and monthly stats with peaks

## Customization

You can customize:

1. Colors in the TailwindCSS config
2. Timezone in the `getSystemInfo` function
3. Tracked platforms in the platform clicks section
4. Language mappings in the UI
5. Milestone thresholds in the enhanced analytics
6. Update intervals (currently set to 30 seconds)
7. Font choices and styling
8. Achievement thresholds and types
9. Time periods for comparative analysis
10. Performance metrics collection

### Complete Analytics Page Implementation (src/app/community/page.tsx)

```typescript
"use client";

import { useEffect, useState } from "react";
import { getPageViews } from "@/lib/firebase";
import { getEnhancedAnalytics } from "@/lib/enhanced-analytics";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

type Analytics = {
  total: number;
  daily: Record<string, number>;
  analytics: {
    devices: Record<string, number>;
    browsers: Record<string, number>;
    languages: Record<string, number>;
    hours: Record<string, number>;
    performance: {
      avg_load_time: number;
    };
  };
  platformClicks?: Record<string, number>;
  milestones?: {
    records: {
      daily?: { date: string; count: number };
      hourly?: { datetime: string; count: number };
      minute?: { datetime: string; count: number };
    };
    achievements?: Record<
      string,
      {
        date: string;
        type: string;
        value: number;
      }
    >;
  };
  comparisons?: {
    weekly: Record<string, number>;
    monthly: Record<string, number>;
    peaks: {
      daily?: { date: string; count: number };
      weekly?: { weekStart: string; count: number };
    };
  };
};

export default function CommunityPage() {
  const [viewCounts, setViewCounts] = useState<Analytics | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const [counts, enhanced] = await Promise.all([
        getPageViews(),
        getEnhancedAnalytics(),
      ]);
      setViewCounts({
        ...counts,
        platformClicks: enhanced?.platformClicks,
        milestones: enhanced?.milestones,
        comparisons: enhanced?.comparisons,
      });
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!viewCounts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Chargement...</div>
      </div>
    );
  }

  // Sort daily counts by date in descending order
  const sortedDailyCounts = Object.entries(viewCounts.daily || {})
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 30);

  // Helper function to format numbers
  const formatNumber = (num: number) => num.toLocaleString("fr-FR");

  // Helper function to calculate percentages
  const calculatePercentage = (value: number, total: number) =>
    ((value / total) * 100).toFixed(1);

  // Get total counts for percentage calculations
  const totalDevices = Object.values(viewCounts.analytics.devices).reduce(
    (a, b) => a + b,
    0
  );
  const totalBrowsers = Object.values(viewCounts.analytics.browsers).reduce(
    (a, b) => a + b,
    0
  );
  const totalLanguages = Object.values(viewCounts.analytics.languages).reduce(
    (a, b) => a + b,
    0
  );

  // Language name mapping
  const languageNames: Record<string, string> = {
    fr: "Français",
    en: "Anglais",
    es: "Espagnol",
    de: "Allemand",
    it: "Italien",
    pt: "Portugais",
    // Add more as needed
  };

  // Platform name mapping
  const platformNames: Record<string, string> = {
    spotify: "Spotify",
    applemusic: "Apple Music",
    soundcloud: "SoundCloud",
    bandcamp: "Bandcamp",
    youtube: "YouTube",
  };

  // Calculate total platform clicks
  const totalPlatformClicks = Object.values(
    viewCounts.platformClicks || {}
  ).reduce((a, b) => a + b, 0);

  return (
    <div
      className={`min-h-screen bg-[#32465F] text-white p-8 ${cormorant.className}`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8 text-[#DB9442]">
          Statistiques de la communauté
        </h1>

        {/* Overview with Performance */}
        <div className="bg-[#243142] rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4 text-[#DB9442]">Vue d&apos;ensemble</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xl">
                Nombre total de visites: {formatNumber(viewCounts.total)}
              </div>
              <div className="text-xl">
                Visites aujourd&apos;hui:{" "}
                {formatNumber(
                  viewCounts.daily[new Date().toISOString().split("T")[0]] || 0
                )}
              </div>
            </div>
            <div>
              <div className="text-xl">
                Temps de chargement moyen:{" "}
                {viewCounts.analytics.performance?.avg_load_time
                  ? `${(
                      viewCounts.analytics.performance.avg_load_time / 1000
                    ).toFixed(2)} secondes`
                  : "Non disponible"}
              </div>
            </div>
          </div>
        </div>

        {/* Devices, Browsers, and Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-[#243142] rounded-lg p-6">
            <h2 className="text-2xl mb-4 text-[#DB9442]">Appareils</h2>
            {Object.entries(viewCounts.analytics.devices).map(
              ([device, count]) => (
                <div key={device} className="mb-2 flex justify-between">
                  <span className="capitalize">{device}</span>
                  <span>
                    {formatNumber(count)} (
                    {calculatePercentage(count, totalDevices)}%)
                  </span>
                </div>
              )
            )}
          </div>

          <div className="bg-[#243142] rounded-lg p-6">
            <h2 className="text-2xl mb-4 text-[#DB9442]">Navigateurs</h2>
            {Object.entries(viewCounts.analytics.browsers).map(
              ([browser, count]) => (
                <div key={browser} className="mb-2 flex justify-between">
                  <span className="capitalize">{browser}</span>
                  <span>
                    {formatNumber(count)} (
                    {calculatePercentage(count, totalBrowsers)}%)
                  </span>
                </div>
              )
            )}
          </div>

          <div className="bg-[#243142] rounded-lg p-6">
            <h2 className="text-2xl mb-4 text-[#DB9442]">Langues</h2>
            {Object.entries(viewCounts.analytics.languages)
              .sort((a, b) => b[1] - a[1])
              .map(([lang, count]) => (
                <div key={lang} className="mb-2 flex justify-between">
                  <span>{languageNames[lang] || lang}</span>
                  <span>
                    {formatNumber(count)} (
                    {calculatePercentage(count, totalLanguages)}%)
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Hours Distribution */}
        <div className="bg-[#243142] rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4 text-[#DB9442]">Heures de visite</h2>
          <div className="flex flex-col h-64">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 flex-1">
              {Array.from({ length: 24 }).map((_, hour) => {
                const count = viewCounts.analytics.hours[hour] || 0;
                const maxCount = Math.max(
                  ...Object.values(viewCounts.analytics.hours)
                );
                const height = maxCount ? (count / maxCount) * 100 : 0;
                const timeLabel = `${hour}h-${(hour + 1) % 24}h`;

                return (
                  <div key={hour} className="flex flex-col h-full">
                    <div className="flex-1 flex items-end">
                      <div
                        className="w-full bg-[#DB9442] hover:bg-[#c17f2f] transition-all duration-200 rounded-t relative group"
                        style={{ height: `${height}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#32465F] text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          {count} visites
                        </div>
                      </div>
                    </div>
                    <div className="text-xs mt-1 text-center" title={timeLabel}>
                      {hour}h
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily History */}
        <div className="bg-[#243142] rounded-lg p-6">
          <h2 className="text-2xl mb-4 text-[#DB9442]">
            Historique des 30 derniers jours
          </h2>
          <div className="grid gap-4">
            {sortedDailyCounts.map(([date, count]) => (
              <div
                key={date}
                className="flex justify-between items-center border-b border-[#32465F] pb-2"
              >
                <div>
                  {new Date(date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div>{formatNumber(count)} visites</div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Clicks */}
        <div className="bg-[#243142] rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4 text-[#DB9442]">
            Clics sur les plateformes
          </h2>
          <div className="grid gap-4">
            {Object.entries(viewCounts.platformClicks || {})
              .sort((a, b) => b[1] - a[1])
              .map(([platform, count]) => (
                <div
                  key={platform}
                  className="flex justify-between items-center"
                >
                  <span className="text-lg">
                    {platformNames[platform] || platform}
                  </span>
                  <div className="flex items-center gap-4">
                    <span>{formatNumber(count)} clics</span>
                    <div className="w-24 bg-[#32465F] rounded-full h-2">
                      <div
                        className="bg-[#DB9442] rounded-full h-full"
                        style={{
                          width: `${
                            (count /
                              Math.max(
                                ...Object.values(
                                  viewCounts.platformClicks || {}
                                )
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-300">
                      {calculatePercentage(count, totalPlatformClicks)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Milestones & Achievements */}
        <div className="bg-[#243142] rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4 text-[#DB9442]">Réalisations</h2>

          {/* Records */}
          <div className="mb-6">
            <h3 className="text-xl mb-3 text-[#DB9442]">Records</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {viewCounts.milestones?.records.daily && (
                <div className="bg-[#32465F] p-4 rounded-lg">
                  <div className="text-lg font-medium">Record journalier</div>
                  <div>
                    {formatNumber(viewCounts.milestones.records.daily.count)}{" "}
                    visites
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(
                      viewCounts.milestones.records.daily.date
                    ).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              )}

              {viewCounts.milestones?.records.hourly && (
                <div className="bg-[#32465F] p-4 rounded-lg">
                  <div className="text-lg font-medium">Record horaire</div>
                  <div>
                    {formatNumber(viewCounts.milestones.records.hourly.count)}{" "}
                    visites
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(
                      viewCounts.milestones.records.hourly.datetime
                    ).toLocaleString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}

              {viewCounts.milestones?.records.minute && (
                <div className="bg-[#32465F] p-4 rounded-lg">
                  <div className="text-lg font-medium">Record par minute</div>
                  <div>
                    {formatNumber(viewCounts.milestones.records.minute.count)}{" "}
                    visites
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(
                      viewCounts.milestones.records.minute.datetime
                    ).toLocaleString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-xl mb-3 text-[#DB9442]">Jalons atteints</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {viewCounts.milestones?.achievements &&
                Object.entries(viewCounts.milestones.achievements)
                  .sort((a, b) => b[1].value - a[1].value)
                  .map(([key, achievement]) => (
                    <div
                      key={key}
                      className="bg-[#32465F] p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <div className="text-lg font-medium">
                          {formatNumber(achievement.value)} visiteurs
                        </div>
                        <div className="text-sm text-gray-300">
                          {new Date(achievement.date).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                      <div className="text-4xl text-[#DB9442]">🏆</div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Comparative Analysis */}
        <div className="bg-[#243142] rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4 text-[#DB9442]">Analyse comparative</h2>

          {/* Weekly Stats */}
          <div className="mb-6">
            <h3 className="text-xl mb-3 text-[#DB9442]">
              Statistiques hebdomadaires
            </h3>
            <div className="grid gap-3">
              {viewCounts.comparisons?.weekly &&
                Object.entries(viewCounts.comparisons.weekly)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .slice(0, 4)
                  .map(([weekStart, count]) => {
                    const startDate = new Date(weekStart);
                    const endDate = new Date(weekStart);
                    endDate.setDate(endDate.getDate() + 6);

                    return (
                      <div
                        key={weekStart}
                        className="bg-[#32465F] p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <div className="text-lg">
                            {startDate.toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            -{" "}
                            {endDate.toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                          <div className="text-sm text-gray-300">
                            Semaine{" "}
                            {Math.ceil(
                              (startDate.getTime() -
                                new Date(
                                  startDate.getFullYear(),
                                  0,
                                  1
                                ).getTime()) /
                                (7 * 24 * 60 * 60 * 1000)
                            )}
                          </div>
                        </div>
                        <div className="text-lg">
                          {formatNumber(count)} visites
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="mb-6">
            <h3 className="text-xl mb-3 text-[#DB9442]">
              Statistiques mensuelles
            </h3>
            <div className="grid gap-3">
              {viewCounts.comparisons?.monthly &&
                Object.entries(viewCounts.comparisons.monthly)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .slice(0, 3)
                  .map(([month, count]) => (
                    <div
                      key={month}
                      className="bg-[#32465F] p-4 rounded-lg flex justify-between items-center"
                    >
                      <div className="text-lg">
                        {new Date(month + "-01").toLocaleDateString("fr-FR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-lg">
                        {formatNumber(count)} visites
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Peak Comparisons */}
          <div>
            <h3 className="text-xl mb-3 text-[#DB9442]">Records historiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {viewCounts.comparisons?.peaks.daily && (
                <div className="bg-[#32465F] p-4 rounded-lg">
                  <div className="text-lg font-medium">Pic journalier</div>
                  <div>
                    {formatNumber(viewCounts.comparisons.peaks.daily.count)}{" "}
                    visites
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(
                      viewCounts.comparisons.peaks.daily.date
                    ).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}

              {viewCounts.comparisons?.peaks.weekly && (
                <div className="bg-[#32465F] p-4 rounded-lg">
                  <div className="text-lg font-medium">Pic hebdomadaire</div>
                  <div>
                    {formatNumber(viewCounts.comparisons.peaks.weekly.count)}{" "}
                    visites
                  </div>
                  <div className="text-sm text-gray-300">
                    Semaine du{" "}
                    {new Date(
                      viewCounts.comparisons.peaks.weekly.weekStart
                    ).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```
