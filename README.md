# Voice Flow — React + Vite + Supabase + Cloudflare Pages

## Contents
- Email sign-up, login and logout; private per-user Supabase data.
- Focus Flow-inspired compact responsive mobile design, shared modal.
- Home: Voice Identity, 90-day KPIs, daily activities.
- Training: category/subcategory library, edit/add/delete, YouTube bookmarks.
- Reading: original manuscripts, reference-person YouTube library, embedded player, uploaded audio A-B loop, 0.5–1.5× speed, listening/shadow/echo modes.
- Recording: browser microphone, private Supabase Storage upload, 1–5 self-rating, notes, per-technique history and A/B listening, comparison evaluation.
- Analysis: separate daily deduplicated completed training sessions, recording counts and comparison evaluations; JSON export.

## Setup
1. Run `supabase/schema.sql` in the Supabase SQL Editor on the chosen project. This script creates `voice_flow_data` and private `voice-recordings` storage bucket with user-scoped policies. It **does not delete** existing app data.
2. Copy `.env.example` to `.env` and supply `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable/anon key only; NEVER use the service-role key).
3. Run `npm install`, `npm run dev` or `npm run build`.
4. Supabase Authentication → URL Configuration: set your production Site URL and add your Cloudflare Pages origin to redirect URLs. Enable email authentication; confirm-email behavior depends on the project setting.
5. Cloudflare Pages: connect GitHub repo, build command `npm run build`, output folder `dist`, define both `VITE_*` environment variables in Cloudflare Pages project settings, then deploy. HTTPS is needed for microphone access.

## Important limitations
- Existing `index.html` localStorage and IndexedDB data are **not erased** or migrated automatically. The standalone prototype remains intact; use a backup before retiring it. React uses isolated new Supabase tables.
- Saved recording files are privately stored in Supabase Storage. JSON export includes metadata, not audio file bytes.
- A-B playback, speed, and loop work for audio files uploaded in the current browser session. Uploaded reference audio is not synced between devices. YouTube is played through embed (and cannot be extracted for signal analysis).
- 'Echo' mode pauses at the end of a selected loop; it does not automatically record and replay the user's response.
- Speech recognition, auto-detection of phoneme errors, waveform/fundamental-frequency measurement, video section syncing, and automatic alignment of transcript sentences to audio are not implemented.
- As the environment had no access to registry.npmjs.org, dependencies could not be installed here and `vite build` could not be validated. See validation report.
