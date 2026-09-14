import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../utils/analytics';

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  // Initialize analytics scripts/dataLayer once on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track virtual page views whenever the URL pathname or search query changes
  useEffect(() => {
    const fullPath = location.pathname + location.search;
    trackPageView(fullPath, document.title);
  }, [location.pathname, location.search]);

  return null;
};
