<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { supabase } from '$lib/supabase'

  const tasks = writable([])

  onMount(async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('received_at', { ascending: false })
      .limit(50)
    tasks.set(data || [])

    setInterval(async () => {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('received_at', { ascending: false })
        .limit(50)
      tasks.set(data || [])
    }, 3000)
  })
</script>

<main>
  <header>
    <div class="header-top">
      <div>
        <h1>⚡ TOWPATH</h1>
        <span class="subtitle">OpenClaw Fleet</span>
      </div>
      <nav class="nav-links">
        <a href="/rooms.html">Open ROOMS Demo</a>
      </nav>
    </div>
  </header>

  <section class="nodes">
    {#each ['m4', 'm1', 'jeep'] as node}
      <div class="node-card">
        <div class="node-name">{node}</div>
        <div class="node-status">
          {$tasks.find(t => t.sender === node) ? '● online' : '○ no signal'}
        </div>
        <div class="last-task">
          {#if $tasks.find(t => t.sender === node)}
            last: {$tasks.find(t => t.sender === node).job_type}
          {/if}
        </div>
      </div>
    {/each}
  </section>

  <section class="feed">
    <h2>Live Feed</h2>
    {#each $tasks as task}
      <div class="task-row">
        <span class="sender">{task.sender}</span>
        <span class="job">{task.job_type}</span>
        <span class="status">{task.status}</span>
        <span class="time">{new Date(task.received_at).toLocaleTimeString()}</span>
      </div>
    {/each}
  </section>
</main>

<style>
  :global(body) {
    background: #0a0a0a;
    color: #e0e0e0;
    font-family: 'Courier New', monospace;
    margin: 0;
  }

  main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  .header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    color: #00ff88;
  }

  .subtitle {
    color: #666;
    font-size: 0.9rem;
  }

  .nav-links a {
    color: #00ff88;
    text-decoration: none;
    font-size: 0.9rem;
    border: 1px solid #1f3;
    padding: 0.55rem 0.8rem;
    border-radius: 4px;
    display: inline-block;
  }

  .nav-links a:hover {
    background: #0f1a12;
  }

  .nodes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .node-card {
    background: #111;
    border: 1px solid #222;
    border-radius: 4px;
    padding: 1rem;
  }

  .node-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00ff88;
    text-transform: uppercase;
  }

  .node-status {
    color: #666;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }

  .last-task {
    color: #444;
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }

  .feed h2 {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }

  .task-row {
    display: grid;
    grid-template-columns: 80px 1fr 100px 100px;
    padding: 0.5rem;
    border-bottom: 1px solid #111;
    font-size: 0.85rem;
  }

  .task-row:hover {
    background: #111;
  }

  .sender {
    color: #00ff88;
  }

  .job {
    color: #ccc;
  }

  .status {
    color: #666;
  }

  .time {
    color: #444;
    text-align: right;
  }
</style>
