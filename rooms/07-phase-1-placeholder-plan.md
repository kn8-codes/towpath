# ROOMS — Phase 1 Placeholder Plan

## Purpose

Phase 1 exists to prove the pipeline before final art production.

This phase is not about beauty.
It is about establishing that:
- the dashboard can render rooms
- the state model can drive room behavior
- GSAP can target room elements reliably
- placeholder scenes can later be swapped for real art without rewriting the system

## Phase 1 Goal

Create simple placeholder rooms for M4, M1, and Jeep that obey the final SVG contract and respond to live or simulated TOWPATH-driven state changes.

## What Phase 1 Must Prove

### 1. The room wrapper model works
- one SVG per room
- standard ID contract
- status dot / lighting layer / activity zone present

### 2. GSAP targeting works
- room root can be found reliably
- state transitions can drive visible changes
- placeholder elements can be animated by state

### 3. Data wiring works
- incoming fleet state updates change room state
- room state is not hardcoded to fake visual changes only

### 4. Layout works
- multiple rooms can coexist in the dashboard
- state changes are readable at a glance

## Placeholder Art Rules

Placeholder rooms should be deliberately simple.
That keeps build effort low while preserving the final architecture.

### Use:
- simple box-like room shells
- simple workstation props
- circle or toy-like placeholder characters
- visible status dots
- obvious activity zones

### Avoid:
- spending too much time beautifying the placeholder pass
- introducing inconsistent IDs
- using shortcuts that final art cannot inherit

## Minimum Required Room Elements

Each placeholder room should include:
- `room-{node}` root SVG
- `light-{node}` layer
- `activity-{node}` zone
- `status-{node}` indicator
- top-level `layer-{n}` groups
- one placeholder agent element
- one room-themed main workstation prop

## Placeholder Room Breakdown

### M4 placeholder
Theme: control room

Include:
- desk or console block
- one or two monitor blocks
- simple seated operator circle/body
- status light
- a small activity zone near desk/screens

### M1 placeholder
Theme: workshop/kitchen hybrid

Include:
- bench or machine block
- pipe/tool/meter placeholder shapes
- standing or leaning worker character
- status light
- activity zone near machine/bench

### Jeep placeholder
Theme: car interior / mobile node

Include:
- windshield or dashboard framing
- steering wheel placeholder
- seated driver character
- status light
- activity zone near dash/wheel area

## Phase 1 Animation Targets

The placeholder rooms only need enough animation to prove the state pipeline.

### idle
- dim light
- no major motion
- small ambient pulse allowed

### active
- brighter light
- gentle character or prop motion

### receiving
- quick message arrival cue
- status dot change
- short highlight event

### working
- repeated activity-zone motion
- stronger character engagement cue

### down
- darkened room
- no active movement
- optional simple locked/disabled cue

## Engineering Tasks

### Task 1 — create placeholder SVGs
Deliverable:
- three placeholder SVG scenes obeying the naming contract

### Task 2 — build room state object
Deliverable:
- normalized room state values for M4, M1, Jeep

### Task 3 — write GSAP transition layer
Deliverable:
- room state to animation mapping for placeholder targets

### Task 4 — wire dashboard state updates
Deliverable:
- polling or mock updates flow into room state changes

### Task 5 — validate swapability
Deliverable:
- confirm production art can replace placeholder SVGs without changing animation architecture

## Suggested Deliverables

By the end of Phase 1, the project should have:
- `m4-placeholder.svg`
- `m1-placeholder.svg`
- `jeep-placeholder.svg`
- one room state mapping file
- one animation driver file
- one dashboard layout that shows all three rooms

## Acceptance Criteria

Phase 1 is complete when:
- all three rooms render
- all five room states can be triggered
- transitions are visible
- IDs follow contract
- the placeholder system is stable enough that Everly's art can replace it later

## What Not to Do in Phase 1

- do not over-design final props
- do not wait for perfect art
- do not skip the naming contract
- do not treat placeholder assets as disposable if they are proving architecture

## Why Phase 1 Matters

Phase 1 is where the product stops being an idea and starts being a system.
If the placeholders work, the art pipeline has a real place to land.
If the placeholders do not work, prettier SVGs will not save the architecture.
