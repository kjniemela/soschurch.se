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

## How it's organised

- `src/app/` — routes (Expo Router). Every file is a page; URLs match file names.
  - `(site)/_layout.tsx` — responsive shell: top nav bar on wide screens (≥ 900px), bottom tab bar on phones.
  - `(site)/index, about, visit, kids, listen, give` — main nav pages.
  - `(site)/life-groups, new-believers, bible-school` — linked pages outside the nav.
- `src/lib/content.ts` — all text, events, addresses and links, copied from the current site. Replace this with a CMS or Church Center feed later.
- `src/lib/theme.ts` — colours, fonts (Oswald + Montserrat, as on the current site) and spacing.
- `src/components/` — shared UI (`Hero`, `Section`, `Card`, `Button`, `Grid`, `Page` with footer, SVG `Icon`).

## Open questions for the real version

- **Content source:** events, podcast episodes and Life Groups are hard-coded. Church Center and the podcast RSS feed could feed them live.
- **Service times:** the home page says 10:30 & 13:00, the Kids page says the celebration starts at 11:00. The prototype uses 10:30 & 13:00.
- **Vision & values** are images on the current site; they need real text.
- **Miracle Offering** copy is still labelled 2025 (`MO25`).
- **Language:** the site is English-first; decide whether to add Swedish (and Farsi/Spanish) translations.
- Images load from the current Squarespace CDN; move them into the project before launch.
