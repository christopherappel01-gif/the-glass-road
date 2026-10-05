# The Glass Road — The First Crossing

**V1.9.0 — Slow Cinematic Landing + Spotlight Fix Build**

This build rolls all current fixes and visual upgrades into one clean playtest package.

## What changed in this build

- Full high-quality art pass across the game from top to bottom.
- Upgraded the remaining earlier scene art so the full journey now uses HQ environments.
- Replaced all selectable hero portraits with a new premium portrait set.
- Replaced core named NPC portraits with new premium portrait art.
- Converted art assets to **WebP** for better image quality-per-file-size and quicker loading.
- Keeps earlier fixes already made during iteration:
  - Render stability improvements
  - hero portrait loading fixes
  - dice roll reliability fix
  - persistent closable hints / private insight boxes
  - compact package cleanup

## Package contents

- `README.md`
- `package.json`
- `render.yaml`
- `server.js`
- `public/`

## Deployment

Deploy on Render as a **Web Service**.

- Runtime: **Node 20**
- Build command: `npm install`
- Start command: `npm start`

## Notes

- All core visual assets used by the game are now in `public/assets/` as optimized **WebP** files (except the home SVG icon).
- This build is intended as the **high-quality stress-test candidate**.


## Flagship animation pass

- **Phase A:** animated landing-page hero with cinematic drift, mist and glow overlays.
- **Phase B:** built-in animated story-beats montage on the home screen.
- **Phase C:** upgraded scene reveals and in-game chapter art motion.
- **Phase D:** animated class portrait gallery plus subtle portrait motion throughout the interface.


## V1.9.0 refinements

- Simplified the landing page again by removing the extra cinematic-story and animated-hero promo sections.
- Added an **actual looping animated hero image** for the main landing-page artwork.
- Shifted the motion emphasis into the **story moments themselves** using atmospheric overlays: moving forest mist, soft tree sway, drifting mountain cloud, river haze, danger pulses, and settlement smoke/light.


## V1.9.0 refinements

- Replaced the quicker animated landing image with a **12-second muted looping video** with near-static framing, slow cloud drift and forest mist.
- Removed the noticeable fast zoom-in / zoom-out effect from the landing presentation.
- Fixed hero/reputation spotlight pop-ups (including **Trusted Voice**) so portrait artwork is displayed at a contained, screen-safe size instead of being blown up as a full-screen crop.


## V1.9.0 major scene loops

- Added **actual animated environment loops** for the main story moments rather than only overlay motion.
- The major scenes now use dedicated animated WebP loops integrated directly into the story panel:
  - Brackencliff / Discovery
  - Pine Road
  - Charcoal Camp
  - Stag Stones
  - River Road
  - Lowwater
  - Broken Span
  - Tone Beneath the Bridge
  - Hollowmere
  - Mountain Pass
  - Under the Mountain
  - Final View
- Kept the landing page simple and updated the landing animation to a slower, calmer loop.
- Reduced the spotlight / Trusted Voice portrait scaling so those popups stay screen-safe.


## V1.9.0 fixes

- Fixed the **Trusted Voice / spotlight** portrait so it displays as a contained portrait card instead of behaving like an oversized background image.
- Slowed the landing page hero loop by roughly **half** for a calmer in-and-out motion.


## V1.9.0 quality pass

### Environment animation
- Removed the floating scene glyphs (including the white diamond) from story artwork.
- Locked the scene camera so the entire picture no longer shakes or drifts.
- Re-rendered the major animated story moments with movement inside the world: forest mist, subtle canopy sway, river haze/shimmer, mountain cloud drift, settlement smoke/light, Road energy pulses and under-mountain glow.
- Kept the slower landing-page loop from V1.8.1.

### Voice chat
- Voice now reports actual peer-link status instead of only saying that players joined the voice room.
- Added TURN-relay support for reliable browser-to-browser audio across different routers/mobile networks.
- The game still falls back to STUN/direct WebRTC when TURN is not configured, but the UI clearly labels that as direct-only.
- For production voice on Render, set these environment variables from your TURN provider:
  - `TURN_URL` (one or more comma-separated `turn:` / `turns:` URLs)
  - `TURN_USERNAME`
  - `TURN_CREDENTIAL`

### Dutch / French / German
- Added a per-player language selector: English, Nederlands, Français, Deutsch.
- Each browser translates its own story narration, mission and choice text independently. Other players can remain in English or choose another language.
- On browsers that provide the on-device Translator API, translation can happen locally.
- A server fallback is included using DeepL when `DEEPL_API_KEY` is configured in Render. Translation results are cached in the browser for smoother repeat play.
- If neither an on-device translator nor DeepL is available, the game safely leaves the English text in place and reports `Translator unavailable` rather than breaking play.
