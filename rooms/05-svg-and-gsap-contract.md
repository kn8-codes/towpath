# ROOMS — SVG and GSAP Contract

## Purpose

This document defines the production constraints for ROOMS SVG assets and the naming system required for GSAP animation.

This is the enforcement layer between art and runtime.

## Base SVG Rules

Each room is a standalone SVG scene.

### Required base format
- SVG scene per room
- room `viewBox="0 0 360 320"`
- character `viewBox="0 0 200 280"` when characters are broken out independently
- flat fills only
- chunky outlines
- rounded shapes
- no gradients
- no external assets
- all strokes must be `#111`

### Forbidden features
- no `clip-path`
- no `filter`
- no `mask`
- no `linearGradient`
- no inline transforms on root

## Root Contract

Each room root must use:

```text
id="room-{node}"
```

Examples:
- `room-m4`
- `room-m1`
- `room-jeep`

## Required IDs

### Root room
```text
room-{node}
```

### Character
```text
agent-{name}
```

### Lighting layer
```text
light-{node}
```

### Activity zone
```text
activity-{node}
```

### Status indicator
```text
status-{node}
```

### Top-level groups
```text
layer-{n}
```

### Additional elements
```text
{type}-{node}-{n}
```

Examples:
- `desk-m4-1`
- `screen-m4-2`
- `pipe-m1-3`
- `wheel-jeep-1`
- `cat-m4-1`
- `gauge-jeep-2`

## Inkscape / GSAP Compatibility Rules

This follows the existing inkscape-mcp GSAP naming expectations:
- root SVG id on the room container
- top-level groups named `layer-{n}`
- child shapes consistently named
- no root transform hacks

## Comment Markers for Animation Targets

Any element intended for animation should include a nearby comment marker:

```xml
<!-- GSAP: {state} -->
```

Examples:
- `<!-- GSAP: ambient -->`
- `<!-- GSAP: pulse -->`
- `<!-- GSAP: blink -->`
- `<!-- GSAP: typing -->`
- `<!-- GSAP: receiving -->`
- `<!-- GSAP: working -->`

These markers do not drive runtime directly by themselves, but they make production intent clear and help during refinement.

## Monitor Standard

All monitors across M4 and M1 follow this shared specification:

- size: `width=108 height=82`
- corner radius: `rx=10`
- mounted on shared horizontal wall rail
- all monitors share the same y position
- no stands, wall mounted only
- screen inset: `8px` padding with `rx=6`
- screen background uses the dark fill matching the room palette

### Screen content by slot
- left: waveform (polyline) → animation target: line drift / scroll
- center: progress bars (3 rows) → animation target: bar width change
- right: progress bars (3 rows) → animation target: bar width change

## State-to-Animation Mapping

### idle
Likely targets:
- M4: dim lights, boba straw sway, cat may appear
- M1: dim lights, coffee steam, cat may appear
- JEEP: evening weather, needle rests

### active
Likely targets:
- M4: monitors brighten, buttons pulse
- M1: waveform animates, progress bars fill
- JEEP: nav route animates

### receiving
Likely targets:
- M4: console lights flash, character looks up
- M1: button row flashes, character looks up
- JEEP: signal bars pulse

### working
Likely targets:
- M4: bar charts update, character types
- M1: progress bars cycle, waveform active
- JEEP: speedometer needle rises

### down
Likely targets:
- M4: lights off, monitors dark, cobwebs
- M1: lights off, pipes dim, cobwebs
- JEEP: windshield darkens, gauges drop

## Layer Structure Recommendation

A room should roughly be organized as:

### `layer-1`
Background shell
- outer room shape
- wall
- floor

### `layer-2`
Lighting and structural background
- windows
- wall fixtures
- lighting elements
- status dot if integrated there

### `layer-3`
Main room props
- workstation
- shelves
- bench
- dashboard
- machines

### `layer-4`
Character and immediate interaction zone
- character body
- chair/seat/driver area
- hands/tools near active work area

### `layer-5` optional
Foreground effects or state-specific props
- mail slot cue
- down-state overlays
- loose animated surface details

## Animation Readiness Rules

Each animated element should be:
- individually targetable by ID
- visually meaningful on its own
- not dependent on raster tricks
- not nested in a way that makes GSAP targeting brittle

## Good SVG Production Habits

- keep shapes separated if they animate separately
- merge shapes only when they truly belong together
- name things early, not after the fact
- avoid generic names like `rect1`, `path7`, `group12`
- keep status dot and activity zone obvious

## Placeholder Build Guidance

Before production art exists, placeholder rooms should still obey this contract.
That way the pipeline can be tested early with:
- room boxes
- simple props
- placeholder characters
- real state changes

## Deliverable Definition

A production-ready room SVG is complete when:
- it matches the 200x160 format
- all required IDs are present
- top layers are named properly
- animation targets are isolated
- no forbidden SVG features are used
- room state cues can be driven by GSAP without structural edits

## Summary

The SVG contract exists so art can become software cleanly.
If the naming and layer discipline are right, the animation pipeline stays sane.
If they drift, everything downstream gets annoying fast.
