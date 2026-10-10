/**
 * VELOCITY X — Shared Kinetic Progress Store (v2.0)
 * 
 * Crucial Integration Rule:
 * GSAP owns the scroll timeline and writes to this mutable progress object.
 * R3F reads this object in useFrame and mutates three.js objects directly.
 * React state is NEVER updated on scroll to guarantee zero re-renders during scrubbing!
 */

export const progressState = {
  // Master normalized scroll progress [0.00 -> 1.00]
  progress: 0,
  
  // Instantaneous scroll velocity (for wheel spin, engine pitch, and HUD)
  velocity: 0,
  
  // Current active chapter [1..5]
  currentChapter: 1,
  
  // Active car body paint color hex
  paintColor: '#c6ff00',
  
  // Interactive drag-to-orbit offset (in radians)
  dragOrbitAngle: 0,
  isDragging: false,
  
  // Pointer parallax offsets [-1..1]
  pointerX: 0,
  pointerY: 0,

  // Speed in km/h for HUD
  speedKmh: 0,

  // Quality tier: 'high' | 'medium' | 'low' | 'static'
  qualityTier: 'high',

  // Audio enabled state
  soundEnabled: false,
};

// Listeners for infrequent discrete events (like chapter change, paint color change)
const chapterListeners = new Set();
const paintListeners = new Set();
const soundListeners = new Set();

export function setProgress(val, vel = 0) {
  progressState.progress = Math.max(0, Math.min(1, val));
  progressState.velocity = vel;

  // Chapter calculation
  let chap = 1;
  if (val >= 0.85) chap = 5;
  else if (val >= 0.65) chap = 4;
  else if (val >= 0.45) chap = 3;
  else if (val >= 0.20) chap = 2;
  else chap = 1;

  if (chap !== progressState.currentChapter) {
    progressState.currentChapter = chap;
    chapterListeners.forEach((fn) => fn(chap));
  }

  // Simulated speed calculation
  progressState.speedKmh = Math.round(progressState.progress * 348);
}

export function setPaintColor(hex) {
  progressState.paintColor = hex;
  paintListeners.forEach((fn) => fn(hex));
}

export function setPointer(x, y) {
  progressState.pointerX = x;
  progressState.pointerY = y;
}

export function setDragOrbit(angle, isDragging) {
  progressState.dragOrbitAngle = angle;
  progressState.isDragging = isDragging;
}

export function subscribeChapter(fn) {
  chapterListeners.add(fn);
  return () => chapterListeners.delete(fn);
}

export function subscribePaint(fn) {
  paintListeners.add(fn);
  return () => paintListeners.delete(fn);
}

export function subscribeSound(fn) {
  soundListeners.add(fn);
  return () => soundListeners.delete(fn);
}
