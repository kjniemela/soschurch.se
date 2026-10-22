import type { ConfigContext, ExpoConfig } from 'expo/config';

// Extends app.json. EXPO_BASE_URL lets the web build live in a subfolder,
// e.g. "/soschurch.se" on GitHub Pages; leave it unset for local dev or a custom domain.
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_BASE_URL || undefined,
  },
});
