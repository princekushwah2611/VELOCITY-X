'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CarModel from './CarModel';
import CameraRig from './CameraRig';
import Lights from './Lights';
import Floor from './Floor';
import { evaluateSceneState } from '../../lib/scrollConfig';
import { progressState, setPointer, setDragOrbit } from '../../lib/progressStore';

/**
 * Scene Coordinator running inside Canvas
 * Reads shared mutable progress and evaluates keyframe state once per frame
 */
function SceneCoordinator({ sceneState }) {
  useFrame(() => {
    // Evaluate camera, car, and light states from master scroll progress
    sceneState.current = evaluateSceneState(progressState.progress);
  });

  return (
    <>
      <CameraRig sceneState={sceneState} />
      <Lights sceneState={sceneState} />
      <CarModel sceneState={sceneState} />
      <Floor />
    </>
  );
}

/**
 * Master Scene Canvas (FR-01, FR-05)
 * Fixed viewport 3D canvas with pointer tracking and drag-to-orbit
 */
export default function SceneCanvas() {
  const sceneState = useRef(evaluateSceneState(0));
  const containerRef = useRef(null);
  const dragStartRef = useRef(null);
  const currentDragAngle = useRef(0);

  // Pointer parallax event listeners
  useEffect(() => {
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer(x, y);

      // Handle drag orbit
      if (dragStartRef.current !== null) {
        const deltaX = e.clientX - dragStartRef.current;
        const newAngle = currentDragAngle.current + deltaX * 0.008;
        setDragOrbit(newAngle, true);
      }
    };

    const handlePointerDown = (e) => {
      // Allow drag orbit in Chapter 4 or when interacting
      if (progressState.currentChapter === 4) {
        dragStartRef.current = e.clientX;
      }
    };

    const handlePointerUp = () => {
      if (dragStartRef.current !== null) {
        dragStartRef.current = null;
        // Spring return to natural orientation
        currentDragAngle.current = 0;
        setDragOrbit(0, false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{
          position: [-4.2, 1.4, 7.8],
          fov: 42,
          near: 0.1,
          far: 60,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <SceneCoordinator sceneState={sceneState} />
      </Canvas>
    </div>
  );
}
