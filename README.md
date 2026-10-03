# The Glass Road — The First Crossing

A polished GM-less cooperative fantasy RPG vertical slice for 1–6 players.

## What is in this build
- Personalised hero introduction using player names, classes, backgrounds, portraits and strongest skills.
- Slow-burn opening in Brackencliff before the expedition leaves settled country.
- Meaningful conversations that reveal clues, alter relationships and combine into conclusions.
- Two substantial Greywood routes (High Pine Road and River Tern) that reconverge at the Broken Span.
- A three-phase Glass Hound battle with different ways to solve it.
- Hollowmere as a genuine preparation hub before Crown Pass.
- Equipment progression: service, offensive reforging and defensive reinforcement at blacksmiths.
- Party coin, supplies, Hope, Threat, wounds, Growth, talents and Heroic Interventions.
- Optional split-party play at Crown Pass, with separate ridge and maintenance-tunnel mini-stories.
- Private class/background insights, journal, conclusions, recap, fog-of-war journey map and consequence callbacks.
- Optional browser voice chat, procedural ambience with voice ducking, sound cues and native Full Screen mode.
- Persistent host saves, return PINs and reconnect support.

## Render
Build command: `npm install`
Start command: `npm start`
Health check: `/health`

The project expects Node 18+.


## V1.2 Flagship Quality Pass

This build keeps the slower opening pace and adds:
- persistent hero reputation/earned roles that the story remembers and that can later grant +1 when an action fits the role
- equipment condition, battle wear, blacksmith repairs, and a unique Roadsteel binding made from a Glass Hound core
- stronger reactive-story callbacks in the middle of the campaign, not only at the ending
- scene-specific art crops/variants instead of repeating the exact same regional frame across every scene
- cinematic scene transitions and improved dice landing animation
- a subtle recurring Glass Road audio pulse layered under regional ambience
- expanded hero-sheet identity, equipment condition, reputation, private insights, and upgrade state
- strengthened ending callbacks so hero identity and equipment history carry into the epilogue
- retained V1.1 challenge-token/acknowledgement retry protection for stuck rolls

Render settings remain: Node runtime, `npm install`, `npm start`, health check `/health`.


## V1.3 Keeper Finale

This build adds:
- a new two-stage final battle across the Receiving Span
- a final keeper chamber where sacrifice is a real, optional choice
- player self-sacrifice, Mara sacrifice, Dain sacrifice, refusal, and Road-severing endings
- a turn-passing option so any hero can volunteer rather than the game assigning the sacrifice
- an earned hidden solution that can save everyone if the party has connected enough earlier Road clues
- a dangerous improvised alternative for parties that did not fully solve the mystery
- memorial epilogues for sacrificed heroes and NPCs
- new finale illustration assets for the receiver battle and keeper chamber
- battle-state UI for the Receiving Span

The sacrifice is never mandatory: the party can refuse, sever the receiver, or potentially discover another way.
