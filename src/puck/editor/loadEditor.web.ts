import type { ComponentType } from 'react';

// Web: load the editor on demand. The native twin (loadEditor.ts) returns null,
// so Metro never pulls Puck into the iOS/Android bundle.
export function loadEditor(): Promise<ComponentType> | null {
  return import('@/puck/editor/Editor').then((m) => m.default);
}
