# ROOMS — Character and Pose Rules

## Purpose

This document defines how characters should be designed and posed inside ROOMS.

Characters are not just decoration.
They are the visible embodiment of agent behavior.

## Character Function

Each character should help communicate:
- who belongs to the room
- what kind of work the room does
- what state the room is currently in

## Character Style

Characters should follow a Toca Boca-inspired logic:
- oversized heads
- compact bodies
- minimal faces
- chunky limbs
- high silhouette readability
- simple expressive poses

## Construction Rules

### Head
- shape: oblong ellipse
- taller than wide
- target proportion: `rx=44 ry=54`
- fill: `#FFDAB8`
- stroke: `#111`
- stroke width should read as bold black linework
- head should sit directly on the vest body
- no neck element

### Body
- compact and simplified
- more like a toy or sticker body than an anatomical one
- vest body should read as a skinnier oblong ellipse
- target vest proportion: `rx=36 ry=42`

### Arms and hands
- arm construction should use thick stroke paths
- target stroke width: `13` to `14`
- arm stroke color: `#111`
- hands end as filled circles
- hand fill: `#FFDAB8`
- enough shape to read gesture
- not realistic

### Legs and feet
- short and stable
- good visual grounding
- simple shoe shapes preferred

## Facial Rules

### Eyes
- M4 and M1 use large googly-eye construction
- white sclera
- purple iris
- dark pupil
- two visible catchlights
- eyes should still remain readable and not become hyper-detailed
- face read should feel tastefully googly and slightly worried

### Mouth
- O-shaped mouth by default for the locked worried/confused expression set
- open oval, no teeth
- outer ellipse: `#111`
- inner ellipse: `#c0605a`
- no teeth on any character

### Brows
- worried brows angled inward for M4 and M1
- simple, readable, and slightly exaggerated
- JEEP has no visible eyebrows

### Nose
- omit or imply lightly

### Cheeks
- cheeks are currently not shown in the latest locked production pass
- flagged to add back later

### JEEP exception
- JEEP uses large round dark sunglasses instead of visible eyes
- sunglasses should include visible glare
- no visible eyebrows
- mouth and cheek blush remain consistent with the shared expression system

## Hair Rules

Hair should be designed as silhouette mass, not strand detail.
The room should still read if the character is tiny.

## Character Uniform

All characters share a unified base outfit system.
This is now a locked visual decision.

### Carhartt watch cap
Every character wears a Carhartt-style watch cap.

Color and construction:
- crown: tapered path, wider at base and narrower at top like a real beanie
- crown fill: `#7A4A1A`
- crown stroke: `#111`
- cuff: wide rounded rect pulled down over forehead
- cuff fill: `#5C3210`
- cuff stroke: `#111`
- patch: centered on cuff
- patch border: `#F5F0E8`
- patch fill: `#C8860A`
- no text on patch

Design rules:
- cap should read clearly at small scale
- crown should taper visibly, not just slightly
- cuff should be chunky and obvious
- patch should be centered and visible but simple

### Carhartt brown vest
Every character wears a Carhartt-style brown vest.

Color and construction:
- vest body fill: `#7A4A1A`
- two front panels: lighter brown `#8B5520`
- center seam line
- lapel curves at top
- no chest pocket

Design rules:
- vest silhouette should read fast
- lapels should help the vest read clearly at small scale
- front panel contrast should stay visible but simple
- do not add a chest pocket
- vest should unify the fleet visually across different rooms

## Face and Expression Rules

### Shared emotional tone
All characters should have a tastefully googly, slightly confused or worried energy.
This is a core part of the visual personality.
All strokes should be black.

### M4 face rules
M4 character has large googly eyes with:
- white sclera ellipse: `rx=16 ry=17`, stroke `#111`
- iris: `rx=11 ry=11`, fill `#7C3AED`
- pupil: `rx=6 ry=6`, fill `#111`
- large catchlight: `r=4`, fill white
- small catchlight: `r=2`, fill white
- worried brows angled down toward center, stroke `#111`
- seat color: `#7C3AED`
- O-shaped mouth, no teeth

### M1 face rules
M1 character uses the same eye construction as M4 with:
- white sclera ellipse: `rx=16 ry=17`, stroke `#111`
- iris: `#7C3AED`
- pupil: `#111`
- large and small catchlights
- same worried brows as M4
- sweat drop removed
- no green circles on hat
- seat color: `#0F766E`
- O-shaped mouth, no teeth

### JEEP face rules
JEEP character has:
- two large round sunglass lens ellipses: `rx=18 ry=16`
- lens fill: `#1A271A`
- lens stroke: `#111`, stroke-width `3.5`
- bridge between lenses: stroke-width `4`
- arms from outer lens edges: stroke-width `3.5`
- glare: curved white arc top-left of each lens plus small white dot at `opacity="0.85"`
- no visible eyebrows
- same O-shaped mouth
- one hand on wheel, with right arm curving toward steering wheel
- seat color: `#2D3B2D`
- no teeth

## Outfit Rules

The uniform system is shared, but each character should still support the room logic.

### M4 character
- control-room operator vibe
- focused, tidy, command posture
- same uniform, but palette-compatible details can lean purple / pink / blue where needed

### M1 character
- work-ready, industrial, sleeves-up energy
- busy and mid-task
- same uniform, but room energy should still read workshop-first

### Jeep character
- field/mobile/operator-driver energy
- chill but capable
- same uniform, but silhouette should work seated behind wheel with sunglasses as the key face cue

## Pose States

### Idle
The character is present and alive but relaxed.
Examples:
- seated
- leaning
- arms crossed
- hand resting on console or wheel

### Active
The character is engaged.
Examples:
- eyes alert
- body leaning into task
- one arm moving
- torso angle slightly more dynamic

### Receiving
The character reacts to an incoming event.
Examples:
- head turn
- arm lift
- surprise cue
- glance to message slot or signal area

### Working
The character is clearly occupied.
Examples:
- typing
- reaching
- adjusting dials
- stirring, tightening, monitoring, steering

### Down
The character should not feel active.
Options:
- absent from the immediate focal action
- slumped/still
- obscured by room-state cues
- represented as unavailable in a low-motion way

## Pose Quality Rules

Characters should feel:
- alive
- a little bouncy
- readable in one glance
- expressive without complicated anatomy

They should not feel:
- stiff mannequin-like
- over-animated
- anatomically fussy
- dramatic in a way that breaks the room mood

## Silhouette Test

If the fill were solid black, you should still be able to tell:
- where the head is
- what the body is doing
- whether the character is sitting, standing, working, or driving

If not, the pose is too weak or too detailed.

## Towpath Character Rule

The character should never compete with the room’s function.
The character and room should reinforce each other.

Examples:
- M4 operator and desk/screens form one visual unit
- M1 worker and machine/workbench form one visual unit
- Jeep driver and steering/dashboard form one visual unit

## Production Rule

Keep characters simple enough that:
- Everly can design them conceptually
- Inkscape cleanup stays manageable
- GSAP can animate small parts without breaking the silhouette

## Summary

A good ROOMS character is:
- simple
- distinct
- readable
- expressive
- tightly matched to the room’s job
