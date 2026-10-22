import type { Data } from '@puckeditor/core';

import home from '../../content/pages/home.json';

// Pages editable in /admin. Each one is a Puck JSON file in content/pages/<id>.json.
// To make another page editable: add its JSON file here and render it with <PuckContent>.

export type PageId = 'home';

export const pages: Record<PageId, { title: string; data: Data }> = {
  home: { title: 'Home', data: home as Data },
};

export const pageIds = Object.keys(pages) as PageId[];

export function pageFilePath(id: PageId) {
  return `content/pages/${id}.json`;
}
