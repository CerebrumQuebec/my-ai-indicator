"use client";

import { useEffect, useState } from "react";
import { getPageViews } from "@/lib/firebase";
import { getEnhancedAnalytics } from "@/lib/enhanced-analytics";
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

export default function Analytics() {
  const { t } = useTranslation();
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
        <div className="animate-pulse text-text-secondary">
          {t("loadingAnalytics")}
        </div>
      </div>
    );
  }

  // Sort daily counts by date in descending order
  const sortedDailyCounts = Object.entries(viewCounts.daily || {})
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 30);

  // Helper function to format numbers
  const formatNumber = (num: number) => num.toLocaleString();

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

  // Calculate total platform clicks
  const totalPlatformClicks = Object.values(
    viewCounts.platformClicks ?? {}
  ).reduce((a, b) => a + b, 0);

  return (
    <div className={`space-y-8 ${cormorant.className}`}>
      {/* Overview with Performance */}
      <div className="bg-surface-card rounded-lg p-6">
        <h2 className="text-2xl mb-4 text-text-primary">
          {t("analyticsOverview")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xl text-text-primary">
              {t("totalVisits")}: {formatNumber(viewCounts.total)}
            </div>
            <div className="text-xl text-text-primary">
              {t("todayVisits")}:{" "}
              {formatNumber(
                viewCounts.daily[new Date().toISOString().split("T")[0]] || 0
              )}
            </div>
          </div>
          <div>
            <div className="text-xl text-text-primary">
              {t("avgLoadTime")}:{" "}
              {viewCounts.analytics.performance?.avg_load_time
                ? `${(
                    viewCounts.analytics.performance.avg_load_time / 1000
                  ).toFixed(2)} ${t("seconds")}`
                : t("notAvailable")}
            </div>
          </div>
        </div>
      </div>

      {/* Devices, Browsers, and Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-card rounded-lg p-6">
          <h2 className="text-2xl mb-4 text-text-primary">{t("devices")}</h2>
          {Object.entries(viewCounts.analytics.devices).map(
            ([device, count]) => (
              <div key={device} className="mb-2 flex justify-between">
                <span className="capitalize text-text-primary">
                  {t(device)}
                </span>
                <span className="text-text-secondary">
                  {formatNumber(count)} (
                  {calculatePercentage(count, totalDevices)}%)
                </span>
              </div>
            )
          )}
        </div>

        <div className="bg-surface-card rounded-lg p-6">
          <h2 className="text-2xl mb-4 text-text-primary">{t("browsers")}</h2>
          {Object.entries(viewCounts.analytics.browsers).map(
            ([browser, count]) => (
              <div key={browser} className="mb-2 flex justify-between">
                <span className="capitalize text-text-primary">
                  {t(browser)}
                </span>
                <span className="text-text-secondary">
                  {formatNumber(count)} (
                  {calculatePercentage(count, totalBrowsers)}%)
                </span>
              </div>
            )
          )}
        </div>

        <div className="bg-surface-card rounded-lg p-6">
          <h2 className="text-2xl mb-4 text-text-primary">{t("languages")}</h2>
          {Object.entries(viewCounts.analytics.languages)
            .sort((a, b) => b[1] - a[1])
            .map(([lang, count]) => (
              <div key={lang} className="mb-2 flex justify-between">
                <span className="text-text-primary">{t(lang)}</span>
                <span className="text-text-secondary">
                  {formatNumber(count)} (
                  {calculatePercentage(count, totalLanguages)}%)
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Hours Distribution */}
      <div className="bg-surface-card rounded-lg p-6">
        <h2 className="text-2xl mb-4 text-text-primary">{t("visitHours")}</h2>
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
                      className="w-full bg-primary-500 hover:bg-primary-400 transition-all duration-200 rounded-t relative group"
                      style={{ height: `${height}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-surface-card text-text-primary px-2 py-1 rounded text-xs whitespace-nowrap">
                        {count} {t("visits")}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-xs mt-1 text-center text-text-secondary"
                    title={timeLabel}
                  >
                    {hour}h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily History */}
      <div className="bg-surface-card rounded-lg p-6">
        <h2 className="text-2xl mb-4 text-text-primary">{t("dailyRecord")}</h2>
        <div className="grid gap-4">
          {sortedDailyCounts.map(([date, count]) => (
            <div
              key={date}
              className="flex justify-between items-center border-b border-surface-hover pb-2"
            >
              <div className="text-text-primary">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-text-secondary">
                {formatNumber(count)} {t("visits")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Clicks */}
      {viewCounts.platformClicks &&
        Object.keys(viewCounts.platformClicks).length > 0 && (
          <div className="bg-surface-card rounded-lg p-6">
            <h2 className="text-2xl mb-4 text-text-primary">
              {t("platformClicks")}
            </h2>
            <div className="grid gap-4">
              {Object.entries(viewCounts.platformClicks)
                .sort((a, b) => b[1] - a[1])
                .map(([platform, count]) => (
                  <div
                    key={platform}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg text-text-primary">
                      {platform}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-text-secondary">
                        {formatNumber(count)} {t("visits")}
                      </span>
                      <div className="w-24 bg-surface-hover rounded-full h-2">
                        <div
                          className="bg-primary-500 rounded-full h-full"
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
                      <span className="text-sm text-text-secondary">
                        {calculatePercentage(count, totalPlatformClicks)}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* Milestones & Achievements */}
      {viewCounts.milestones && (
        <div className="bg-surface-card rounded-lg p-6">
          <h2 className="text-2xl mb-4 text-text-primary">
            {t("achievements")}
          </h2>

          {/* Records */}
          <div className="mb-6">
            <h3 className="text-xl mb-3 text-text-primary">{t("records")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {viewCounts.milestones?.records.daily && (
                <div className="bg-surface-hover p-4 rounded-lg">
                  <div className="text-lg font-medium text-text-primary">
                    {t("dailyRecord")}
                  </div>
                  <div className="text-text-primary">
                    {formatNumber(viewCounts.milestones.records.daily.count)}{" "}
                    {t("visits")}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {new Date(
                      viewCounts.milestones.records.daily.date
                    ).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              )}

              {viewCounts.milestones?.records.hourly && (
                <div className="bg-surface-hover p-4 rounded-lg">
                  <div className="text-lg font-medium text-text-primary">
                    {t("hourlyRecord")}
                  </div>
                  <div className="text-text-primary">
                    {formatNumber(viewCounts.milestones.records.hourly.count)}{" "}
                    {t("visits")}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {new Date(
                      viewCounts.milestones.records.hourly.datetime
                    ).toLocaleString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}

              {viewCounts.milestones?.records.minute && (
                <div className="bg-surface-hover p-4 rounded-lg">
                  <div className="text-lg font-medium text-text-primary">
                    {t("minuteRecord")}
                  </div>
                  <div className="text-text-primary">
                    {formatNumber(viewCounts.milestones.records.minute.count)}{" "}
                    {t("visits")}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {new Date(
                      viewCounts.milestones.records.minute.datetime
                    ).toLocaleString(undefined, {
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
          {viewCounts.milestones?.achievements &&
            Object.keys(viewCounts.milestones.achievements).length > 0 && (
              <div>
                <h3 className="text-xl mb-3 text-text-primary">
                  {t("achievements")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(viewCounts.milestones.achievements)
                    .sort((a, b) => b[1].value - a[1].value)
                    .map(([key, achievement]) => (
                      <div
                        key={key}
                        className="bg-surface-hover p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <div className="text-lg font-medium text-text-primary">
                            {formatNumber(achievement.value)} {t("visitors")}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {new Date(achievement.date).toLocaleDateString(
                              undefined,
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </div>
                        <div className="text-4xl text-primary-500">🏆</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Comparative Analysis */}
      {viewCounts.comparisons && (
        <div className="bg-surface-card rounded-lg p-6">
          <h2 className="text-2xl mb-4 text-text-primary">
            {t("comparativeAnalysis")}
          </h2>

          {/* Weekly Stats */}
          {viewCounts.comparisons.weekly &&
            Object.keys(viewCounts.comparisons.weekly).length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-text-primary">
                  {t("weeklyStats")}
                </h3>
                <div className="grid gap-3">
                  {Object.entries(viewCounts.comparisons.weekly)
                    .sort((a, b) => b[0].localeCompare(a[0]))
                    .slice(0, 4)
                    .map(([weekStart, count]) => {
                      const startDate = new Date(weekStart);
                      const endDate = new Date(weekStart);
                      endDate.setDate(endDate.getDate() + 6);

                      return (
                        <div
                          key={weekStart}
                          className="bg-surface-hover p-4 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <div className="text-lg text-text-primary">
                              {startDate.toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "short",
                              })}{" "}
                              -{" "}
                              {endDate.toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "short",
                              })}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {t("week")}{" "}
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
                          <div className="text-lg text-text-primary">
                            {formatNumber(count)} {t("visits")}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

          {/* Monthly Stats */}
          {viewCounts.comparisons.monthly &&
            Object.keys(viewCounts.comparisons.monthly).length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-text-primary">
                  {t("monthlyStats")}
                </h3>
                <div className="grid gap-3">
                  {Object.entries(viewCounts.comparisons.monthly)
                    .sort((a, b) => b[0].localeCompare(a[0]))
                    .slice(0, 3)
                    .map(([month, count]) => (
                      <div
                        key={month}
                        className="bg-surface-hover p-4 rounded-lg flex justify-between items-center"
                      >
                        <div className="text-lg text-text-primary">
                          {new Date(month + "-01").toLocaleDateString(
                            undefined,
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-lg text-text-primary">
                          {formatNumber(count)} {t("visits")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {/* Peak Comparisons */}
          {viewCounts.comparisons.peaks && (
            <div>
              <h3 className="text-xl mb-3 text-text-primary">
                {t("historicalRecords")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {viewCounts.comparisons.peaks.daily && (
                  <div className="bg-surface-hover p-4 rounded-lg">
                    <div className="text-lg font-medium text-text-primary">
                      {t("dailyPeak")}
                    </div>
                    <div className="text-text-primary">
                      {formatNumber(viewCounts.comparisons.peaks.daily.count)}{" "}
                      {t("visits")}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {new Date(
                        viewCounts.comparisons.peaks.daily.date
                      ).toLocaleDateString(undefined, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>
                )}

                {viewCounts.comparisons.peaks.weekly && (
                  <div className="bg-surface-hover p-4 rounded-lg">
                    <div className="text-lg font-medium text-text-primary">
                      {t("weeklyPeak")}
                    </div>
                    <div className="text-text-primary">
                      {formatNumber(viewCounts.comparisons.peaks.weekly.count)}{" "}
                      {t("visits")}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {t("weekOf")}{" "}
                      {new Date(
                        viewCounts.comparisons.peaks.weekly.weekStart
                      ).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
