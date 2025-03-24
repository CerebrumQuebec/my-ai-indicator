"use client";

import { useEffect } from "react";
import { incrementPageView } from "@/lib/firebase";

export default function AnalyticsTracker() {
  useEffect(() => {
    // Increment page view counter when component mounts
    incrementPageView();
  }, []);

  // No UI - just counts views silently
  return null;
}
