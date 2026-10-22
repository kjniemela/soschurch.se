import type { ComponentType } from 'react';

// iOS/Android: the page editor is web-only (see loadEditor.web.ts).
export function loadEditor(): Promise<ComponentType> | null {
  return null;
}
