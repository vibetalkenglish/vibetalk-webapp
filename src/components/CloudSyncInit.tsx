'use client';

import { useEffect } from 'react';
import { initCloudSync } from '@/lib/cloudSync';

/** Starts Supabase auth + progress sync once per page load. Renders nothing. */
export default function CloudSyncInit() {
  useEffect(() => {
    initCloudSync();
  }, []);
  return null;
}
