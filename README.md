# BALA’S CRAFT — Next.js site (static export, GitHub Pages ready)
Next.js 16 · React 19 · TypeScript · Tailwind v4 · three · fast-xml-parser.
## Run
npm install && npm run dev      # development
npm run build                   # static export to ./out (output: "export")

## GitHub Pages: exact setup
1. Push this project to a GitHub repository whose default branch is `main`.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. (Optional) Settings → Secrets and variables → Actions → Variables: `SITE_URL` (full public URL, for canonical links) and `CUSTOM_DOMAIN` (any value) if you use a custom domain, which serves from the root with no base path.
4. Push to `main`, or run Actions → "Refresh news and deploy to GitHub Pages" → Run workflow.
Base path: for a project site the workflow sets NEXT_PUBLIC_BASE_PATH=/<repo-name>; for `<user>.github.io` repos or when CUSTOM_DOMAIN is set it is empty. Locally: `NEXT_PUBLIC_BASE_PATH=/repo npm run build`.
GitHub Pages cannot run server code, so there are no API routes or cron on the server: dynamic features use static JSON plus GitHub Actions.

## News pipeline (static)
.github/workflows/deploy.yml runs on push, manual dispatch and **every 6 hours** (`cron: 0 */6 * * *`; scheduled runs use the default branch):
fetch feeds (scripts/fetch-news.ts) → parse RSS/Atom → validate https URLs and dates → strip HTML → classify → de-duplicate → write public/data/news.json → commit only if it changed → build → deploy.
If the fetch step fails the workflow continues and the previous JSON is kept; the last-updated time changes only when at least one source succeeds. The Insights page renders the JSON from the build and also re-fetches /data/news.json in the browser, showing the real last-successful-update time, failed sources, and an error or empty state when applicable. Detail pages are generated at build time, so articles fetched after a build get their detail page on the next build (the same workflow run builds right after fetching).
Sources: src/lib/news/sources.ts (15 feeds). Live check from a machine with internet: `npm run news:fetch` then open public/data/news.json.
**Why Insights showed "not connected":** the stored file was empty because no fetch had ever run (this development sandbox cannot reach the internet). The first workflow run fills it; I could not run it here.

## Tests run in this environment
tsc: clean. ESLint: 0 errors (3 warnings). `next build` static export: 47 pages. Static server check: all routes tested return 200 and unknown routes return 404; base-path build rewrites assets and links to /<repo>/. News parser/dedupe/fallback tests pass. Not run: browser tests.

## Not verified / not done
- No browser was available: the particle head, brain, eye rays, labels, scroll scenes, floating navigation and mobile layouts have not been seen rendering.
- Background videos not included (see ASSET_CREDITS.md).
- Live feeds never reached; feed URLs unverified against the real internet.
- Not rebuilt: the interactive technology ecosystem map, per-service unique layouts, and the Knowledge Center covers 19 of the requested topics (missing e.g. data visualization, predictive analytics, API authentication as separate articles).
- Removed: the legacy "cinematic" engine (src/lib/cinematic, which needed @ts-nocheck). The shared SceneStage system now drives all section scenes, and the 3D hero was rewritten as a particle point cloud.
