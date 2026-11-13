# Website audit report

Scope: static export of Bala's Craft (Next.js, `output: "export"`). The site has no login/authentication and no API routes; the only dynamic data is `/data/news.json` (static file).

## Change made
Home hero only: Morphing Matter 3D sculpture, new hero copy/CTAs ("Explore Our Work" → /projects, "Let's Connect" → /contact), pinned scroll stages, CSS for the hero. Nothing else was edited. No audit fix was applied (see findings).

## Findings (not fixed, because the instruction was to change nothing beyond the 3D hero)
1. `/404/` (the exported not-found page opened as a normal URL) logs React error #418 (hydration text mismatch) in Chromium. Unrelated to the hero; the page still renders.
2. `/insights/news/none/` triggers one 404 for an internal Next prefetch file (`__next._tree.txt`). The page renders; the route is a placeholder generated because the news store is empty.
3. Link prefetches show `net::ERR_ABORTED` when a page is closed during load; this is a test-harness artefact, not a site fault.
4. Hero copy: the requested supporting text uses "We", while the rest of the site speaks in first person ("I", "one person"). Restore the old sentence in `src/app/page.tsx` if you prefer consistency.
5. Existing lint warnings (4, all pre-existing, 0 errors): unused `sceneFor` (2 files), `keys` hook dependency in SceneStage, unused `eyeStart` in the now-unused HeroHead.
6. The site keeps three WebGL contexts (background, scene stage, hero); this was already the case.

## Routes found in the build (46, plus one unknown-route probe)
- /
- /404/
- /_not-found/
- /about/
- /ai-engineering/
- /contact/
- /insights/
- /insights/knowledge/
- /insights/knowledge/ai-agents/
- /insights/knowledge/ai-evaluation-guardrails/
- /insights/knowledge/authentication-vs-authorization/
- /insights/knowledge/caching/
- /insights/knowledge/database-indexing/
- /insights/knowledge/docker-and-ci-cd/
- /insights/knowledge/embeddings-vector-search/
- /insights/knowledge/encryption/
- /insights/knowledge/etl-vs-elt/
- /insights/knowledge/fine-tuning-vs-rag/
- /insights/knowledge/kubernetes-deployments/
- /insights/knowledge/llm-transformers/
- /insights/knowledge/monolith-vs-microservices/
- /insights/knowledge/neural-networks/
- /insights/knowledge/owasp-top-10/
- /insights/knowledge/rag/
- /insights/knowledge/rest-apis/
- /insights/knowledge/rest-vs-graphql/
- /insights/knowledge/sql-vs-nosql/
- /insights/news/none/
- /process/
- /projects/
- /projects/audio-denoiser/
- /projects/employee-attrition-analysis/
- /projects/medistock-finder/
- /projects/resume-analyser/
- /services/
- /services/ai-development/
- /services/android/
- /services/custom-software/
- /services/data-analytics/
- /services/ecommerce/
- /services/healthcare-technology/
- /services/ml-engineering/
- /services/prompt-context-engineering/
- /services/security-software/
- /services/workflow-automation/
- /technologies/
