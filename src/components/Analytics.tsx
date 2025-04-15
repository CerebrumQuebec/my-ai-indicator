"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPageViews } from "@/lib/firebase";
import {
  getEnhancedAnalytics,
  forceCheckHistoricalRecords,
} from "@/lib/enhanced-analytics";
import { useTranslation } from "@/contexts/TranslationContext";
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
    screenSizes?: Record<string, number>;
    timezones?: Record<string, number>;
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
  timezones?: Record<string, number>;
};

export default function Analytics() {
  const { t } = useTranslation();
  const [viewCounts, setViewCounts] = useState<Analytics | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkingMessage, setCheckingMessage] = useState<string>("");

  // Add function to get today's date in Montreal timezone
  const getTodayInMontreal = () => {
    const now = new Date();
    const montrealDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Montreal" })
    );
    const year = montrealDate.getFullYear();
    const month = String(montrealDate.getMonth() + 1).padStart(2, "0");
    const day = String(montrealDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    //console.log("Today in Montreal (formatted):", formattedDate);
    return formattedDate;
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const [counts, enhanced] = await Promise.all([
        getPageViews(),
        getEnhancedAnalytics(),
      ]);

      // Debug logs for dates
      const today = getTodayInMontreal();
      //console.log("Raw daily counts:", counts.daily);
      //console.log(`Visits for today (${today}):`, counts.daily[today]);

      // Sort dates to see the latest
      const sortedDates = Object.keys(counts.daily).sort().reverse();
      //console.log("Latest dates in data:", sortedDates.slice(0, 3));

      setViewCounts({
        ...counts,
        platformClicks: enhanced?.platformClicks,
        timezones: enhanced?.timezones,
        milestones: enhanced?.milestones,
        comparisons: enhanced?.comparisons,
      });
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleForceCheck = async () => {
    setIsChecking(true);
    setCheckingMessage(t("checkingRecords"));
    try {
      const result = await forceCheckHistoricalRecords();
      const formattedDate = new Date(result.maxDailyDate).toLocaleDateString();
      setCheckingMessage(
        `${t("recordsUpdated")}: ${result.maxDailyCount} ${t(
          "visits"
        )} (${formattedDate})`
      );

      // Refetch data
      const [counts, enhanced] = await Promise.all([
        getPageViews(),
        getEnhancedAnalytics(),
      ]);
      setViewCounts({
        ...counts,
        platformClicks: enhanced?.platformClicks,
        timezones: enhanced?.timezones,
        milestones: enhanced?.milestones,
        comparisons: enhanced?.comparisons,
      });
    } catch (error) {
      console.error("Failed to force check:", error);
      setCheckingMessage(t("errorCheckingRecords"));
    } finally {
      setTimeout(() => {
        setIsChecking(false);
        setCheckingMessage("");
      }, 3000);
    }
  };

  if (!viewCounts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary font-semibold text-xl">
          {t("loadingAnalytics")}
        </div>
      </div>
    );
  }

  // Sort daily counts by date in descending order
  const sortedDailyCounts = Object.entries(viewCounts.daily || {})
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 30);

  //console.log("Sorted daily counts (first 3):", sortedDailyCounts.slice(0, 3));

  // Helper function to format numbers
  const formatNumber = (num: number) => num.toLocaleString();

  // Helper function to format dates in Montreal timezone
  const formatDateInMontreal = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00"); // Add noon time to avoid timezone issues
    return new Date(
      date.toLocaleString("en-US", { timeZone: "America/Montreal" })
    ).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  // Calculate total screen sizes
  const totalScreenSizes = Object.values(
    viewCounts.analytics.screenSizes || {}
  ).reduce((a, b) => a + b, 0);

  // Icons for screen sizes
  const screenSizeIcons: Record<string, string> = {
    mobile: "📱",
    small: "📱",
    medium: "💻",
    large: "🖥️",
    xlarge: "🖥️",
    unknown: "📟",
  };

  // Human-readable screen size names
  const screenSizeLabels: Record<string, string> = {
    mobile: t("screenSizeMobile"), // < 640px (Mobile)
    small: t("screenSizeSmall"), // 640-768px (Small tablets)
    medium: t("screenSizeMedium"), // 768-1024px (Large tablets / small laptops)
    large: t("screenSizeLarge"), // 1024-1280px (Laptops)
    xlarge: t("screenSizeXlarge"), // > 1280px (Desktops)
    unknown: t("screenSizeUnknown"), // Fall back
  };

  // Calculate total platform clicks
  const totalPlatformClicks = Object.values(
    viewCounts.platformClicks ?? {}
  ).reduce((a, b) => a + b, 0);

  // Calculate total timezone visits
  const totalTimezoneVisits = Object.values(
    viewCounts.analytics.timezones || {}
  ).reduce((total, count) => total + (count as number), 0);

  // Prepare timezone data
  const timezoneData = Object.entries(viewCounts.analytics.timezones || {})
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 10); // Show top 10

  //console.log("Timezone data from Firebase:", viewCounts.analytics.timezones);
  //console.log("Processed timezone data:", timezoneData);

  return (
    <div
      className={`space-y-10 p-6 md:p-8 max-w-7xl mx-auto ${cormorant.className}`}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-text-primary font-medium mb-4 tracking-wide">
          {t("analyticsOverview")}
        </h1>
        <div className="h-1 w-24 bg-primary-600 mx-auto rounded-full mb-4"></div>
        {/*         <button
          onClick={handleForceCheck}
          disabled={isChecking}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-medium"
        >
          {isChecking ? t("checking") : t("checkRecords")}
        </button> */}
        {checkingMessage && (
          <div className="mt-2 text-text-primary font-medium mb-3">
            {checkingMessage}
          </div>
        )}
      </div>

      {/* Overview with Performance */}
      <div className="bg-surface-card rounded-xl p-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-surface-hover rounded-lg">
            <div className="text-3xl text-primary-700 mb-2 font-bold">
              {formatNumber(viewCounts.total)}
            </div>
            <div className="text-text-primary font-medium">
              {t("totalVisits")}
            </div>
          </div>
          <div className="text-center p-4 bg-surface-hover rounded-lg">
            <div className="text-3xl text-primary-700 mb-2 font-bold">
              {formatNumber(viewCounts.daily[getTodayInMontreal()] || 0)}
            </div>
            <div className="text-text-primary font-medium">
              {t("todayVisits")}
            </div>
          </div>
          <div className="text-center p-4 bg-surface-hover rounded-lg">
            <div className="text-3xl text-primary-700 mb-2 font-bold">
              {viewCounts.analytics.performance?.avg_load_time
                ? `${(
                    viewCounts.analytics.performance.avg_load_time / 1000
                  ).toFixed(2)}s`
                : t("notAvailable")}
            </div>
            <div className="text-text-primary font-medium">
              {t("avgLoadTime")}
            </div>
          </div>
          <div className="text-center p-4 bg-surface-hover rounded-lg">
            <div className="text-3xl text-primary-700 mb-2 font-bold">
              {Object.keys(viewCounts.analytics.devices).length}
            </div>
            <div className="text-text-primary font-medium">{t("devices")}</div>
          </div>
        </div>
      </div>

      {/* Devices, Browsers, and Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-card rounded-xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
            {t("devices")}
          </h2>
          {Object.entries(viewCounts.analytics.devices).map(
            ([device, count]) => (
              <div key={device} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="capitalize text-text-primary">
                    {t(device)}
                  </span>
                  <span className="text-text-secondary">
                    {formatNumber(count)} (
                    {calculatePercentage(count, totalDevices)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-hover rounded-full h-2">
                  <div
                    className="bg-primary-500 rounded-full h-full transition-all duration-300"
                    style={{ width: `${(count / totalDevices) * 100}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div className="bg-surface-card rounded-xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
            {t("browsers")}
          </h2>
          {Object.entries(viewCounts.analytics.browsers).map(
            ([browser, count]) => (
              <div key={browser} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="capitalize text-text-primary">
                    {t(browser)}
                  </span>
                  <span className="text-text-secondary">
                    {formatNumber(count)} (
                    {calculatePercentage(count, totalBrowsers)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-hover rounded-full h-2">
                  <div
                    className="bg-primary-500 rounded-full h-full transition-all duration-300"
                    style={{ width: `${(count / totalBrowsers) * 100}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div className="bg-surface-card rounded-xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
            {t("languages")}
          </h2>
          {Object.entries(viewCounts.analytics.languages)
            .sort((a, b) => b[1] - a[1])
            .map(([lang, count]) => (
              <div key={lang} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-text-primary">{t(lang)}</span>
                  <span className="text-text-secondary">
                    {formatNumber(count)} (
                    {calculatePercentage(count, totalLanguages)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-hover rounded-full h-2">
                  <div
                    className="bg-primary-500 rounded-full h-full transition-all duration-300"
                    style={{ width: `${(count / totalLanguages) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Hours Distribution */}
      <div className="bg-surface-card rounded-xl p-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
          {t("visitHours")}
        </h2>
        <div className="flex flex-col h-80">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2 flex-1">
            {Array.from({ length: 24 }).map((_, hour) => {
              const count = viewCounts.analytics.hours[hour] || 0;
              const maxCount = Math.max(
                ...Object.values(viewCounts.analytics.hours)
              );
              const height = maxCount ? (count / maxCount) * 100 : 0;
              const timeLabel = `${hour}h-${(hour + 1) % 24}h`;

              return (
                <div key={hour} className="flex flex-col h-full group">
                  <div className="flex-1 flex items-end">
                    <div
                      className="w-full bg-primary-500 hover:bg-primary-400 transition-all duration-300 rounded-lg relative group cursor-pointer"
                      style={{ height: `${height}%` }}
                    >
                      {/* Enhanced Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-surface-card p-3 rounded-lg shadow-lg text-text-primary transition-opacity duration-200 whitespace-nowrap z-10">
                        <div className="text-sm font-medium">{timeLabel}</div>
                        <div className="text-lg">
                          {formatNumber(count)} {t("visits")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mt-2 text-center text-text-secondary">
                    {hour}h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily History */}
      <div className="bg-surface-card rounded-xl p-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
          {t("dailyRecord")}
        </h2>
        <div className="grid gap-4">
          {sortedDailyCounts.map(([date, count]) => (
            <div
              key={date}
              className="flex justify-between items-center p-4 rounded-lg hover:bg-surface-hover transition-colors duration-200"
            >
              <div className="text-text-primary font-medium">
                {formatDateInMontreal(date)}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-text-secondary">
                  {formatNumber(count)} {t("visits")}
                </div>
                <div className="w-24 bg-surface-hover rounded-full h-2">
                  <div
                    className="bg-primary-500 rounded-full h-full transition-all duration-300"
                    style={{
                      width: `${
                        (count /
                          Math.max(...sortedDailyCounts.map(([_, c]) => c))) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Clicks */}
      {viewCounts.platformClicks &&
        Object.keys(viewCounts.platformClicks).length > 0 && (
          <div className="bg-surface-card rounded-xl p-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
              {t("platformClicks")}
            </h2>
            <div className="grid gap-6">
              {Object.entries(viewCounts.platformClicks)
                .sort((a, b) => b[1] - a[1])
                .map(([platform, count]) => (
                  <div key={platform} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg text-text-primary font-medium group-hover:text-primary-500 transition-colors duration-200">
                        {platform}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-text-secondary">
                          {formatNumber(count)} {t("visits")}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {calculatePercentage(count, totalPlatformClicks)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-surface-hover rounded-full h-3">
                      <div
                        className="bg-primary-500 rounded-full h-full transition-all duration-300 group-hover:bg-primary-400"
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
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* Timezone Distribution */}
      {Object.keys(viewCounts.analytics.timezones || {}).length > 0 && (
        <div className="bg-surface-card rounded-xl p-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3">
            {t("timezoneDistribution")} 🌍
          </h2>
          <div className="mb-6 text-text-secondary text-sm">
            {t("visualizeTimezonesOnMap")}
          </div>
          {/* SVG World Timezone Map */}
          <div className="flex justify-center items-center w-full overflow-x-auto">
            <svg
              viewBox="0 0 1200 250"
              width="100%"
              height="250"
              style={{ maxWidth: 1000 }}
              className="bg-surface-hover rounded-lg shadow-md p-2 hidden md:block"
            >
              {/* Titre */}
              <text
                x="600"
                y="25"
                textAnchor="middle"
                fontSize="16"
                fill="#ffffff"
                className="font-semibold"
              >
                {t("timezoneMapLegend")}
              </text>

              {/* Dessin de la "terre" stylisée */}
              <ellipse
                cx="600"
                cy="130"
                rx="580"
                ry="90"
                fill="#1e293b"
                stroke="#3b82f6"
                strokeWidth="1.5"
                className="opacity-70"
              />

              {/* Ligne de l'équateur */}
              <line
                x1="20"
                y1="130"
                x2="1180"
                y2="130"
                stroke="#3b82f6"
                strokeWidth="0.5"
                strokeDasharray="5,5"
                opacity="0.5"
              />

              {/* Grille de référence */}
              {Array.from({ length: 13 }).map((_, i) => {
                const x = 40 + i * 90;
                return (
                  <line
                    key={`grid-${i}`}
                    x1={x}
                    y1="50"
                    x2={x}
                    y2="210"
                    stroke="#3b82f6"
                    strokeWidth="0.5"
                    strokeDasharray="2,3"
                    opacity="0.3"
                  />
                );
              })}

              {/* Fuseaux horaires principaux */}
              {Array.from({ length: 25 }).map((_, i) => {
                // Convertir l'index en code de fuseau horaire (50-74)
                const tzCode = 50 + i;

                // Trouver ce fuseau dans nos données
                const count =
                  Object.entries(viewCounts.analytics.timezones || {}).find(
                    ([key]) => Number(key) === tzCode
                  )?.[1] || 0;

                // Position horizontale calculée
                const x = 50 + i * 45;

                // Convertir le code en UTC offset pour l'affichage
                const utcOffset = i - 12; // 50 -> -12, 62 -> 0, 74 -> +12

                // Hauteur de la barre proportionnelle au nombre de visites
                const maxCount = Math.max(
                  1,
                  ...Object.values(viewCounts.analytics.timezones || {}).map(
                    (v) => Number(v)
                  )
                );
                const barHeight =
                  count > 0 ? 30 + (count / maxCount) * 100 : 30;

                return (
                  <g key={i} className="group">
                    {/* Bande verticale */}
                    <rect
                      x={x}
                      y={130 - barHeight / 2}
                      width={35}
                      height={barHeight}
                      fill={count > 0 ? "#3b82f6" : "#334155"}
                      opacity={count > 0 ? 0.8 : 0.2}
                      rx={6}
                      className="transition-all duration-300 hover:opacity-100 cursor-pointer"
                    />

                    {/* Lignes d'extension du fuseau */}
                    <line
                      x1={x + 17.5}
                      y1={count > 0 ? 130 - barHeight / 2 - 5 : 130 - 20}
                      x2={x + 17.5}
                      y2="45"
                      stroke={count > 0 ? "#60a5fa" : "#475569"}
                      strokeWidth="0.75"
                      strokeDasharray={count > 0 ? "none" : "2,2"}
                      opacity={count > 0 ? 0.4 : 0.2}
                    />

                    {/* Nombre de visiteurs */}
                    {count > 0 && (
                      <text
                        x={x + 17.5}
                        y={130}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#ffffff"
                        className="drop-shadow-lg pointer-events-none"
                      >
                        {count}
                      </text>
                    )}

                    {/* Label UTC au-dessus */}
                    <text
                      x={x + 17.5}
                      y="230"
                      textAnchor="middle"
                      fontSize="11"
                      fill={count > 0 ? "#f8fafc" : "#94a3b8"}
                      className="transition-colors duration-200 font-medium"
                    >
                      {t("utcTime")}
                      {utcOffset >= 0 ? `+${utcOffset}` : utcOffset}
                    </text>
                  </g>
                );
              })}

              {/* Point pour GMT/UTC-0 */}
              <circle
                cx="600"
                cy="130"
                r="4"
                fill="#f8fafc"
                stroke="#3b82f6"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Liste des fuseaux horaires actualisée - Version mobile optimisée */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(viewCounts.analytics.timezones || {})
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([timezone, count], index) => {
                const utcOffset = Number(timezone) - 62;
                // Sur mobile, on n'affiche que les fuseaux horaires avec des visites
                if (count === 0 && window.innerWidth < 640) return null;
                return (
                  <div
                    key={index}
                    className="bg-surface-hover/50 rounded-lg p-4 hover:bg-surface-hover transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-primary font-medium text-lg">
                        {t("utcTime")}
                        {utcOffset >= 0 ? `+${utcOffset}` : utcOffset}
                      </span>
                      <span className="text-lg font-bold text-primary-400">
                        {formatNumber(count as number)}
                      </span>
                    </div>
                    <div className="w-full bg-surface-card rounded-full h-3">
                      <div
                        className="bg-primary-500 rounded-full h-full transition-all duration-300"
                        style={{
                          width: `${
                            ((count as number) /
                              Math.max(
                                1,
                                ...Object.values(
                                  viewCounts.analytics.timezones || {}
                                ).map((v) => Number(v))
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-text-secondary text-right">
                      {calculatePercentage(
                        count as number,
                        totalTimezoneVisits
                      )}
                      % {t("visits")}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Milestones & Achievements */}
      {viewCounts.milestones &&
        (Object.keys(viewCounts.milestones.records || {}).length > 0 ||
          Object.keys(viewCounts.milestones.achievements || {}).length > 0) && (
          <div className="bg-gradient-to-br from-surface-card via-surface-hover to-surface-card rounded-xl p-8 shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-3xl mb-8 text-text-primary border-b border-primary-500/50 pb-4 font-light tracking-wide flex items-center gap-3">
              <span className="text-yellow-400">🏆</span>{" "}
              {t("achievementsAndRecords")}
            </h2>

            {/* Records Section */}
            {viewCounts.milestones?.records &&
              viewCounts.milestones.records.daily &&
              viewCounts.milestones.records.daily.count > 0 && (
                <div className="mb-10">
                  <div className="bg-surface-hover/90 p-6 rounded-xl shadow-md relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                    <div className="absolute -top-4 -right-4 text-8xl text-primary-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rotate-12">
                      🏅
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-primary-400 mb-1 font-semibold tracking-wider uppercase">
                          {t("dailyRecord")}
                        </div>
                        <div className="text-3xl font-medium text-text-primary mb-1">
                          {formatNumber(
                            viewCounts.milestones.records.daily.count
                          )}{" "}
                          {t("visits")}
                        </div>
                        <div className="text-text-secondary text-sm">
                          {formatDateInMontreal(
                            viewCounts.milestones.records.daily.date
                          )}
                        </div>
                      </div>
                      <div className="text-6xl text-yellow-400 transform group-hover:scale-110 transition-transform duration-300">
                        🏆
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Achievements Section */}
            {viewCounts.milestones?.achievements &&
              Object.keys(viewCounts.milestones.achievements).length > 0 && (
                <div>
                  <h3 className="text-xl mb-5 text-text-primary font-medium">
                    {t("achievements")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(viewCounts.milestones.achievements)
                      .sort((a, b) => b[1].value - a[1].value)
                      .map(([key, achievement]) => (
                        <div
                          key={key}
                          className="bg-surface-hover/90 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                        >
                          <div className="absolute -bottom-5 -left-5 text-8xl text-secondary-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 -rotate-12">
                            🎉
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-2xl font-semibold text-text-primary group-hover:text-secondary-500 transition-colors duration-200">
                                {formatNumber(achievement.value)}{" "}
                                {t("visitors")}
                              </div>
                              <div className="text-text-secondary text-sm mt-1">
                                {formatDateInMontreal(achievement.date)}
                              </div>
                            </div>
                            <div className="text-5xl text-yellow-400 transform group-hover:rotate-[15deg] group-hover:scale-125 transition-transform duration-300">
                              🏆
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </div>
        )}

      {/* Comparative Analysis */}
      {viewCounts.comparisons && (
        <div className="bg-surface-card rounded-xl p-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl mb-6 text-text-primary border-b border-surface-hover pb-3 flex items-center gap-3">
            <span className="text-blue-400">📊</span> {t("comparativeAnalysis")}
          </h2>

          {/* Historical Peaks */}
          {viewCounts.comparisons.peaks &&
            (viewCounts.comparisons.peaks.daily ||
              viewCounts.comparisons.peaks.weekly) && (
              <div className="mb-10">
                <h3 className="text-xl mb-5 text-text-primary font-medium">
                  {t("historicalRecords")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {viewCounts.comparisons.peaks.daily && (
                    <div className="bg-surface-hover p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 group relative overflow-hidden">
                      <div className="absolute -top-4 -right-4 text-8xl text-green-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rotate-12">
                        📈
                      </div>
                      <div className="text-sm text-green-400 mb-1 font-semibold tracking-wider uppercase">
                        {t("allTimeDailyPeak")}
                      </div>
                      <div className="text-3xl font-medium text-text-primary mb-1">
                        {formatNumber(viewCounts.comparisons.peaks.daily.count)}{" "}
                        {t("visits")}
                      </div>
                      <div className="text-text-secondary text-sm">
                        {new Date(
                          viewCounts.comparisons.peaks.daily.date
                        ).toLocaleDateString(undefined, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric", // Added year for clarity
                        })}
                      </div>
                    </div>
                  )}

                  {viewCounts.comparisons.peaks.weekly && (
                    <div className="bg-surface-hover p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 group relative overflow-hidden">
                      <div className="absolute -bottom-4 -left-4 text-8xl text-purple-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 -rotate-12">
                        📅
                      </div>
                      <div className="text-sm text-purple-400 mb-1 font-semibold tracking-wider uppercase">
                        {t("allTimeWeeklyPeak")}
                      </div>
                      <div className="text-3xl font-medium text-text-primary mb-1">
                        {formatNumber(
                          viewCounts.comparisons.peaks.weekly.count
                        )}{" "}
                        {t("visits")}
                      </div>
                      <div className="text-text-secondary text-sm">
                        {t("weekOf")}{" "}
                        {new Date(
                          viewCounts.comparisons.peaks.weekly.weekStart
                        ).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "long",
                          year: "numeric", // Added year for clarity
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Weekly Stats - Recent */}
          {viewCounts?.comparisons?.weekly &&
            Object.keys(viewCounts.comparisons.weekly).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl mb-5 text-text-primary font-medium">
                  {t("recentWeeklyStats")}
                </h3>
                <div className="grid gap-5">
                  {Object.entries(viewCounts.comparisons.weekly)
                    .sort((a, b) => b[0].localeCompare(a[0])) // Sort descending by date
                    .slice(0, 4) // Show last 4 weeks
                    .map(([weekStart, count], index, arr) => {
                      const startDate = new Date(weekStart);
                      const endDate = new Date(weekStart);
                      endDate.setDate(endDate.getDate() + 6);
                      const maxCount = Math.max(
                        1,
                        ...Object.values(viewCounts.comparisons?.weekly || {})
                      );

                      // Determine week label (e.g., "This Week", "Last Week")
                      let weekLabel = `${startDate.toLocaleDateString(
                        undefined,
                        { day: "numeric", month: "short" }
                      )} - ${endDate.toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}`;
                      if (index === 0) weekLabel = t("thisWeek");
                      else if (index === 1) weekLabel = t("lastWeek");
                      else weekLabel = `${t("week")} ${index + 1}`;

                      return (
                        <div key={weekStart} className="group">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-text-primary group-hover:text-primary-500 transition-colors duration-200">
                              {weekLabel}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {formatNumber(count)} {t("visits")}
                            </span>
                          </div>
                          <div className="w-full bg-surface-hover rounded-full h-2.5">
                            <div
                              className="bg-primary-500 rounded-full h-full transition-all duration-300 group-hover:bg-primary-400"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

          {/* Monthly Stats - Recent */}
          {viewCounts?.comparisons?.monthly &&
            Object.keys(viewCounts.comparisons.monthly).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl mb-5 text-text-primary font-medium">
                  {t("recentMonthlyStats")}
                </h3>
                <div className="grid gap-5">
                  {Object.entries(viewCounts.comparisons.monthly)
                    .sort((a, b) => b[0].localeCompare(a[0])) // Sort descending
                    .slice(0, 3) // Show last 3 months
                    .map(([month, count], index, arr) => {
                      const maxCount = Math.max(
                        1,
                        ...Object.values(viewCounts.comparisons?.monthly || {})
                      );
                      const date = new Date(month + "-01");

                      let monthLabel = date.toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      });
                      if (index === 0) monthLabel = t("thisMonth");
                      else if (index === 1) monthLabel = t("lastMonth");

                      return (
                        <div key={month} className="group">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-text-primary group-hover:text-secondary-500 transition-colors duration-200">
                              {monthLabel}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {formatNumber(count)} {t("visits")}
                            </span>
                          </div>
                          <div className="w-full bg-surface-hover rounded-full h-2.5">
                            <div
                              className="bg-secondary-500 rounded-full h-full transition-all duration-300 group-hover:bg-secondary-400"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

          {/* Peak Comparisons - Removed as integrated above */}
        </div>
      )}

      {/* Screen Sizes - New Fun Visual Section */}
      {totalScreenSizes > 0 && (
        <div className="bg-gradient-to-br from-surface-card to-surface-hover/80 rounded-xl p-8 shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl mb-6 text-text-primary font-semibold border-b border-secondary-400 pb-3 flex items-center gap-3">
            <span className="text-secondary-600">🖥️</span> {t("screenSizes")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(viewCounts.analytics.screenSizes || {})
              .sort((a, b) => b[1] - a[1])
              .map(([size, count]) => (
                <div
                  key={size}
                  className="bg-surface-hover/90 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden hover:bg-surface-hover"
                >
                  <div className="absolute -bottom-6 -right-6 text-9xl opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform group-hover:rotate-12">
                    {screenSizeIcons[size] || "📊"}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                        {screenSizeIcons[size] || "📊"}
                      </span>
                      <span className="text-lg font-semibold text-text-primary">
                        {screenSizeLabels[size] || size}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-secondary-700">
                      {calculatePercentage(count, totalScreenSizes)}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-card rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-secondary-600 rounded-full h-full transition-all duration-500 group-hover:bg-secondary-500"
                      style={{
                        width: `${
                          (count /
                            Math.max(
                              1,
                              ...Object.values(
                                viewCounts.analytics.screenSizes || {}
                              )
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-right text-text-primary font-medium">
                    {formatNumber(count)} {t("visits")}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
