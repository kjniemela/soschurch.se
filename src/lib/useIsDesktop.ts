import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import { DESKTOP_BREAKPOINT } from '@/lib/theme';

export function useIsDesktop() {
  const { width } = useWindowDimensions();
  // Static web pages are pre-rendered without a window size, so the first
  // client render must match that (mobile layout) before using the real width.
  const [hydrated, setHydrated] = useState(Platform.OS !== 'web');
  useEffect(() => setHydrated(true), []);
  return hydrated && width >= DESKTOP_BREAKPOINT;
}
