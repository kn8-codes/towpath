# ROOMS — State Mapping Draft

## Purpose

This document roughs out how live TOWPATH data should map into ROOMS state changes.

This is a draft because the exact message envelope and Supabase shape may still evolve.

## Current Pipeline Assumption

```text
TOWPATH event
  → bridge.py
  → Supabase tasks/state table
  → dashboard polling or realtime update
  → room state resolver
  → GSAP animation trigger
```

## Node Mapping

### M4 room
Represents:
- control tower node
- orchestration / command activity
- strategic / dispatch-oriented work

### M1 room
Represents:
- heavy worker node
- industrial batch processing
- longer-running jobs

### Jeep room
Represents:
- field node
- mobile continuity
- lighter field-friendly execution

## Event Categories Needed

The room resolver should eventually understand at least these categories:
- heartbeat
- task received
- task acknowledged
- task started
- task finished
- task failed
- node stale/offline

## Cat Idle Behavior

Cats are part of the idle-state behavior system.

### Black cat
- body: loaf ellipse, fill `#111`, stroke `#222`
- head: circle, fill `#111`
- ears: triangle polygons with pink inner `#F9A8D4`
- eyes: green `#4ADE80` with black pupil and white catchlight
- nose: `#F9A8D4` ellipse
- whiskers: light grey lines
- tail: curved stroke path, stroke-width `5-6`, fill `#111`

### White cat
- same construction as black cat
- fill: `#F0F0F0`
- stroke: `#DDD`
- eyes: blue `#60A5FA`
- inner ears: `#F9A8D4`
- whiskers: `#CCC`

### Cat placement rules
- M4: desk surface or floor
- M1: workbench surface or floor
- JEEP: never
- cats appear randomly and are driven by idle-state animation
- both cats can appear simultaneously in the same room
- cat spawn is a GSAP idle animation trigger

## Draft State Mapping

### idle
Trigger when:
- node heartbeat is healthy
- no active task currently running
- no recent receive event in progress
- optional ambient idle behaviors are allowed, including cat spawn in M4 and M1 only

### active
Trigger when:
- node heartbeat is healthy
- node has recent live activity
- room should look engaged even if not deep in a long-running work loop

### receiving
Trigger when:
- a new task/message arrives for that node
- this should be temporary and short-lived

### working
Trigger when:
- node has an active task in progress
- task status indicates execution, not just receipt

### down
Trigger when:
- heartbeat stale beyond threshold
- node explicitly reports down/unavailable
- dashboard loses trusted signal beyond timeout

## Suggested Transition Logic

### idle → receiving
When a fresh inbound task is detected.

### receiving → working
If the task is accepted and execution begins.

### receiving → active
If an event arrives but no longer-running task loop follows.

### working → active
If work completed recently and the node is still busy/alive.

### active → idle
If recent activity ages out and no task remains active.

### any → down
If heartbeat timeout or explicit node-down signal occurs.

### down → idle or active
When heartbeat returns and the room is considered healthy again.

## Timing Suggestions

These are placeholders for Phase 1 and can be tuned later.

### receiving state duration
- 0.8s to 2s visual event

### activity freshness window
- 10s to 30s depending on polling cadence

### down threshold
- more than 10 minutes since heartbeat, per current rough concept

## Data Fields Likely Needed

Room resolver probably needs:
- `node`
- `status`
- `job_type`
- `task_id`
- `timestamp`
- `heartbeat_at`
- `last_event_type`
- `active_task_count`

## Phase 1 Recommendation

During placeholder implementation, do not overcomplicate the resolver.
Use a simple deterministic priority model:

1. if heartbeat stale → `down`
2. else if active task exists → `working`
3. else if recent inbound event exists → `receiving`
4. else if recent activity exists → `active`
5. else → `idle`

This is good enough for a first real pass.

## Why This Matters

If the state mapping is fuzzy, the rooms will feel fake.
If the state mapping is crisp, even simple placeholder art will feel alive.
