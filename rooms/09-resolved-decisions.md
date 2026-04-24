# ROOMS — Resolved Decisions

## Date

2026-04-23

## Decisions

### 1. Each agent gets its own room
ROOMS should now be designed as an agent-level room system.

That means:
- the room belongs to the agent
- node identity still informs the room theme
- the system should be able to scale beyond one room per node

### 2. Rooms should be navigable
The dashboard should support navigation into rooms.

Recommended model:
- overview screen shows multiple rooms at once
- clicking a room opens a deeper room view
- overview remains the fleet map
- room view becomes the inspection/detail surface

### 3. Everly wants to give agents nicknames
Nicknames are now part of the intended product character system.

However, the build should still preserve the operator-facing identifiers:
- m4
- m1
- jeep

This gives the system both:
- emotional identity through nicknames
- operational clarity through stable machine labels

### 4. Visual design locked 2026-04-23 after design session with Everly
The visual design is now considered locked enough to drive production docs and art constraints.

This includes:
- room palette decisions
- character outfit system
- face/expression language
- all-black stroke rule
- cat placement rule
- Jeep room protection from casual drift
- five weather states in JEEP
- locked room prop language from the final design spec

### 5. Character uniform locked
All three node characters share a Carhartt-style watch cap and vest.

Uniform system:
- Carhartt watch cap with dark brown tapered crown, darker cuff, centered two-tone patch, and no text on patch
- Carhartt brown vest with lapels, two lighter front panels, center seam, and no pocket

### 6. Room palettes locked
Room palettes are now locked and defined in `02-visual-style-reference.md`.

Locked palette direction:
- M4 is pastel/deep pink
- M1 is dark/light purple with wood workbench
- JEEP is dark green/grey/black with tinted windshield and five weather states

### 7. JEEP room locked
JEEP room is locked and should not change without explicit approval.

### 8. Eye and eyewear rules locked
- M4 and M1 use purple eyes
- JEEP uses large round sunglasses with glare
- JEEP has no visible eyebrows

### 9. Cat placement rule locked
Black and white cats may appear randomly in M4 and M1 only.
They must NEVER appear in JEEP.

### 10. Canonical source of truth
`ROOMS — Visual Design Spec v1` dated 2026-04-23 is the canonical source of truth for final locked visual design decisions.

## Practical Implications

These decisions change the product shape in important ways:

### Architecture
- route model should expect room-level navigation
- room entities should not be hardcoded only to nodes
- data model may need `agent_id`, `node_id`, and optional `nickname`

### Art direction
- characters become more central
- rooms need stronger per-agent personality
- node theme becomes a parent constraint, not the whole identity

### UI design
- overview vs room-detail split now matters more
- click targets and transitions become a real requirement

### Naming
- the system should likely support both a machine label and a display name
- example: `jeep` as operator label, nickname as room title/personality label

## Working Build Rule

Until the nickname layer is fully designed, use this display logic:
- primary operator-facing identifier: `m4`, `m1`, `jeep`
- nickname support planned, not required to block placeholder build
