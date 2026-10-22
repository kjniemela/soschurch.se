import '@puckeditor/core/puck.css';

import { Puck, type Data } from '@puckeditor/core';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

import { pageFilePath, pageIds, pages, type PageId } from '@/lib/pages';
import { config } from '@/puck/config';
import { GitHubError, loadPage, publishPage, readToken, repo, storeToken } from '@/puck/editor/github';

// Web-only page editor, loaded lazily by src/app/admin.tsx. Uses plain DOM
// elements for its own toolbar; the page canvas renders our React Native blocks.

type Doc = { data: Data; sha?: string };
type Status = { kind: 'idle' | 'working' | 'ok' | 'error'; text: string; link?: string };

export default function Editor() {
  const [token, setToken] = useState(readToken);
  const [pageId, setPageId] = useState<PageId>('home');
  const [doc, setDoc] = useState<Doc | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' });
  const latest = useRef<Data | null>(null);

  const load = useCallback(async () => {
    setDoc(null);
    latest.current = null;
    if (!token) {
      // Without a token we can only show the copy bundled with this build, which may be out of date.
      setDoc({ data: pages[pageId].data });
      setStatus({ kind: 'idle', text: 'Preview only. Connect GitHub to load the latest version and publish.' });
      return;
    }
    setStatus({ kind: 'working', text: 'Loading from GitHub…' });
    try {
      setDoc(await loadPage(token, pageFilePath(pageId)));
      setStatus({ kind: 'idle', text: '' });
    } catch (e) {
      setDoc({ data: pages[pageId].data });
      setStatus({ kind: 'error', text: `Couldn't load from GitHub (${describe(e)}). Showing the bundled copy.` });
    }
  }, [pageId, token]);

  useEffect(() => {
    load();
  }, [load]);

  const publish = async (data: Data) => {
    if (!token || !doc?.sha) {
      setStatus({ kind: 'error', text: 'Connect GitHub before publishing, or download the JSON instead.' });
      return;
    }
    setStatus({ kind: 'working', text: 'Publishing…' });
    try {
      const result = await publishPage(token, pageFilePath(pageId), data, doc.sha, `Update ${pages[pageId].title} page from /admin`);
      setDoc({ data, sha: result.sha });
      setStatus({
        kind: 'ok',
        text: 'Published. The live site updates in a few minutes.',
        link: `https://github.com/${repo.owner}/${repo.name}/actions`,
      });
    } catch (e) {
      const conflict = e instanceof GitHubError && e.status === 409;
      setStatus({
        kind: 'error',
        text: conflict
          ? 'Someone else published this page since you opened it. Download your version, then reload to see theirs.'
          : `Publishing failed (${describe(e)}).`,
      });
    }
  };

  const download = () => {
    const data = latest.current ?? doc?.data;
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${pageId}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div style={styles.shell}>
      <div style={styles.toolbar}>
        <strong>SOS admin</strong>
        <label style={styles.group}>
          Page
          <select value={pageId} onChange={(e) => setPageId(e.target.value as PageId)} style={styles.input}>
            {pageIds.map((id) => (
              <option key={id} value={id}>
                {pages[id].title}
              </option>
            ))}
          </select>
        </label>
        <TokenControl
          token={token}
          onChange={(t) => {
            storeToken(t);
            setToken(t);
          }}
        />
        <button onClick={download} style={styles.button}>
          Download JSON
        </button>
        <span style={{ ...styles.status, color: statusColors[status.kind] }}>
          {status.text}{' '}
          {status.link && (
            <a href={status.link} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
              View deploy
            </a>
          )}
        </span>
      </div>
      <div style={styles.canvas}>
        {doc && (
          <Puck
            key={`${pageId}:${doc.sha ?? 'bundled'}`}
            config={config}
            data={doc.data}
            onChange={(data) => (latest.current = data)}
            onPublish={publish}
            headerTitle={pages[pageId].title}
            // Our blocks are styled by react-native-web, whose styles live in this
            // document; an iframe canvas would render them unstyled.
            iframe={{ enabled: false }}
            height="100%"
          />
        )}
      </div>
    </div>
  );
}

function TokenControl({ token, onChange }: { token: string; onChange: (token: string) => void }) {
  const [draft, setDraft] = useState('');
  if (token) {
    return (
      <span style={styles.group}>
        GitHub connected
        <button onClick={() => onChange('')} style={styles.button}>
          Disconnect
        </button>
      </span>
    );
  }
  return (
    <form
      style={styles.group}
      onSubmit={(e) => {
        e.preventDefault();
        onChange(draft.trim());
        setDraft('');
      }}
    >
      <input
        type="password"
        placeholder="GitHub token"
        autoComplete="off"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button} disabled={!draft.trim()}>
        Connect
      </button>
    </form>
  );
}

function describe(e: unknown) {
  if (e instanceof GitHubError) return `${e.status}: ${e.message}`;
  return e instanceof Error ? e.message : String(e);
}

const statusColors: Record<Status['kind'], string> = {
  idle: '#555',
  working: '#555',
  ok: '#18794e',
  error: '#c4320a',
};

const styles: Record<string, CSSProperties> = {
  shell: { display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'system-ui, sans-serif', fontSize: 14 },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
    padding: '8px 16px',
    borderBottom: '1px solid #ddd',
    background: '#fafafa',
  },
  group: { display: 'flex', alignItems: 'center', gap: 8 },
  input: { padding: '4px 8px', fontSize: 14 },
  button: { padding: '4px 10px', fontSize: 14, cursor: 'pointer' },
  status: { flex: 1, minWidth: 200 },
  canvas: { flex: 1, minHeight: 0 },
};
