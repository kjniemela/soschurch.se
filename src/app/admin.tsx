import Head from 'expo-router/head';
import { useEffect, useState, type ComponentType } from 'react';
import { Text, View } from 'react-native';

import { colors, fonts } from '@/lib/theme';
import { loadEditor } from '@/puck/editor/loadEditor';

// Page editor at /admin. The editor only exists in the web build (see
// loadEditor.web.ts) and is loaded after mount, so it's also left out of the
// pre-rendered HTML.
export default function Admin() {
  const [Editor, setEditor] = useState<ComponentType | null>(null);
  const [available] = useState(() => loadEditor());

  useEffect(() => {
    available?.then((component) => setEditor(() => component));
  }, [available]);

  return (
    <>
      <Head>
        <title>SOS admin</title>
        <meta name="robots" content="noindex" />
      </Head>
      {Editor ? (
        <Editor />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
          <Text style={{ color: colors.textMuted, fontFamily: fonts.body }}>
            {available ? 'Loading editor…' : 'The page editor is only available on the website.'}
          </Text>
        </View>
      )}
    </>
  );
}
