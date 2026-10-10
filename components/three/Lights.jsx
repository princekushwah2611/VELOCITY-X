'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * VELOCITY X — Dynamic Lighting Setup (FR-07)
 * 
 * - Cool white key light from upper-left
 * - Electric lime (#c6ff00) rim light tracing the aerodynamic shoulder line
 * - Scroll-modulated intensity
 */
export default function Lights({ sceneState }) {
  const rimLightRef = useRef();

  useFrame(() => {
    if (rimLightRef.current) {
      rimLightRef.current.intensity = sceneState.current.rimLight * 2.5;
    }
  });

  return (
    <group name="StudioLighting">
      {/* Low ambient fill to preserve deep black shadows */}
      <ambientLight intensity={0.25} color="#151518" />

      {/* Main Cool White Key Light */}
      <directionalLight
        position={[-6, 8, 5]}
        intensity={1.8}
        color="#f8fafc"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Dynamic Electric Lime Rim Light */}
      <directionalLight
        ref={rimLightRef}
        position={[6, 2.5, -4]}
        intensity={3.5}
        color="#c6ff00"
      />

      {/* Subtle Front Bumper Accent Light */}
      <spotLight
        position={[0, 4, 7]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.2}
        color="#ffffff"
      />
    </group>
  );
}
