import { useWindowDimensions } from 'react-native';

import { DESKTOP_BREAKPOINT } from '@/lib/theme';

export function useIsDesktop() {
  return useWindowDimensions().width >= DESKTOP_BREAKPOINT;
}
