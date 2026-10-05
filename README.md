# The Glass Road — The First Crossing

**V1.11.0 — Stability, Accessibility & Story Polish Build**

This is the consolidated playtest build after the October 2026 two-player review.

## Main fixes in V1.11.0

- **Language control layout:** the language selector now sits inside the normal game toolbar rather than floating over other controls.
- **Translation behaviour:** Dutch, French and German now translate the current game screen as one unit. If a full translation is not available, the game keeps that screen in English instead of leaving it half-translated.
- **High-road split crash:** the first route to reach the reunion point now enters a real “Waiting at the Rendezvous” scene. This fixes the missing-scene crash that could hit one side of a split while the other side kept playing.
- **NPC portraits:** secondary NPCs no longer reuse the selectable hero portraits. Dedicated portraits are included for Beren Quill, the Lantern Inn keeper, the archive clerk, Edda Varn, the shepherd, Lowwater elder and Rook's scout, alongside the existing named NPC art.
- **Voice reliability:** WebRTC now reports real connection state, retries once with an ICE restart, and supports TURN relays. Direct browser-to-browser voice may still fail across some routers; TURN is the production fix.
- **Audio silence:** SFX and ambience start off by default. When both are off, the game stops ambience nodes and suspends the game audio context so no low background hum should remain. Voice analysis uses a separate context.
- **Environmental motion:** the camera stays locked while forest mist, river haze, mountain clouds, settlement smoke and Road-energy effects move more visibly. Camp/settlement scenes include a stronger rising-smoke layer.
- **Story copy:** spelling/grammar was cleaned up and RPG-heavy wording was simplified. Player-facing terms such as Broken Span, receiver, handoff, infrastructure and control channels were replaced with clearer language such as Broken Bridge, far tower, taking turns, signals and keeping the crossing open. Internal IDs remain unchanged for save compatibility.
- **Friendlier mechanics wording:** several labels now say “Roll together”, “Quick roll”, “Solo roll”, “Work together” and “Help available” rather than RPG shorthand.

## Translation setup

English always works with no external service. The browser will use its on-device Translator API when available. For dependable full Dutch/French/German translation on Render, add:

- `DEEPL_API_KEY`

Optional:

- `DEEPL_API_URL` — only needed if you want to override the automatic DeepL Free/Pro endpoint selection.

The game intentionally avoids a half-translated screen: if full translation cannot be completed, that screen stays in English and the toolbar shows a short status message.

## Voice setup

Direct WebRTC voice is kept as a fallback, but reliable internet voice needs a TURN relay. Add these Render environment variables from your TURN provider:

- `TURN_URL` — one or more comma-separated `turn:` / `turns:` URLs
- `TURN_USERNAME`
- `TURN_CREDENTIAL`

Without TURN, the UI explicitly says that direct voice may fail on some home, mobile or work networks.

## Deployment

Deploy on Render as a **Web Service**.

- Runtime: Node 20
- Build command: `npm install`
- Start command: `npm start`

## Package contents

- `README.md`
- `package.json`
- `render.yaml`
- `server.js`
- `public/`

All core visual assets are stored in `public/assets/`.


## V1.11.0 translation + hero picker fixes

- Hero portrait thumbnails are preloaded and re-rendered as soon as the Create/Join panel becomes visible, preventing blank portrait blocks on first open.
- Language switching now walks the full visible page rather than translating only a small set of story selectors. Dynamic re-renders are automatically re-translated while a non-English language is active.
- The language selector is temporarily disabled while a translation pass is running, avoiding the earlier need to toggle Nederlands/English repeatedly.
- Player-entered names, room codes and PINs are deliberately not translated.


## V1.11.0 — Lost Archives & Living Journal

- Added four optional **Lost Archive** side stories that appear naturally during the journey. They do not replace the main story choice and can reveal clues, resources, reputation and memorable decisions.
- Added side-story memories to the persistent campaign save and Journal.
- Upgraded the Journal with **Story So Far** and **Memory Cards** so important discoveries and optional encounters feel like part of the party's unique version of the First Crossing.
- Made discovered places on the Journey Map clickable. Selecting a named place now opens a **Journey Memory** view showing what the company learned or chose there.
- Side stories currently include The Watchtower Without a Door, The Ferryman's Last Lantern, The Missing Page, and The Bell Beneath the Snow.
