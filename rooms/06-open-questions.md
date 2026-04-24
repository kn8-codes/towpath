# ROOMS — Open Questions

## Purpose

This document isolates unresolved product and implementation questions so they do not stay buried inside longer spec files.

## Product Structure Questions

### 1. Does each agent get its own room, or do agents share a node room?

This is a major structural decision.

#### Option A — one room per node
Pros:
- simpler to implement
- easier to understand at a glance
- aligns well with current three-node fleet framing
- easier for Phase 1 placeholders

Cons:
- multiple agents inside one node may be harder to distinguish later
- growth ceiling if the internal agent roster becomes important

#### Option B — one room per agent
Pros:
- stronger character-level specificity
- better long-term expansion if many agents matter independently
- more expressive demo surface

Cons:
- more art overhead
- more UI complexity
- may weaken the simple fleet-at-a-glance read early on

#### Working recommendation
Start with **one room per node**.
Treat characters within that room as the active agents for now.
That keeps the first version legible and buildable.

## Navigation Questions

### 2. Should rooms be navigable, click to zoom in, or all visible at once?

#### Option A — all visible at once only
Pros:
- strongest immediate demo readability
- simple first implementation
- reinforces fleet-wide awareness

Cons:
- limited room for deeper detail
- less satisfying if people want to inspect one node closely

#### Option B — overview first, click to zoom into a room
Pros:
- best long-term product direction
- keeps overview legible while enabling depth
- fits the spatial metaphor very naturally

Cons:
- more routing and interaction complexity
- more room-detail design work required

#### Working recommendation
Use **overview-first with future zoom-in**.
For Phase 1 and early Phase 2, all rooms visible at once is enough.
But the architecture should assume clickable room expansion later.

## Character Identity Questions

### 3. Does Everly want to name the agents?

This matters more than it sounds.
Naming changes the emotional feel of the whole product.

#### If yes
- each character gets stronger identity
- the product becomes more memorable
- demos become more story-like
- the art/design collaboration becomes richer

#### If no
- rooms can stay node-centric
- system remains slightly more technical/neutral
- naming can be deferred until the characters feel real enough

#### Working recommendation
Leave naming open, but explicitly invite Everly to do it.
This is probably a good design-session question, not a preemptive product decision.

## State Model Questions

### 4. Are the five room states enough?

Current states:
- idle
- active
- receiving
- working
- down

Potential issue:
Depending on live fleet behavior, `active` and `working` may overlap too much.

#### Working recommendation
Keep the five-state model for now.
Only split or collapse states after placeholder rooms are connected to real data.

## Data Questions

### 5. What exact TOWPATH events map to which room states?

This is still conceptually described, but it needs a concrete mapping table.

Needed later:
- sender-to-room mapping
- task-type-to-state mapping
- heartbeat timeout logic
- transition duration rules

#### Working recommendation
Create a dedicated state mapping table during Phase 1 placeholder implementation.

## Production Questions

### 6. How much of Everly's source art remains visible after production cleanup?

Possible spectrum:
- lightly refined direct art
- interpreted redraw
- heavily normalized production SVG derived from concept only

#### Working recommendation
Preserve as much visual authorship as possible while still meeting SVG/GSAP production constraints.

## Demo Questions

### 7. Is ROOMS meant to be operator UI first, demo layer first, or both equally?

This affects:
- density
- controls
- whether overlays/logs are visible
- how “clean” the room scenes remain

#### Working recommendation
Treat it as **demo-first with real operator utility**, at least initially.
That is where the concept is strongest.

## Near-term Decision Priorities

If nothing else gets answered immediately, these three should be decided first:
1. node rooms vs agent rooms
2. overview-only vs zoomable rooms
3. whether Everly wants to name characters

## Current Recommended Defaults

Until the decisions are formally made, use these defaults:
- one room per node
- all rooms visible at once in primary dashboard view
- character naming deferred to Everly design session


## Resolved Decisions (2026-04-23)

### Agent rooms vs node rooms
Decision: **each agent gets its own room**.

This means ROOMS should be architected as an agent-level system, not only a node-level system. Node identity still matters, but the room is owned by the agent.

### Navigation
Decision: **rooms should be navigable**.

The main dashboard can still show an overview, but rooms should support click/zoom/navigation into deeper views.

### Nicknames
Decision: **Everly absolutely wants to give the agents nicknames**.

For now, production references should still preserve `m4`, `m1`, and `jeep` as operator-visible identifiers so Nate can keep the fleet straight while the nickname system develops.
