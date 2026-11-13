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

## Adding a project
Append an object to `projects` in src/data/site.ts (slug, title, tag, summary = the idea, problem, solution = the thinking behind it, features, tech, optional link). Optionally add a `projectExtra[slug]` entry (flow, challenges, limits, future). /projects, /projects/[slug], the home page and the 3D scene order pick it up automatically (scenes default to the document scene; set the scene list in src/app/projects/page.tsx).
Only the four projects that exist in this repository are present; nothing else has been invented.

## Background videos
Not included (no internet access in the build environment). To add: put licensed, muted, black-and-white clips and poster images in public/video/, record them in ASSET_CREDITS.md, and render them behind a section with low opacity. No video integration code was added.

## Verification performed (Chromium with software WebGL, local static server)
- Scene sync (data-scene attribute on the 3D canvas): Home, Services, Projects and AI Lab all pass direct jumps, slow/fast scrolling down and up, repeated jumps and a 3-second hold, with no console errors.
- 26 routes at 1440 px and at 390 px: HTTP 200, no console errors, no failed requests, no horizontal overflow. Same 26 routes pass when served under the /bala-site base path. Unknown route returns 404 and 404.html contains the not-found page.
- Built HTML contains no "BC", "VJ" or "company" wording (the only "studio" is the tool name Android Studio).
- News pipeline: unit tests plus an end-to-end run against local RSS and Atom servers (duplicate removed, dates preserved, categories assigned, failed feed keeps stored articles).
## Not verified
- Live feeds and the GitHub Actions run (no internet or GitHub access here): the Insights page shows an empty store until the first real workflow run.
- Real devices, other browsers, and real GPU frame rates (tests ran on software rendering at about 7 fps).
