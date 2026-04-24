# ROOMS — Visual Style Reference

## Style Direction

ROOMS should use a Toca Boca-inspired illustrated style adapted for SVG-based live product scenes.

That means:
- flat fills
- chunky outlines
- rounded geometry
- simplified facial features
- strong silhouette readability
- warm, toy-like environments
- visual friendliness without losing operational clarity

This is not a direct copy of Toca Boca assets.
It is a style direction based on the same family of decisions.

## Core Aesthetic Qualities

The rooms should feel:
- playful
- warm
- lived in
- readable
- characterful
- low-threat
- operational rather than decorative

They should not feel:
- cyberpunk noisy
- glossy enterprise
- sterile dashboard UI
- pixel-art retro
- over-rendered or painterly

## Reference Roles from Provided Images

### Reference group A — cozy room interiors
These references teach:
- furniture balance
- prop clustering
- shelf composition
- wall/floor division
- cozy lived-in logic

### Reference group B — Toca ensemble character scenes
These references teach:
- character family consistency
- outline behavior
- palette discipline
- expression simplicity
- global tone

### Reference group C — action/platform scenes
These references teach:
- light pose energy
- mid-motion readability
- station-like composition
- modular scene chunks

### Reference group D — clean hero/character vignettes
These references teach:
- front-facing body model
- neutral idle stance
- head/body proportions
- facial construction
- silhouette clarity

## Linework Rules

### Outlines
- thick, dark, consistent outer outlines
- inner details lighter in density, not necessarily thinner everywhere, but used more sparingly
- curves should feel hand-friendly, not mathematically sterile

### Corners
- rounded corners everywhere practical
- avoid sharp jagged geometry unless used intentionally for a prop like a machine tooth or tool edge

### Detail density
- low to medium detail
- enough to identify props immediately
- not enough to turn small elements muddy

## Fill Rules

- flat fills only
- no gradients
- no texture fills in production SVGs unless simulated through simple shapes
- local contrast should come from shape adjacency and palette choices, not rendering tricks

## Shape Language

Preferred shapes:
- ovals
- rounded rectangles
- soft capsules
- squat circles
- blobby organic forms for soft props
- chunky simplified rectangles for machines and furniture

Avoid:
- thin delicate shapes that disappear at dashboard scale
- tiny fiddly ornament that adds no meaning
- sharp mechanical complexity unless simplified into toy-world form

## Palette Rules

ROOMS should use a controlled palette per node.
Each room gets a locked dominant family.

### M4 palette
Primary palette:
- background: `#F9A8D4`
- wall: `#FCE7F3`
- floor: `#EC4899`
- floor edge: `#DB2777`
- surfaces: `#BE185D`, `#9D174D`
- screen dark: `#1a0a12`

Visual read:
- pastel pink / deep pink control room
- bright but controlled command-center candy palette
- room should feel playful, polished, and highly readable

### M1 palette
Primary palette:
- background: `#4C1D95`
- wall: `#EDE9FE`
- floor: `#4C1D95`
- floor edge: `#3B0764`
- surfaces: `#6D28D9`, `#2e1065`
- screen dark: `#1E1033`

Material accent:
- wood workbench top: `#92400E`
- wood workbench legs: `#78350F`

Visual read:
- dark purple / light purple workshop
- heavier and more grounded than M4
- wood workbench is a required material cue, not optional flavor

### JEEP palette
Primary palette:
- background: `#1C2B1C`
- pillars: `#1A271A`
- header: `#2D3B2D`
- windshield frame: `#4B6B4B`
- dashboard: `#2D3B2D`, `#1A271A`
- accent: `#6EE7B7`
- tinted windshield overlay: `#0A1A0A` at 40% opacity

Visual read:
- dark green / grey / black cockpit
- enclosed, field-ready, dashboard-first mood
- tinted windshield is mandatory
- room must support 5 weather states as part of the locked design

### Global rules
- each room gets one locked dominant palette family
- all strokes are black
- supporting props can add small accent variety, but should stay inside the room’s palette logic
- status indicators should read clearly against the room palette
- keep background lower contrast than the working focal zone
- black and white cats may appear randomly in M4 and M1 only
- black and white cats must NEVER appear in JEEP
- JEEP must support 5 weather states: evening, sunny, deep night, rain, snow
- do not drift from the locked palette or room identity without explicit approval once production art begins

## Character Construction Rules

### Proportions
- oversized head
- compact torso
- short limbs
- readable feet
- body designed for clarity, not realism

### Faces
- simple dot or bean eyes
- tiny brows or simple brow shapes if needed
- minimal nose, often omitted or implied
- tiny mouth with a few clear expression variants

### Hair
- silhouette-first
- big shapes over tiny strands
- readable from far away

### Hands
- simplified mitt, nub, or tiny rounded form
- no realistic finger detail unless heavily abstracted

## Pose Rules

### Idle pose
Should feel alive but calm.
Examples:
- seated at desk
- standing with arms folded
- leaning lightly into station
- hand on wheel

### Active pose
Should suggest engagement without requiring frame-by-frame complexity.
Examples:
- tapping controls
- looking at screen
- stirring, tightening, adjusting, driving

### Emotional readability
The pose should help state readability.
If the room is working, the character should not look asleep.
If the room is down, the room should feel inactive even if the character is still visible.

## Room Composition Rules

Every room should have:
- one primary work zone
- one secondary support zone
- one personality zone
- one clear character anchor position
- clear wall/floor separation
- readable negative space

## Prop Density Rules

Ideal target:
- 5 to 12 meaningful props per room

Each prop should do one of three jobs:
- explain function
- support character
- add personality

If a prop does none of those, it probably should not be in the room.

## Towpath-specific Visual Rule

Every room should answer four questions visually:
- who works here
- what kind of work happens here
- what state the room is in
- where the viewer should look first

## Summary

The ROOMS style should be understood as:

friendly operational dioramas in a Toca Boca-inspired SVG language

That is the target.
