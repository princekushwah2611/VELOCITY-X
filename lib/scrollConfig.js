/**
 * VELOCITY X — Scroll Choreography & Camera Rig Keyframes (v2.0)
 * 
 * Five chapters mapped from progress 0.0 to 1.0.
 * Smooth interpolation curves tuned for 60 fps rendering.
 */

// Keyframe markers [progress, camX, camY, camZ, lookX, lookY, lookZ, carX, carY, carZ, carRotY, carScale]
export const KEYFRAMES = [
  // 0.00: Initial Hero Stance (Front 3/4)
  {
    p: 0.0,
    cam: [-4.2, 1.4, 7.8],
    look: [0.0, 0.4, 0.0],
    carPos: [-0.6, 0.0, 0.0],
    carRot: [0, 0.35, 0],
    carScale: 1.0,
    headlights: 1.0,
    brakeLights: 0.2,
    rimLight: 1.2,
  },
  // 0.20: Chapter 01 Ignition Complete (Dolly In)
  {
    p: 0.2,
    cam: [-3.2, 1.1, 6.0],
    look: [0.0, 0.4, 0.0],
    carPos: [-0.5, 0.0, 0.0],
    carRot: [0, 0.45, 0],
    carScale: 1.02,
    headlights: 1.5,
    brakeLights: 0.2,
    rimLight: 1.8,
  },
  // 0.45: Chapter 02 Launch (Side Profile Tracking Shot)
  {
    p: 0.45,
    cam: [0.0, 1.2, 7.2],
    look: [0.0, 0.5, 0.0],
    carPos: [1.2, 0.0, 0.0],
    carRot: [0, Math.PI / 2, 0], // true side profile
    carScale: 1.05,
    headlights: 1.0,
    brakeLights: 0.3,
    rimLight: 2.2,
  },
  // 0.65: Chapter 03 Detail / Aero Lab (Low-Angle Front Wheel & Splitter)
  {
    p: 0.65,
    cam: [-2.4, 0.6, 3.2],
    look: [-1.2, 0.35, 0.6],
    carPos: [0.0, 0.0, 0.0],
    carRot: [0, 0.75, 0],
    carScale: 1.15,
    headlights: 1.8,
    brakeLights: 0.2,
    rimLight: 2.5,
  },
  // 0.85: Chapter 04 Reveal (Rear Three-Quarter & Paint Showcase)
  {
    p: 0.85,
    cam: [3.8, 1.3, -4.8],
    look: [0.0, 0.4, 0.0],
    carPos: [0.0, 0.0, 0.0],
    carRot: [0, Math.PI * 0.95, 0],
    carScale: 1.08,
    headlights: 0.4,
    brakeLights: 2.5, // flaring brake lights
    rimLight: 2.0,
  },
  // 1.00: Chapter 05 Release (High Wide Shot, Pin Release)
  {
    p: 1.0,
    cam: [0.0, 5.2, 8.5],
    look: [0.0, 0.2, 0.0],
    carPos: [0.0, 0.0, -1.2],
    carRot: [0, 0.25, 0],
    carScale: 0.85,
    headlights: 0.6,
    brakeLights: 0.5,
    rimLight: 0.8,
  },
];

// Helper to interpolate between numbers with smooth easing
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Cubic ease in-out
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Evaluates scene transform state at normalized progress [0..1]
 */
export function evaluateSceneState(progress) {
  const p = Math.max(0, Math.min(1, progress));

  // Find adjacent keyframes
  let i = 0;
  while (i < KEYFRAMES.length - 1 && KEYFRAMES[i + 1].p < p) {
    i++;
  }

  const k1 = KEYFRAMES[i];
  const k2 = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];

  // Local normalized t between k1 and k2
  const span = Math.max(0.0001, k2.p - k1.p);
  const localT = easeInOutCubic(Math.max(0, Math.min(1, (p - k1.p) / span)));

  return {
    camX: lerp(k1.cam[0], k2.cam[0], localT),
    camY: lerp(k1.cam[1], k2.cam[1], localT),
    camZ: lerp(k1.cam[2], k2.cam[2], localT),

    lookX: lerp(k1.look[0], k2.look[0], localT),
    lookY: lerp(k1.look[1], k2.look[1], localT),
    lookZ: lerp(k1.look[2], k2.look[2], localT),

    carX: lerp(k1.carPos[0], k2.carPos[0], localT),
    carY: lerp(k1.carPos[1], k2.carPos[1], localT),
    carZ: lerp(k1.carPos[2], k2.carPos[2], localT),

    carRotY: lerp(k1.carRot[1], k2.carRot[1], localT),
    carScale: lerp(k1.carScale, k2.carScale, localT),

    headlights: lerp(k1.headlights, k2.headlights, localT),
    brakeLights: lerp(k1.brakeLights, k2.brakeLights, localT),
    rimLight: lerp(k1.rimLight, k2.rimLight, localT),

    // Wheel spin accumulates continuously proportional to scroll distance
    wheelRotation: p * Math.PI * 16,
  };
}
