# SOS Church Stockholm — app prototype

A prototype for the next version of [soschurch.se](https://soschurch.se), built with Expo (React Native) so one codebase runs as a website and as an iOS/Android app.

## Run it

```bash
npm install
npm run web       # browser at http://localhost:8081
npm start         # then scan the QR code with Expo Go on a phone
```

The project is pinned to **Expo SDK 57** so it opens in Expo Go 57. To move to a newer SDK, run `npm install expo@~<version>` and then `npx expo install --fix`.

## Web deployment (GitHub Pages)

Every push to `master` runs [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml). It typechecks the code, exports a static site (one pre-rendered HTML file per page) and publishes it to https://kjniemela.github.io/soschurch.se/. You can also start it by hand from the Actions tab.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

The site lives under `/soschurch.se/`, so the workflow passes that path to the build as `EXPO_BASE_URL` (see [app.config.ts](app.config.ts)). With a custom domain the path is empty and nothing else needs to change. To test a Pages build locally:

```bash
EXPO_BASE_URL=/soschurch.se npx expo export --platform web
```

In Git Bash on Windows, add `MSYS_NO_PATHCONV=1` before the command, or the path gets rewritten.

## Editing pages (/admin)

Pages are built from blocks with the [Puck](https://puckeditor.com) visual editor at `/admin` on the website (https://kjniemela.github.io/soschurch.se/admin). Each editable page is a JSON file in `content/pages/`. So far only Home (`content/pages/home.json`) is editable.

**For editors.** Open `/admin`, then paste a GitHub token and click **Connect**. Drag blocks in from the left, click a block to edit its fields on the right, and click **Publish**. Publishing commits the page's JSON to `master`, and the deploy workflow updates the live site a few minutes later. Without a token, the editor shows the copy of the page bundled with the site, and **Download JSON** saves your changes as a file.

The token should be a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) with access to **only this repository** and the **Contents: Read and write** permission. It's stored in that browser's local storage until you click **Disconnect**. Anyone with the token can change the repo's files, so give each editor their own and don't use it on shared computers.

If two people edit the same page, the second to publish gets an error instead of overwriting the first person's changes. Download your version, reload, and redo the changes on top.

**For developers: adding blocks.**

1. Create a block in `src/puck/blocks/`. Each file exports a Puck `ComponentConfig` with the editor `fields`, `defaultProps` and a `render` function built from React Native components (see `Hero.tsx` for a simple one, `Columns.tsx` for a layout block with `slot` fields that hold other blocks).
2. Register it in [src/puck/config.tsx](src/puck/config.tsx), in `components`, the `Blocks` type and a category.
3. Don't rename or remove a block that's used in `content/pages/*.json`. The JSON refers to blocks by name, and unknown blocks are skipped when rendering.

To make another page editable, create `content/pages/<id>.json` (download one from the editor as a starting point), add it to [src/lib/pages.ts](src/lib/pages.ts), and render it with `<PuckContent data={pages.<id>.data} />` the way [src/app/(site)/index.tsx](src/app/(site)/index.tsx) does.

**How it fits together.**

- `src/puck/PuckContent.tsx` renders page JSON on the website and in the app. It's used instead of Puck's own `<Render>`, so the iOS/Android app doesn't include the editor.
- The editor (`src/puck/editor/`) is web-only. [src/app/admin.tsx](src/app/admin.tsx) loads it through `loadEditor.web.ts`. The native `loadEditor.ts` returns nothing, so Metro leaves Puck out of the app bundle. Keep editor-only imports (`@puckeditor/core` values, CSS) inside `src/puck/editor/`; elsewhere use `import type` only.
- The canvas renders blocks directly in the page, not in an iframe, because react-native-web's styles live in the main document. Blocks therefore pick desktop or phone layout from the browser window's width, not the canvas size. Narrow the browser window to check the phone layout.

## How it's organised

- `src/app/` — routes (Expo Router). Every file is a page; URLs match file names.
  - `(site)/_layout.tsx` — responsive shell: top nav bar on wide screens (≥ 900px), bottom tab bar on phones.
  - `(site)/index, about, visit, kids, listen, give` — main nav pages.
  - `(site)/life-groups, new-believers, bible-school` — linked pages outside the nav.
  - `admin.tsx` — the page editor (see above).
- `content/pages/` — page content edited in `/admin` (Puck JSON).
- `src/puck/` — the block library, its config and the page renderer.
- `src/lib/content.ts` — text, events, addresses and links for pages that aren't editable yet, copied from the current site.
- `src/lib/theme.ts` — colours, fonts (Oswald + Montserrat, as on the current site) and spacing.
- `src/components/` — shared UI (`Hero`, `Section`, `Card`, `Button`, `Grid`, `Page` with footer, SVG `Icon`).

## Open questions for the real version

- **Content source:** events, podcast episodes and Life Groups are hard-coded. Church Center and the podcast RSS feed could feed them live.
- **Service times:** the home page says 10:30 & 13:00, the Kids page says the celebration starts at 11:00. The prototype uses 10:30 & 13:00.
- **Vision & values** are images on the current site; they need real text.
- **Miracle Offering** copy is still labelled 2025 (`MO25`).
- **Language:** the site is English-first; decide whether to add Swedish (and Farsi/Spanish) translations.
- Images load from the current Squarespace CDN; move them into the project before launch.
