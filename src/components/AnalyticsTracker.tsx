"use client";

import { useEffect } from "react";
import { incrementPageView } from "@/lib/firebase";
import { trackTimezone } from "@/lib/enhanced-analytics";

export default function AnalyticsTracker() {
  useEffect(() => {
    // Increment page view counter when component mounts
    incrementPageView();
    // Enregistre le fuseau horaire du visiteur
    trackTimezone();
  }, []);

  // No UI - just counts views silently
  return null;
}
