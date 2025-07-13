// Simple analytics batching to improve performance
interface AnalyticsEvent {
  type: 'platform_click' | 'timezone' | 'record_check';
  data: any;
  timestamp: number;
}

class AnalyticsBatcher {
  private queue: AnalyticsEvent[] = [];
  private batchSize: number = 5;
  private flushInterval: number = 3000; // 3 seconds
  private timeoutId: NodeJS.Timeout | null = null;
  private isOnline: boolean = true;

  constructor() {
    // Listen for online/offline status
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.flush();
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  add(event: AnalyticsEvent) {
    this.queue.push(event);
    
    // Auto-flush if batch size reached or if going offline
    if (this.queue.length >= this.batchSize || !this.isOnline) {
      this.flush();
    } else {
      // Schedule flush if not already scheduled
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => {
          this.flush();
        }, this.flushInterval);
      }
    }
  }

  private async flush() {
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0); // Clear queue
    
    // Clear timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // Only process if online
    if (!this.isOnline) {
      // Re-add to queue for later processing
      this.queue.unshift(...batch);
      return;
    }

    try {
      // Process each event type
      const { trackPlatformClick, trackTimezone, checkRecords } = await import('./enhanced-analytics');
      
      for (const event of batch) {
        switch (event.type) {
          case 'platform_click':
            await trackPlatformClick(event.data);
            break;
          case 'timezone':
            await trackTimezone();
            break;
          case 'record_check':
            await checkRecords(event.data.count, new Date(event.timestamp));
            break;
        }
      }
    } catch (error) {
      console.error('Analytics batch processing failed:', error);
      // Re-add failed events to queue for retry
      this.queue.unshift(...batch);
    }
  }

  // Force flush (useful for page unload)
  forceFlush() {
    this.flush();
  }
}

// Singleton instance
const analyticsBatcher = new AnalyticsBatcher();

// Batched analytics functions
export const batchedTrackPlatformClick = (platform: string) => {
  analyticsBatcher.add({
    type: 'platform_click',
    data: platform,
    timestamp: Date.now(),
  });
};

export const batchedTrackTimezone = () => {
  analyticsBatcher.add({
    type: 'timezone',
    data: null,
    timestamp: Date.now(),
  });
};

export const batchedCheckRecords = (count: number) => {
  analyticsBatcher.add({
    type: 'record_check',
    data: { count },
    timestamp: Date.now(),
  });
};

// Cleanup function for page unload
export const flushAnalytics = () => {
  analyticsBatcher.forceFlush();
};

export default analyticsBatcher;