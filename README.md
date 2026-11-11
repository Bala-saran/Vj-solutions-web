# VJ SOLUTIONS — Next.js site
Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · three.
## Run
npm install && npm run dev   # http://localhost:3000
npm run build && npm start
## Contact form
Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) in .env.local. Without it the form opens the visitor's email app prefilled and states that nothing was sent.
## Content
All copy lives in src/data/site.ts. Contact details were taken from the founder's portfolio; edit them there.
## Deploy
Push to GitHub and import into Vercel, or run `npm run build` and host the output with any Node host.
## Done
Global 3D background; hero scene; reusable 3D system in src/components/3d (kit.ts materials/helpers, SceneStage.tsx single shared renderer with scroll-driven scene switching, scenes.ts with 14 scenes); AI Engineering workstation scene; four distinct project scenes; ten service scenes; floating technology logo universe (official Simple Icons marks) beside the logo grid; scroll reveal; Process timeline.
## Not visually verified
The 3D scenes have been type-checked and built, but never opened in a browser. Expect proportions, lighting and positions to need tuning.
## Not done
Theme switch, page transitions, GSAP/Framer Motion, insights article pages, morphing-particle assembly (scenes enter by travelling from depth instead).
