# VJ SOLUTIONS — Next.js site
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · three · fast-xml-parser.

## Run
npm install && npm run dev      # http://localhost:3000
npm run build && npm start

## Routes
/ · /about · /services · /services/[slug] (10) · /ai-engineering · /technologies · /projects · /projects/[slug] (4) · /process · /insights · /insights/news/[id] · /insights/knowledge · /insights/knowledge/[slug] (5) · /contact · custom 404.
Canonical URLs use NEXT_PUBLIC_SITE_URL.

## Environment variables
- NEXT_PUBLIC_SITE_URL — public site URL for canonical/OG metadata.
- NEXT_PUBLIC_FORM_ENDPOINT — optional form backend (e.g. Formspree). Without it the form opens the visitor's email app and says nothing was sent.
- NEWS_MAX_AGE_DAYS (default 90), NEWS_MAX_ITEMS (default 400) — used by the news script.
No API keys are required: only public RSS/Atom feeds are used.

## Automatic technology news
Pipeline (src/lib/news/pipeline.ts): fetch feeds (10 s timeout) → parse RSS/Atom → validate https URLs and dates (future/invalid dates rejected) → strip HTML → classify into 10 categories → de-duplicate by URL hash and normalised title → prune by age → store in src/data/news.json.
Each article keeps title, source-supplied excerpt (max 300 chars), source name, original URL, category and original publication date. No images are stored and no full articles are reproduced.
If a source fails, its previous status is recorded and stored articles are kept; the last-updated time only changes when at least one source succeeds.
- Sources: edit src/lib/news/sources.ts.
- Run manually: npm run news:fetch. Offline tests: npm run news:test.
- Schedule: .github/workflows/news.yml runs daily at 05:00 UTC (change the cron line), commits src/data/news.json, and the push triggers a redeploy (Vercel/Netlify). Storage is the committed JSON file, so no database is needed. On hosts with read-only filesystems do not write the file at request time.
- Live feed URLs could not be reached from the build sandbox, so the first real run may show some failing feeds; they are listed in news.json under "sources".

## Deploy
Import the repo into Vercel (or any Node host). Set NEXT_PUBLIC_SITE_URL. Enable GitHub Actions for the daily news job.

## Tested here
Type check and production build pass; all routes return 200 (404 for unknown routes) against `next start`; news parsing, unsafe-URL/date rejection, duplicate detection, pruning and fetch-failure fallback pass offline tests.
## Not tested / limitations
- No browser was available: 3D scenes, layouts, dropdown, mobile drawer, back/forward, reduced motion and WebGL fallback were not visually verified.
- ESLint reports 2 errors for @ts-nocheck in src/lib/cinematic/*.ts, which were not written in this session.
- Unknown dynamic slugs (e.g. /services/xyz) render the 404 page but may return HTTP 200 because of streaming.
- News feeds are untested against the live internet; the news list is empty until the first fetch.
- Technical content covers AI Engineering concepts and 5 knowledge articles, not the full requested list. Services and projects have shorter pages than the full 14-point structure.
- Not built: knowledge articles for data and the remaining topics, technology detail panels, ecosystem map, GSAP/Framer Motion, theme switch.
