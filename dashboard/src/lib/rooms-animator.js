/**
 * TOWPATH — ROOMS Animator
 * rooms-animator.js
 *
 * Usage:
 *   import { setRoomState } from './rooms-animator.js'
 *   setRoomState('m4', 'active')
 *   setRoomState('m1', 'working')
 *   setRoomState('jeep', 'receiving')
 *
 * States: idle | active | working | receiving | down
 * Nodes:  m4   | m1     | jeep
 *
 * Requires GSAP 3.x loaded globally or imported before this module.
 */

// ─── State registry ──────────────────────────────────────────────────────────
const nodeStates = { m4: 'idle', m1: 'idle', jeep: 'idle' }
const activeTimelines = {}

// ─── Utility ─────────────────────────────────────────────────────────────────
const q = (id) => document.getElementById(id)
const g = () => window.gsap

function killNode(node) {
  if (activeTimelines[node]) {
    activeTimelines[node].forEach(t => t.kill())
    activeTimelines[node] = []
  }
  g().killTweensOf(`[id*="${node}"]`)
}

function register(node, tl) {
  if (!activeTimelines[node]) activeTimelines[node] = []
  activeTimelines[node].push(tl)
}

// ─── Public API ──────────────────────────────────────────────────────────────
export function setRoomState(node, state) {
  if (!window.gsap) {
    console.warn('[rooms-animator] GSAP not loaded')
    return
  }
  nodeStates[node] = state
  killNode(node)

  // Update status dot
  const dotColors = {
    m4:   { idle: '#F9A8D4', active: '#F472B6', working: '#EC4899', receiving: '#FDE68A', down: '#6b21a8' },
    m1:   { idle: '#C4B5FD', active: '#A78BFA', working: '#7C3AED', receiving: '#FDE68A', down: '#3B0764' },
    jeep: { idle: '#6EE7B7', active: '#34D399', working: '#10B981', receiving: '#FDE68A', down: '#1A271A' },
  }
  const dot = q(`status-${node}`)
  if (dot) g().to(dot, { attr: { fill: dotColors[node][state] }, duration: 0.4 })

  // Dispatch to per-node handler
  const handlers = { m4: animateM4, m1: animateM1, jeep: animateJeep }
  if (handlers[node]) handlers[node](state)
}

export function getNodeState(node) {
  return nodeStates[node]
}

// ─── M4 Animations ───────────────────────────────────────────────────────────
function animateM4(state) {
  const gsap = g()

  // Reset everything first
  gsap.to(['#bar-m4-1a','#bar-m4-1b','#bar-m4-1c','#bar-m4-1d','#bar-m4-1e','#bar-m4-1f'], { scaleY: 1, transformOrigin: 'bottom', duration: 0.3 })
  gsap.to(['#prog-m4-2a','#prog-m4-2b','#prog-m4-2c','#prog-m4-3a','#prog-m4-3b','#prog-m4-3c'], { scaleX: 1, transformOrigin: 'left', duration: 0.3 })
  gsap.to('#agent-operator', { opacity: 1, y: 0, duration: 0.3 })
  gsap.to('#msg-m4', { opacity: 0, y: 0, duration: 0.2 })
  gsap.to('#slot-m4', { opacity: 0, duration: 0.2 })
  gsap.to(['#arm-m4-l','#hand-m4-l','#arm-m4-r','#hand-m4-r'], { y: 0, duration: 0.2 })
  gsap.to('#straw-m4', { rotation: 0, transformOrigin: 'bottom center', duration: 0.2 })

  if (state === 'idle') {
    // Gentle breathing bob
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to('#agent-operator', { y: -3, duration: 2, ease: 'sine.inOut' })
    // Bar chart subtle pulse
    const tl2 = gsap.timeline({ repeat: -1 })
    tl2.to(['#bar-m4-1a','#bar-m4-1c','#bar-m4-1e'], { scaleY: 0.7, transformOrigin: 'bottom', duration: 1.5, ease: 'sine.inOut', stagger: 0.2 })
      .to(['#bar-m4-1a','#bar-m4-1c','#bar-m4-1e'], { scaleY: 1, transformOrigin: 'bottom', duration: 1.5, ease: 'sine.inOut', stagger: 0.2 })
    register('m4', [tl, tl2])
  }

  else if (state === 'active') {
    // Bar chart animates actively
    const tl = gsap.timeline({ repeat: -1 })
    const bars = ['#bar-m4-1a','#bar-m4-1b','#bar-m4-1c','#bar-m4-1d','#bar-m4-1e','#bar-m4-1f']
    tl.to(bars, { scaleY: () => 0.3 + Math.random() * 0.9, transformOrigin: 'bottom', duration: 0.4, stagger: 0.06, ease: 'power1.inOut' })
      .to(bars, { scaleY: () => 0.3 + Math.random() * 0.9, transformOrigin: 'bottom', duration: 0.4, stagger: 0.06, ease: 'power1.inOut' })
    // Progress bars fill and refill
    const tl2 = gsap.timeline({ repeat: -1 })
    tl2.to(['#prog-m4-2a','#prog-m4-3a'], { scaleX: 0.3, transformOrigin: 'left', duration: 0.8 })
       .to(['#prog-m4-2a','#prog-m4-3a'], { scaleX: 1, transformOrigin: 'left', duration: 1.2 })
    // Agent engaged lean
    const tl3 = gsap.timeline({ repeat: -1, yoyo: true })
    tl3.to('#agent-operator', { y: -5, duration: 0.6, ease: 'power1.inOut' })
    register('m4', [tl, tl2, tl3])
  }

  else if (state === 'working') {
    // Arms type rapidly
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(['#arm-m4-l','#hand-m4-l'], { y: -6, duration: 0.12, ease: 'steps(1)' })
      .to(['#arm-m4-l','#hand-m4-l'], { y: 0, duration: 0.12, ease: 'steps(1)' })
      .to(['#arm-m4-r','#hand-m4-r'], { y: -6, duration: 0.12, ease: 'steps(1)' }, '-=0.12')
      .to(['#arm-m4-r','#hand-m4-r'], { y: 0, duration: 0.12, ease: 'steps(1)' })
    // All bars max activity
    const tl2 = gsap.timeline({ repeat: -1 })
    tl2.to(['#bar-m4-1a','#bar-m4-1b','#bar-m4-1c','#bar-m4-1d','#bar-m4-1e','#bar-m4-1f'],
      { scaleY: () => 0.5 + Math.random(), transformOrigin: 'bottom', duration: 0.25, stagger: 0.04 })
    // Progress bars sweep
    const tl3 = gsap.timeline({ repeat: -1 })
    tl3.to(['#prog-m4-2a','#prog-m4-2b','#prog-m4-2c','#prog-m4-3a','#prog-m4-3b','#prog-m4-3c'],
      { scaleX: 0.1, transformOrigin: 'left', duration: 0.6, stagger: 0.1 })
       .to(['#prog-m4-2a','#prog-m4-2b','#prog-m4-2c','#prog-m4-3a','#prog-m4-3b','#prog-m4-3c'],
      { scaleX: 1, transformOrigin: 'left', duration: 0.8, stagger: 0.1 })
    register('m4', [tl, tl2, tl3])
  }

  else if (state === 'receiving') {
    // Mail slot opens, message drops in
    gsap.to('#slot-m4', { opacity: 1, duration: 0.2 })
    gsap.to('#msg-m4', { opacity: 1, y: 16, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 })
    // Agent looks up (head bob)
    const tl = gsap.timeline()
    tl.to('#head-m4', { y: -8, duration: 0.2, ease: 'power2.out' })
      .to('#head-m4', { y: 0, duration: 0.4, ease: 'bounce.out' })
    // Activity dots flash
    const tl2 = gsap.timeline({ repeat: 4 })
    tl2.to(['#activity-m4-1','#activity-m4-2','#activity-m4-3'], { opacity: 1, scale: 1.5, transformOrigin: 'center', duration: 0.15, stagger: 0.08 })
       .to(['#activity-m4-1','#activity-m4-2','#activity-m4-3'], { opacity: 0.4, scale: 1, duration: 0.15, stagger: 0.08 })
    register('m4', [tl, tl2])
  }

  else if (state === 'down') {
    // Darken — monitors go dark
    gsap.to(['#bar-m4-1a','#bar-m4-1b','#bar-m4-1c','#bar-m4-1d','#bar-m4-1e','#bar-m4-1f'],
      { opacity: 0, duration: 1 })
    gsap.to(['#prog-m4-2a','#prog-m4-2b','#prog-m4-2c','#prog-m4-3a','#prog-m4-3b','#prog-m4-3c'],
      { opacity: 0, duration: 1 })
    gsap.to('#agent-operator', { opacity: 0.2, duration: 1.5 })
    gsap.to('#lamp-m4', { attr: { fill: '#333' }, duration: 0.8 })
    gsap.to('#readout-m4-1', { scaleX: 0, transformOrigin: 'left', duration: 0.6 })
  }
}

// ─── M1 Animations ───────────────────────────────────────────────────────────
function animateM1(state) {
  const gsap = g()

  // Reset
  gsap.to('#agent-worker', { opacity: 1, y: 0, duration: 0.3 })
  gsap.to(['#arm-m1-l','#hand-m1-l','#arm-m1-r','#hand-m1-r'], { y: 0, duration: 0.2 })
  gsap.to('#msg-m1', { opacity: 0, y: 0, duration: 0.2 })
  gsap.to('#slot-m1', { opacity: 0, duration: 0.2 })
  gsap.to(['#prog-m1-2a','#prog-m1-2b','#prog-m1-2c','#prog-m1-3a','#prog-m1-3b','#prog-m1-3c'],
    { scaleX: 1, opacity: 1, transformOrigin: 'left', duration: 0.3 })
  gsap.to('#steam-m1-1, #steam-m1-2', { opacity: 1, duration: 0.3 })

  if (state === 'idle') {
    // Gentle bob
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to('#agent-worker', { y: -2, duration: 2.5, ease: 'sine.inOut' })
    // Steam wisps
    const tl2 = gsap.timeline({ repeat: -1 })
    tl2.to('#steam-m1-1', { y: -4, opacity: 0, duration: 1.2, ease: 'power1.out' })
       .to('#steam-m1-1', { y: 0, opacity: 1, duration: 0 })
    const tl3 = gsap.timeline({ repeat: -1, delay: 0.6 })
    tl3.to('#steam-m1-2', { y: -4, opacity: 0, duration: 1.2, ease: 'power1.out' })
       .to('#steam-m1-2', { y: 0, opacity: 1, duration: 0 })
    register('m1', [tl, tl2, tl3])
  }

  else if (state === 'active') {
    // Progress bars fill
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(['#prog-m1-2a','#prog-m1-3a'], { scaleX: 0.2, transformOrigin: 'left', duration: 0.8 })
       .to(['#prog-m1-2a','#prog-m1-3a'], { scaleX: 1, transformOrigin: 'left', duration: 1.2 })
    // Waveform offset
    const tl2 = gsap.timeline({ repeat: -1 })
    tl2.to('#wave-m1', { x: -8, duration: 0.4, ease: 'none' })
       .to('#wave-m1', { x: 0, duration: 0.4, ease: 'none' })
    // Worker active
    const tl3 = gsap.timeline({ repeat: -1, yoyo: true })
    tl3.to('#agent-worker', { y: -5, duration: 0.5, ease: 'power1.inOut' })
    register('m1', [tl, tl2, tl3])
  }

  else if (state === 'working') {
    // Waveform rapid scroll
    const tl = gsap.timeline({ repeat: -1 })
    tl.to('#wave-m1', { x: -20, duration: 0.3, ease: 'none' })
       .to('#wave-m1', { x: 0, duration: 0 })
    // All progress bars sweeping
    const tl2 = gsap.timeline({ repeat: -1 })
    tl2.to(['#prog-m1-2a','#prog-m1-2b','#prog-m1-2c','#prog-m1-3a','#prog-m1-3b','#prog-m1-3c'],
      { scaleX: 0.05, transformOrigin: 'left', duration: 0.5, stagger: 0.1 })
       .to(['#prog-m1-2a','#prog-m1-2b','#prog-m1-2c','#prog-m1-3a','#prog-m1-3b','#prog-m1-3c'],
      { scaleX: 1, transformOrigin: 'left', duration: 0.7, stagger: 0.1 })
    // Arms reaching
    const tl3 = gsap.timeline({ repeat: -1 })
    tl3.to(['#arm-m1-l','#hand-m1-l'], { y: -8, x: -4, duration: 0.3, ease: 'power2.out' })
       .to(['#arm-m1-l','#hand-m1-l'], { y: 0, x: 0, duration: 0.3 })
       .to(['#arm-m1-r','#hand-m1-r'], { y: -8, x: 4, duration: 0.3, ease: 'power2.out' }, '-=0.2')
       .to(['#arm-m1-r','#hand-m1-r'], { y: 0, x: 0, duration: 0.3 })
    // Button pulse
    const tl4 = gsap.timeline({ repeat: -1 })
    tl4.to(['#btn-m1-1','#btn-m1-3','#btn-m1-5'], { scale: 1.3, transformOrigin: 'center', duration: 0.2, stagger: 0.15 })
       .to(['#btn-m1-1','#btn-m1-3','#btn-m1-5'], { scale: 1, duration: 0.2, stagger: 0.15 })
    register('m1', [tl, tl2, tl3, tl4])
  }

  else if (state === 'receiving') {
    gsap.to('#slot-m1', { opacity: 1, duration: 0.2 })
    gsap.to('#msg-m1', { opacity: 1, y: 16, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 })
    const tl = gsap.timeline()
    tl.to('#head-m1', { x: 8, duration: 0.15, ease: 'power2.out' })
      .to('#head-m1', { x: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
    const tl2 = gsap.timeline({ repeat: 3 })
    tl2.to(['#btn-m1-1','#btn-m1-2','#btn-m1-3','#btn-m1-4','#btn-m1-5','#btn-m1-6'],
      { scale: 1.4, transformOrigin: 'center', duration: 0.12, stagger: 0.08 })
       .to(['#btn-m1-1','#btn-m1-2','#btn-m1-3','#btn-m1-4','#btn-m1-5','#btn-m1-6'],
      { scale: 1, duration: 0.12, stagger: 0.08 })
    register('m1', [tl, tl2])
  }

  else if (state === 'down') {
    gsap.to('#agent-worker', { opacity: 0.2, duration: 1.5 })
    gsap.to(['#prog-m1-2a','#prog-m1-2b','#prog-m1-2c','#prog-m1-3a','#prog-m1-3b','#prog-m1-3c'],
      { opacity: 0, scaleX: 0, transformOrigin: 'left', duration: 1.2, stagger: 0.1 })
    gsap.to('#wave-m1', { opacity: 0, duration: 1 })
    gsap.to('#steam-m1-1, #steam-m1-2', { opacity: 0, duration: 0.8 })
    gsap.to('#lamp-m1', { attr: { fill: '#333' }, duration: 0.8 })
  }
}

// ─── JEEP Animations ─────────────────────────────────────────────────────────
function animateJeep(state) {
  const gsap = g()

  // Reset
  gsap.to('#agent-driver', { opacity: 1, duration: 0.3 })
  gsap.to('#needle-jeep-l', { rotation: 0, transformOrigin: '94px 213px', duration: 0.4 })
  gsap.to('#needle-jeep-r', { rotation: 0, transformOrigin: '266px 213px', duration: 0.4 })
  gsap.to('#msg-jeep', { opacity: 0, y: 0, duration: 0.2 })
  gsap.to('#slot-jeep', { opacity: 0, duration: 0.2 })
  gsap.to(['#sig-jeep-1','#sig-jeep-2','#sig-jeep-3'], { opacity: 1, duration: 0.3 })

  if (state === 'idle') {
    // Subtle needle drift
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to('#needle-jeep-l', { rotation: 5, transformOrigin: '94px 213px', duration: 3, ease: 'sine.inOut' })
    // Gentle driver bob
    const tl2 = gsap.timeline({ repeat: -1, yoyo: true })
    tl2.to('#agent-driver', { y: -2, duration: 2.5, ease: 'sine.inOut' })
    register('jeep', [tl, tl2])
  }

  else if (state === 'active') {
    // Needle rises
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to('#needle-jeep-l', { rotation: 25, transformOrigin: '94px 213px', duration: 1.5, ease: 'power1.inOut' })
    tl.to('#needle-jeep-r', { rotation: -20, transformOrigin: '266px 213px', duration: 1.5, ease: 'power1.inOut' }, 0)
    // Route line pulses
    const tl2 = gsap.timeline({ repeat: -1, yoyo: true })
    tl2.to('#route-jeep', { opacity: 0.4, duration: 0.8 })
    // Signal bars pulse
    const tl3 = gsap.timeline({ repeat: -1 })
    tl3.to(['#sig-jeep-1','#sig-jeep-2','#sig-jeep-3'], { opacity: 0.3, duration: 0.5, stagger: 0.1 })
       .to(['#sig-jeep-1','#sig-jeep-2','#sig-jeep-3'], { opacity: 1, duration: 0.5, stagger: 0.1 })
    register('jeep', [tl, tl2, tl3])
  }

  else if (state === 'working') {
    // Needles max out
    gsap.to('#needle-jeep-l', { rotation: 40, transformOrigin: '94px 213px', duration: 0.6, ease: 'back.out(1.5)' })
    gsap.to('#needle-jeep-r', { rotation: -35, transformOrigin: '266px 213px', duration: 0.6, ease: 'back.out(1.5)', delay: 0.1 })
    // Small needle vibration
    const tl = gsap.timeline({ repeat: -1 })
    tl.to('#needle-jeep-l', { rotation: 42, transformOrigin: '94px 213px', duration: 0.1 })
       .to('#needle-jeep-l', { rotation: 38, transformOrigin: '94px 213px', duration: 0.1 })
    // Hand on wheel tightens
    const tl2 = gsap.timeline({ repeat: -1, yoyo: true })
    tl2.to('#hand-jeep-r', { scale: 1.15, transformOrigin: 'center', duration: 0.3 })
    // Route blink
    const tl3 = gsap.timeline({ repeat: -1 })
    tl3.to('#route-jeep', { opacity: 0, duration: 0.3 })
       .to('#route-jeep', { opacity: 1, duration: 0.3 })
    register('jeep', [tl, tl2, tl3])
  }

  else if (state === 'receiving') {
    // Message drop
    gsap.to('#slot-jeep', { opacity: 1, duration: 0.2 })
    gsap.to('#msg-jeep', { opacity: 1, y: 14, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 })
    // Signal bars flash rapid
    const tl = gsap.timeline({ repeat: 5 })
    tl.to(['#sig-jeep-1','#sig-jeep-2','#sig-jeep-3'], { opacity: 0, duration: 0.1, stagger: 0.05 })
       .to(['#sig-jeep-1','#sig-jeep-2','#sig-jeep-3'], { opacity: 1, duration: 0.1, stagger: 0.05 })
    // Horn glow
    const tl2 = gsap.timeline({ repeat: 3, yoyo: true })
    tl2.to('#horn-jeep', { attr: { r: 8 }, duration: 0.2 })
    register('jeep', [tl, tl2])
  }

  else if (state === 'down') {
    gsap.to('#agent-driver', { opacity: 0.2, duration: 1.5 })
    gsap.to(['#needle-jeep-l','#needle-jeep-r'], { rotation: -30, transformOrigin: 'center', duration: 1.5, ease: 'power2.in' })
    gsap.to(['#sig-jeep-1','#sig-jeep-2','#sig-jeep-3'], { opacity: 0.1, duration: 1 })
    gsap.to('#horn-jeep', { attr: { fill: '#1A271A' }, duration: 0.8 })
    gsap.to('#route-jeep', { opacity: 0, duration: 1 })
    // Darken windshield more
    gsap.to('#wx-sky-jeep', { attr: { fill: '#050A05' }, duration: 1.5 })
  }
}

// ─── Init: set all rooms to idle on load ─────────────────────────────────────
export function initRooms() {
  if (!window.gsap) {
    console.warn('[rooms-animator] GSAP not found — retrying in 500ms')
    setTimeout(initRooms, 500)
    return
  }
  setRoomState('m4', 'idle')
  setRoomState('m1', 'idle')
  setRoomState('jeep', 'idle')
  console.log('[rooms-animator] rooms initialized')
}
