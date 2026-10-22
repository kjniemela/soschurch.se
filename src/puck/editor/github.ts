import type { Data } from '@puckeditor/core';

// Reads and writes page JSON in the repo through the GitHub contents API.
// Committing to `branch` triggers the Pages deploy workflow.

export const repo = { owner: 'kjniemela', name: 'soschurch.se', branch: 'master' };

const TOKEN_KEY = 'sos-admin-github-token';

export function readToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  } catch {
    return '';
  }
}

export function storeToken(token: string) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage unavailable (private mode etc.): the token lasts for this visit only.
  }
}

export class GitHubError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function contentsUrl(path: string) {
  return `https://api.github.com/repos/${repo.owner}/${repo.name}/contents/${path}`;
}

async function request(token: string, url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new GitHubError(body.message ?? res.statusText, res.status);
  }
  return res.json();
}

function encodeBase64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function decodeBase64(base64: string) {
  const binary = atob(base64.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

/** Loads a page and the file version (`sha`) needed to publish over it. */
export async function loadPage(token: string, path: string): Promise<{ data: Data; sha: string }> {
  const file = await request(token, `${contentsUrl(path)}?ref=${repo.branch}`);
  return { data: JSON.parse(decodeBase64(file.content)), sha: file.sha };
}

/**
 * Commits a page. `sha` must be the version the editor loaded: if someone else
 * published in between, GitHub answers 409 and nothing is overwritten.
 */
export async function publishPage(token: string, path: string, data: Data, sha: string, message: string) {
  const result = await request(token, contentsUrl(path), {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: encodeBase64(JSON.stringify(data, null, 2) + '\n'),
      sha,
      branch: repo.branch,
    }),
  });
  return { sha: result.content.sha as string, commitUrl: result.commit.html_url as string };
}
