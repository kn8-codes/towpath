# ROOMS — Product Spec

## Product Name

ROOMS

## Parent System

TOWPATH dashboard

## Version

1.0 design-phase spec

## Product Definition

ROOMS is a visual fleet layer for the TOWPATH dashboard in which each node is represented by a Toca Boca-inspired SVG room scene, and each room reacts to live system data.

The rooms are designed to communicate fleet behavior in a way that is immediately legible to non-technical viewers while still being structured enough for real operator use.

## Primary Goals

### Goal 1: Make fleet state instantly understandable
A viewer should be able to tell:
- which node is alive
- which node is active
- which node is receiving work
- which node is working
- which node is down

### Goal 2: Make the system demoable
The dashboard should be strong enough that a person can look at it for a few seconds and say:
- “I get it”
- “that room is doing work”
- “that node looks down”
- “the fleet is alive”

### Goal 3: Build a distinctive visual identity
ROOMS is not generic DevOps chrome.
It is part of the product’s identity.

### Goal 4: Create a kid-legible and adult-credible surface
The art should feel playful enough to be fun and human, but structured enough to still read as real software, not a joke.

## Audience

### Primary audience
- Nate as operator/builder
- technical collaborators
- potential clients or demo viewers
- anyone evaluating the fleet concept

### Secondary audience
- Everly as co-creator / art source / character designer
- future non-technical viewers who need intuitive understanding of the system

## Node Themes

### M4
Theme: control room  
Vibe: screens, dials, command center energy

### M1
Theme: kitchen / workshop  
Vibe: busy, industrial, things happening

### Jeep
Theme: garage / car interior  
Vibe: field node, mobile, always on the road

## Room States

Each room supports five states.
These are driven by live TOWPATH data.

| State | Visual Meaning |
|---|---|
| idle | Lights dim, character sitting, quiet |
| active | Lights on, character moving, loop running |
| receiving | Mail slot opens, message arrives |
| working | Character at desk/machine, task loop running |
| down | Lights off, cobwebs, door locked |

## State Semantics

### idle
The room is alive but not currently handling something urgent.
Visual design should read as calm, not dead.

### active
The room is awake and engaged.
Motion is present. Lighting is stronger. The character looks alert or busy.

### receiving
This is the “incoming task” beat.
It should read as unmistakable event arrival.
This state is short, transitional, and high-signal.

### working
This is deeper than active.
The room should show the node fully engaged with its function.
This can mean repetitive, loopable behavior tied to the room theme.

### down
The room should read as unavailable, stale, or offline.
This should not be subtle.
The visual should make it obvious something is wrong.

## Technical Stack

- SVG scenes
- GSAP
- SvelteKit dashboard shell
- Supabase as state source
- TOWPATH + `bridge.py` as data pipeline
- Inkscape + inkscape-mcp for art refinement and production pass

## Data Flow

```text
TOWPATH message arrives on towpath:tasks
  → bridge.py writes to Supabase tasks table
  → dashboard polls Supabase every 3s (or Realtime when fixed)
  → room state updates based on sender + job_type
  → GSAP animation fires for that room
```

## Build Phases

### Phase 1 — Placeholder rooms (Nate)
- simple SVG placeholders
- circles or basic agent markers
- real state changes wired first
- prove the pipeline end to end

### Phase 2 — Everly room designs
- node themes defined visually
- character concepts established
- Toca Boca-inspired art direction locked

### Phase 3 — inkscape-mcp production pass
- source art refined into production SVGs
- IDs and layers normalized for GSAP
- export discipline enforced

### Phase 4 — GSAP state animation wiring
- room states mapped to animation loops
- transitions tied to live data
- heartbeat timeout triggers down state

### Phase 5 — deploy
- integrated into `towpath/dashboard`
- local first
- later available on a stable deployed URL

## Why It Works

### For Everly
It is her art becoming live software.
That gives the project emotional reality and ownership.

### For demos
It makes the fleet understandable immediately.

### For the product
It gives the system character and recognizability.
Capability becomes memorable because it has a visible form.

### For the pipeline
The underlying SVG-to-GSAP workflow already exists conceptually.
This is a matter of pointing it at real state and disciplined artwork.

## Product Risks

### Risk: art gets too cute and loses readability
Mitigation:
- every animated prop must support the room’s job
- state readability beats decoration

### Risk: technical state mapping becomes muddy
Mitigation:
- keep the state model tight
- avoid too many room states too early

### Risk: SVG art becomes hard to animate consistently
Mitigation:
- strict naming contract
- layer discipline
- early placeholder pipeline validation

## Success Criteria

ROOMS is successful if:
- the fleet state is understandable at a glance
- each room clearly feels different
- state changes are visible and intuitive
- the art remains consistent enough to animate reliably
- the product feels like a real system, not a novelty skin

## Open Questions

The following product questions are still unresolved and should remain explicit until decided:

- Does each agent get its own room, or do agents share a node room?
- Should rooms be navigable, click to zoom in, or all visible at once?
- Does Everly want to name the agents?

## Immediate Next Step

Next recommended build move:
- Build Phase 1 placeholder rooms
- Schedule design session with Everly


## Resolved Product Decisions (2026-04-23)

### Room ownership
Each agent gets its own room.

This is no longer treated as an open question. Node themes still matter, but the room should be understood as the agent's space within the broader fleet system.

### Navigation model
Rooms should be navigable.

The system should support both:
- a fleet overview with multiple rooms visible
- deeper click/zoom navigation into a room

### Naming model
Everly wants to give the agents nicknames.

For now, working implementation should still preserve the operational node labels `m4`, `m1`, and `jeep` so the fleet remains easy to track during buildout.
