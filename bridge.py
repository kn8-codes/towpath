import redis
import json
import logging
from datetime import datetime, timezone
from supabase import create_client

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [BRIDGE] %(message)s'
)

REDIS_HOST = "100.88.95.40"
REDIS_PORT = 6379
CHANNEL = "towpath:tasks"

SUPABASE_URL = "https://rmvnvrgnfsmdgbrawrnr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdm52cmduZnNtZGdicmF3cm5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjkyMTg3MiwiZXhwIjoyMDkyNDk3ODcyfQ.AHtL2173WWZOgzCJ8pgP2_S5vzLrZ9xMl48BVU_jpq8"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def handle_message(payload):
    msg = json.loads(payload)
    msg_type = msg.get("message_type", "task")

    if msg_type == "heartbeat":
        supabase.table("heartbeats").insert({
            "sender": msg.get("sender"),
            "agent_id": msg.get("agent_id"),
            "uptime_seconds": msg.get("uptime_seconds"),
            "ts": datetime.now(timezone.utc).isoformat()
        }).execute()
        logging.info(f"HEARTBEAT | sender={msg.get('sender')}")

    else:
        task = msg.get("task", {})
        supabase.table("tasks").insert({
            "task_id": task.get("task_id"),
            "message_id": msg.get("message_id"),
            "sender": msg.get("sender"),
            "job_type": task.get("job_type"),
            "params": task.get("params", {}),
            "context": msg.get("context", {}),
            "status": "received",
            "received_at": datetime.now(timezone.utc).isoformat()
        }).execute()
        logging.info(f"TASK | id={task.get('task_id')} sender={msg.get('sender')} job={task.get('job_type')}")

def main():
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    pubsub = r.pubsub()
    pubsub.subscribe(CHANNEL)
    logging.info(f"Bridge online — listening on {CHANNEL}")

    for message in pubsub.listen():
        if message["type"] != "message":
            continue
        try:
            handle_message(message["data"])
        except Exception as e:
            logging.error(f"Error: {e}")

if __name__ == "__main__":
    main()
