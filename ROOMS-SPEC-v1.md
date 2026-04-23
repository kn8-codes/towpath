# ROOMS — Agent Spatial Dashboard
**Version**: 1.0 (Spec)
**Status**: Design phase
**Codename**: ROOMS

---

## Concept

Each node and agent gets a "room" — a Toca Boca-style illustrated SVG scene. Rooms are alive. They respond to real TOWPATH data. Everly designs the art. The pipeline brings it to life.

This is a real product demo. Anyone can look at ROOMS and immediately understand what the fleet is doing without knowing anything about agents or protocols. It's also genuinely fun to build with a kid.

---

## Rooms

| Node | Room Theme | Vibe |
|---|---|---|
| M4 | Control room | Screens, dials, command center energy |
| M1 | Kitchen / workshop | Busy, industrial, things happening |
| Jeep | Garage / car interior | Field node, always on the road |

Each agent inside their node gets a character in the room. Character design by Everly.

---

## Room States

Every room has five states driven by live TOWPATH data:

| State | Visual |
|---|---|
| `idle` | Lights dim, character sitting, quiet |
| `active` | Lights on, character moving, animation loop running |
| `receiving` | Mail slot opens, message arrives |
| `working` | Character at desk/machine, GSAP task loop |
| `down` | Lights off, cobwebs, door locked |

---

## Technical Stack

- **SVG scenes** — designed by Everly, refined in Inkscape via inkscape-mcp
- **GSAP** — animates all state transitions
- **SvelteKit** — dashboard shell (lives inside towpath/dashboard)
- **Supabase** — state source (polling or Realtime)
- **TOWPATH + bridge.py** — data pipeline underneath

Everything sits on top of infrastructure already built and running.

---

## Data Flow

```
TOWPATH message arrives on towpath:tasks
  → bridge.py writes to Supabase tasks table
    → dashboard polls Supabase every 3s (or Realtime when fixed)
      → room state updates based on sender + job_type
        → GSAP animation fires for that room
```

---

## SVG Element Naming (GSAP Contract)

All SVG elements follow this naming convention so GSAP can target them consistently:

```
room-{node}          → root SVG container per room (e.g. room-m1)
agent-{name}         → character element (e.g. agent-scheduler)
light-{node}         → lighting layer (e.g. light-jeep)
activity-{node}      → animation trigger zone (e.g. activity-m4)
status-{node}        → state indicator dot/icon (e.g. status-m1)
layer-{n}            → standard inkscape-mcp layer naming
```

Follows existing inkscape-mcp GSAP contract:
- Root SVG `id="root"`
- Top-level groups `id="layer-{n}"`
- Shapes `id="{type}-{n}"`
- No inline transforms on root

---

## Build Phases

**Phase 1 — Placeholder rooms (Nate)**
- Simple SVG boxes for rooms, circles for agents
- Wire up state changes and GSAP animations with placeholder art
- Confirm the data pipeline works end to end

**Phase 2 — Everly designs the rooms**
- Toca Boca aesthetic — bright colors, chunky shapes, characters
- Each node gets a room theme she picks
- Each agent gets a character she draws/describes

**Phase 3 — inkscape-mcp production pass**
- Everly's designs refined and exported as production SVGs via inkscape-mcp
- Elements named per GSAP contract above
- Layers structured for animation targeting

**Phase 4 — GSAP animations wired to live data**
- State transitions animated per room state table
- Idle → active → working → idle loop
- Down state triggers on heartbeat timeout

**Phase 5 — Deploy**
- Integrated into towpath/dashboard SvelteKit app
- Accessible at localhost for now, Vercel eventually
- Single URL shows the whole fleet alive

---

## Why It Works

- **For Everly**: it's her game, her art, her characters. Real software running her designs.
- **For demos**: anyone can look at it and get it immediately. No technical knowledge required.
- **For the product**: this is the visual layer that makes kn8-built agents sellable. Capability is table stakes. Character + visual identity is the differentiator.
- **For the pipeline**: SVG → GSAP is already built via inkscape-mcp. This is just pointing it at real data.

---

## Open Questions

- Does each agent get its own room, or do agents share a node room?
- Should rooms be navigable (click to zoom in) or all visible at once?
- Does Everly want to name the agents?

---

*Spec authored: 2026-04-23*
*Next: Build Phase 1 placeholder rooms. Schedule design session with Everly.*
