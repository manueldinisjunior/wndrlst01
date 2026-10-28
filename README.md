# WNDRLST

Learn German for the life you’re moving toward.

Fresh implementation for `manueldinisjunior/wndrlst01`. The original `wndrlst` repository is not modified. Publication was authorized by the owner on 28 October 2026.

## Run locally

Node 24 and npm are required.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

## Experience

Personal onboarding, editable origin/languages/goals, a learner hub, seven fictional destinations, lazy-loaded Three.js city with equivalent list navigation, seven original A1–A2 sample lessons, scripted rehearsal, writing autosave, vocabulary collection and interval review, activity progress and light/dark preferences.

## Architecture

React + TypeScript + Vite. `src/App.tsx` owns navigation and browser-local state; `Onboarding.tsx` owns preferences and route editing; `Learning.tsx` owns lessons and review; `City.tsx` contains the isolated procedural 3D scene; `data.ts` contains typed original sample content; `model.ts` contains recommendation/review logic; `ui.tsx` contains shared presentation. Fonts are self-hosted; licenses are in `docs/licenses`.

Hash routes and Vite's relative asset base support the `/wndrlst01/` GitHub Pages subpath and page reloads. No API keys or server secrets are used.

## Deployment

`.github/workflows/pages.yml` tests and builds `main`, uploads the Pages artifact, and deploys through the `github-pages` environment. Pushes to `main` and manual dispatch trigger it. Repository Settings → Pages must use **GitHub Actions**. The configure step requests Pages enablement, but GitHub may require an administrator to enable Pages in Settings first. No domain or paid resource is required for this public repository.

Expected project URL after a successful deployment: https://manueldinisjunior.github.io/wndrlst01/

## Scope and limitations

This is a clearly labeled learning demo, not a production account service. One learner profile and progress are stored in this browser only. Anyone using the same browser profile can access them. There is no authentication, cross-device sync, staff Office, community service, payment integration or live AI. Staff authorization requires a backend and is deliberately not simulated by frontend checks.

Lessons are original authored samples awaiting human editorial review. English interface/vocabulary, with Portuguese sample phrase translations and exercise explanations. Other support languages use a labeled English fallback. A full A1–C2 curriculum, complete localization, advanced assessment and performance-based progression are not implemented. Completion and streaks do not certify language proficiency. Browser TTS availability varies by device. No microphone data is collected. Offline use is limited to already-loaded resources; no service worker is installed.

## Source decisions

Inspected the existing repository's `Codex_Master_Prompt_WNDRLST.md`, `docs/PRODUCT_PLAN.md`, `docs/ONBOARDING.md`, `docs/ADMIN_OFFICE.md`, and README. The latest user brief governs this separate static implementation. The product plan prioritizes everyday/work practice and distinguishes current features from future scope. Apartments and public-service practice are separate destinations. No private source documents or learner data are copied into this public repository.

## Verification

TypeScript, ESLint, six Node tests, and the production build passed locally. Browser checks covered onboarding, manual city entry, multiple languages/goals, Portuguese feedback, wrong-answer retry, scripted rehearsal, writing and position persistence after reload, completion, word review scheduling, and dark-mode persistence. The cloud browser has WebGL disabled: automatic list fallback worked; 3D rendering/picking remains unverified on WebGL hardware. Mobile layouts are implemented but not device-tested. No Core Web Vitals or complete accessibility audit is claimed. Vite reports non-fatal Lucide `use client` bundling warnings in this client-only application.

### Personal profile

Settings → Your profile supports an optional picture and a 500-character About me field. JPEG/PNG/WebP inputs up to 5 MB are decoded locally, center-cropped to 256×256 JPEG, and re-encoded without original metadata. Save/remove operations preserve learning progress. The picture appears in the sidebar and header. Existing version-1 profiles continue working without these optional fields. All profile data remains browser-local; there is no public profile or file upload service.
