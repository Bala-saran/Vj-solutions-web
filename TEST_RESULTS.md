# Test results (only what was actually run)

Environment: Chromium (Playwright) with software WebGL (SwiftShader), local static server of `out/`. No GPU, no internet.

## Build and static checks
- `npx tsc --noEmit`: pass
- `npx eslint`: 0 errors, 4 warnings (all pre-existing)
- `npm run build`: pass, 47 static pages generated
- Automated tests: the project has none except `npm run news:test` (not run).

## Route load audit (real browser)
- 46 exported routes x 5 viewports (1920x1080, 1366x768, 768x1024, 390x844, 360x800) = 230 loads, plus 1 unknown-route probe.
- All routes returned 200; unknown route returned 404.
- Home page: 0 console errors, 0 failed requests, 0 horizontal overflow, 1 h1, at all 5 viewports.
- No broken images, no horizontal overflow on any route/viewport, no external network requests.
- Console/network problems: only the two items listed in WEBSITE_AUDIT_REPORT.md (/404/, /insights/news/none/).

## Hero verification
- Canvas rendered on first load at 1920x1080 and 390x844; scroll stages reached 0, ~0.6-1, ~1.6-2 (data-stage attribute); screenshots reviewed for desktop and mobile.
- Real clicks at 1366x768 and 390x844: "Explore Our Work" → /projects/, "Let's Connect" → /contact/, contact form empty submit shows 3 validation messages, nav panel opens with 19 links; 0 page errors.

## NOT tested
- Clicking every button/card/link on every page (only the hero CTAs, contact validation and nav panel opening were clicked). All internal link targets exist as routes in the build, but I did not click each one.
- Navigating each of the 19 nav-panel links by click (the attempt crashed my test harness; not retried).
- External links (GitHub, LinkedIn, WhatsApp, portfolio, article sources): no internet.
- Contact form successful send / mailto handoff, Prompt Lab, News filters, Tech directory interactions.
- Reduced-motion mode and the WebGL-unavailable fallback were implemented but not exercised in a browser.
- Real-GPU frame rate and real devices; tests ran on software rendering.
- Authentication: none exists. API integrations: none besides static news.json.

## Water/effects update (re-verified after this change)
- `tsc` and `npm run build` pass. Hero screenshots reviewed at 1920x1080 (stage 0) and 390x844; scroll stages advance on both; 0 console errors in the mobile capture run. An earlier water-shader compile error was found by this testing and fixed.
- The full 46-route x 5-viewport audit and the CTA/form click checks above were run BEFORE the water update and were not repeated.
- Not verified in a browser: click/tap shockwave, desktop stages 1-2 appearance with water after the final tweaks, reduced-motion mode, real-GPU performance (the pool and mirror add GPU load; tests ran on software rendering).
