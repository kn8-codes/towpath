# ROOMS — Overview

**Version:** 1.0 (Spec)  
**Status:** Design phase  
**Codename:** ROOMS

## Concept

Each node and agent gets a "room", a Toca Boca-inspired illustrated SVG scene. The rooms are not decorative wrappers. They are the main visual layer for understanding the fleet.

Each room is alive.
Each room responds to real TOWPATH data.
Each room makes agent behavior legible to non-technical people.

The product goal is simple:

Anyone should be able to look at ROOMS and understand what the fleet is doing without needing to know anything about agents, protocols, message buses, or infrastructure.

That makes ROOMS both:
- a serious operator-facing demo layer
- and a genuinely playful collaborative art/product surface

A major part of the concept is that Everly designs the art direction and characters, while the pipeline turns those designs into live animated software.

This is not a fake concept deck.
This is intended as a real product demo and a real product surface.

## Core Product Idea

Every node becomes a place.
Every agent becomes a character.
Every system state becomes a visible room behavior.

Instead of exposing the fleet as:
- tables
- logs
- queues
- terminals
- cards with generic status pills

ROOMS exposes the fleet as:
- inhabited illustrated spaces
- characters doing work
- lights, activity zones, objects, and room state responding to live data

## Why ROOMS Exists

### 1. It makes distributed agents legible
Most agent systems are still hard to read unless you already know the stack.
ROOMS makes the state visible in plain human terms.

### 2. It gives the system identity
Capability is not enough. Visual identity and emotional readability matter.
A fleet with character is easier to remember, easier to demo, and easier to trust.

### 3. It creates a demo surface people instantly understand
If a room lights up, a character starts moving, and an activity zone kicks in, people understand something is happening.
That is much more intuitive than explaining queue workers and task states.

### 4. It is genuinely fun
That matters.
If the system is fun to look at and fun to build, it gets used more and explained better.

## High-level Structure

ROOMS sits on top of infrastructure that already exists or is in progress:
- TOWPATH message flow
- `bridge.py`
- Supabase state layer
- dashboard shell in SvelteKit
- GSAP animation layer
- SVG production workflow through Inkscape / inkscape-mcp

ROOMS is not replacing the infrastructure.
It is the visual layer that makes the infrastructure visible.

## Room Map

| Node | Room Theme | Vibe |
|---|---|---|
| M4 | Control room | Screens, dials, command center energy |
| M1 | Kitchen / workshop | Busy, industrial, things happening |
| Jeep | Garage / car interior | Field node, always on the road |

## Character Model

Each agent inside a node gets a character placed into that room.
Character design is driven by Everly’s drawings, descriptions, and aesthetic choices.

That means the product should preserve:
- hand-drawn logic where possible
- playful silhouette clarity
- strong personality cues
- readable emotional states
- child-originated ideas that still survive production cleanup

## Product Thesis

ROOMS is the layer that makes kn8-built agents understandable, memorable, and demoable.

The system underneath can be powerful.
But power alone does not sell.
Power plus visual clarity plus character does.

## Short Version

ROOMS is a live illustrated fleet dashboard where each node is a room, each agent is a character, and every state change becomes visible animation.

## Current Open Questions

- Does each agent get its own room, or do agents share a node room?
- Should rooms be navigable, click to zoom in, or all visible at once?
- Does Everly want to name the agents?

## Immediate Recommended Next Step

- Build Phase 1 placeholder rooms
- Schedule design session with Everly


## Resolved Direction (2026-04-23)

- each agent gets its own room
- rooms should be navigable
- Everly wants to give agents nicknames
- working operator labels should still keep `m4`, `m1`, and `jeep` visible for now
