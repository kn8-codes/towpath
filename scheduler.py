import redis
import json
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [TOWPATH] %(message)s'
)

REDIS_HOST = "100.88.95.40"
REDIS_PORT = 6379
CHANNEL = "towpath:tasks"

def main():
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    pubsub = r.pubsub()
    pubsub.subscribe(CHANNEL)

    logging.info(f"Scheduler online — listening on {CHANNEL}")

    for message in pubsub.listen():
        if message["type"] != "message":
            continue
        try:
            payload = json.loads(message["data"])
            task_id = payload.get("task", {}).get("task_id", "unknown")
            sender = payload.get("sender", "unknown")
            job_type = payload.get("task", {}).get("job_type", "unknown")
            logging.info(f"TASK RECEIVED | id={task_id} sender={sender} job={job_type}")
        except Exception as e:
            logging.error(f"Bad message: {e}")

if __name__ == "__main__":
    main()

