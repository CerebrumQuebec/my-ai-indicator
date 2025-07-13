"use client";

import React from "react";
import { useTranslation } from "../../contexts/TranslationContext";
import HighContrastText from "../../components/HighContrastText";
import { motion } from "framer-motion";
import versionData from "../../data/versions.json";

const VersionHistoryPage: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-dark via-surface-dark/95 to-surface-dark/90">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px]" />
      
      <div className="relative container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HighContrastText text={t("versionHistoryTitle") || "Version History"} />
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("versionHistoryDescription") || "Track the evolution of Badge AI with detailed release notes and feature updates."}
            </motion.p>
          </div>

          {/* Current Version Section */}
          {(() => {
            const currentVersionData = versionData.versions.find(
              v => v.version === versionData.currentVersion
            );
            
            if (!currentVersionData) return null;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <div className="bg-surface-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center border-2 border-primary-400/30">
                        <span className="text-white font-bold text-sm">
                          {currentVersionData.version.split('.')[0]}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wide">
                            {t("currentVersion") || "Current Version"}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                          {currentVersionData.title[language] || currentVersionData.title.en}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm font-medium border border-primary-500/30">
                        V{currentVersionData.version}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {currentVersionData.releaseDate[language] || currentVersionData.releaseDate.en}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    {currentVersionData.whatsNew[language] || currentVersionData.whatsNew.en}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {t("keyFeatures") || "Key Features:"}
                    </h3>
                    <ul className="grid gap-3">
                      {(currentVersionData.features[language] || currentVersionData.features.en).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                          <span className="text-gray-300 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Version History Section - Only show if there are historical versions */}
          {(() => {
            const historicalVersions = versionData.versions.filter(
              version => version.version !== versionData.currentVersion
            );
            
            if (historicalVersions.length === 0) return null;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {t("versionHistory") || "Version History"}
                  </h2>
                </div>

                <div className="space-y-8">
                  {historicalVersions.map((version, index) => (
                    <motion.div
                      key={version.version}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="bg-surface-card/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-accent-500/30 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">
                          {version.title[language] || version.title.en}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-sm font-medium border border-accent-500/30">
                            V{version.version}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {version.releaseDate[language] || version.releaseDate.en}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {version.whatsNew[language] || version.whatsNew.en}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          {t("keyFeatures") || "Key Features:"}
                        </h4>
                        <ul className="grid gap-2">
                          {(version.features[language] || version.features.en).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
                              <span className="text-gray-300 text-sm leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })()}

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-surface-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <p className="text-gray-400 text-sm">
                {t("versionHistoryNote") || "Want to stay updated? New releases are announced with detailed changelogs showing exactly what's new and improved."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VersionHistoryPage;