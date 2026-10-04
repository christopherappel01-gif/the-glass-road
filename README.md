# The Glass Road — The First Crossing

A polished GM-less cooperative fantasy RPG vertical slice for 1–6 players.

## Current Build

**V1.5.3 — Consolidated High-Quality Test Build**

This package rolls the recent stability, UI, portrait, dice, hint, and high-quality image work into one clean build. Older version-specific note files have been removed.

## What is in this build

- Personalised hero introduction using player names, classes, backgrounds, portraits and strongest skills.
- Slow-burn opening in Brackencliff before the expedition leaves settled country.
- Meaningful conversations that reveal clues, alter relationships and combine into conclusions.
- Two substantial Greywood routes — High Pine Road and River Tern — that reconverge at the Broken Span.
- A three-phase Glass Hound encounter with different ways to solve it.
- Hollowmere as a genuine preparation hub before Crown Pass.
- Equipment progression: service, offensive reforging, defensive reinforcement and Roadsteel binding.
- Party coin, supplies, Hope, Threat, wounds, Growth, talents and Heroic Interventions.
- Optional split-party play at Crown Pass with separate ridge and maintenance-tunnel mini-stories.
- Private class/background insights, journal, conclusions, recap, fog-of-war journey map and consequence callbacks.
- Optional browser voice chat, procedural ambience with voice ducking, sound cues and native Full Screen mode.
- Persistent host saves, return PINs and reconnect support.

## Current polish / fixes included

- High-resolution cinematic landing-page artwork with a darker, moodier overlay.
- New premium high-resolution environment art across the Greywood, River Tern, Broken Span, mountain pass and under-mountain sections.
- Compact asset package with unused legacy art removed to keep the public folder comfortably below common upload file-count limits.
- Hero portrait asset-path fix for Knight, Ranger, Mage, Thief, Monk and Engineer variants.
- Larger integrated close button for dice-result panels.
- More defensive dice-roll flow with server acknowledgement, visible Sending / Rolling / Resolving states, retry handling, and protection against silently stuck rolls.
- Private insights and gameplay hints remain visible until explicitly dismissed with an X.
- Node 20 LTS runtime pinning, exact Express / Socket.IO dependency versions, safer keep-alive settings and improved server error logging for Render stability.
- Persistent hero reputation / earned roles that can affect later checks and story callbacks.
- Equipment condition, battle wear, repairs and Roadsteel upgrades.
- More reactive story callbacks during the campaign and finale.
- Improved cinematic scene transitions and dice landing animation.
- Recurring Glass Road audio pulse layered under regional ambience.
- Expanded hero-sheet identity, equipment condition, reputation, private insights and upgrade state.

## Render deployment

- Runtime: Node 20 LTS
- Build command: `npm install`
- Start command: `npm start`
- Health check: `/health`

## Package structure

- `server.js` — game server and multiplayer state.
- `package.json` — pinned runtime dependencies and scripts.
- `render.yaml` — Render deployment settings.
- `public/` — complete browser game, styles, scripts and active art assets.

This is the consolidated test-bed package. You do not need the older V1.4 / V1.5 note files.
