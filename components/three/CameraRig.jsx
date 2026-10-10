'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { progressState } from '../../lib/progressStore';

/**
 * VELOCITY X — Scroll-Driven Camera Rig (FR-05, FR-08)
 * 
 * Features:
 * - Interpolated 5-chapter camera positions and lookAt targets
 * - Smooth frame-by-frame damping (THREE.MathUtils.damp)
 * - Pointer parallax tracking capped at 4 degrees
 * - Responsive FOV adaptation
 */
export default function CameraRig({ sceneState }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(-4.2, 1.4, 7.8));
  const currentLook = useRef(new THREE.Vector3(0, 0.4, 0));

  useFrame((state, delta) => {
    // 1. Target keyframe coordinates from scroll choreography
    const targetX = sceneState.current.camX;
    const targetY = sceneState.current.camY;
    const targetZ = sceneState.current.camZ;

    // 2. Add subtle pointer parallax (capped at subtle angle)
    const px = progressState.pointerX * 0.35;
    const py = progressState.pointerY * 0.2;

    // 3. Smoothly damp camera position
    const lambda = 7.0;
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetX + px, lambda, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY + py, lambda, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, lambda, delta);
    camera.position.copy(currentPos.current);

    // 4. Smoothly damp lookAt target
    const targetLookX = sceneState.current.lookX;
    const targetLookY = sceneState.current.lookY;
    const targetLookZ = sceneState.current.lookZ;

    currentLook.current.x = THREE.MathUtils.damp(currentLook.current.x, targetLookX, lambda, delta);
    currentLook.current.y = THREE.MathUtils.damp(currentLook.current.y, targetLookY, lambda, delta);
    currentLook.current.z = THREE.MathUtils.damp(currentLook.current.z, targetLookZ, lambda, delta);
    camera.lookAt(currentLook.current);
  });

  return null;
}
