# TOWPATH

Inter-agent message bus for the OpenClaw fleet.

## What it is

TOWPATH is a Redis Pub/Sub messaging protocol for task dispatch across three physical nodes:
- **M4** — MacBook Air M4, control tower
- **M1** — MacBook Pro M1, heavy worker / dispatcher
- **Jeep** — 2017 MacBook Air i7, field node

## Stack

- Redis Pub/Sub on M1 (Tailscale IP: 100.88.95.40)
- Python scheduler + bridge
- Supabase for task logging (project: rmvnvrgnfsmdgbrawrnr)
- SvelteKit dashboard at /dashboard
- All nodes connected via Tailscale mesh

## Running

**Scheduler (M1):**
```bash
python3 ~/projects/towpath/scheduler.py
```

**Bridge (M1):**
```bash
python3 ~/projects/towpath/bridge.py
```

**Dashboard (M1):**
```bash
cd ~/projects/towpath/dashboard && npm run dev
```

**Test publish (any node):**
```bash
redis-cli -h 100.88.95.40 PUBLISH towpath:tasks '{"towpath_version":"1.0","message_id":"test-001","message_type":"task","sender":"m4","timestamp_utc":"2026-04-23T00:00:00Z","task":{"task_id":"task-001","job_type":"test_ping","params":{}},"context":{}}'
```

## Specs

- [TOWPATH-SPEC-v1.md](./TOWPATH-SPEC-v1.md) — protocol spec
- [ROOMS-SPEC-v1.md](./ROOMS-SPEC-v1.md) — agent spatial dashboard spec

## Status

Bus is live and tested across all three nodes. Dashboard polling working. ROOMS in design phase.


