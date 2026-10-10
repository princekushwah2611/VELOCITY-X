'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { checkCapabilities } from '../../lib/capabilities';
import { getAssetPath } from '../../utils/assetPath';

// Dynamically import SceneCanvas with ssr: false
const SceneCanvas = dynamic(() => import('../three/SceneCanvas'), {
  ssr: false,
});

/**
 * VELOCITY X — Capability Gate & Static Fallback (Section 8)
 * Ensures graceful degradation for devices without WebGL or with prefers-reduced-motion.
 */
export default function CapabilityGate() {
  const [capabilities, setCapabilities] = useState(null);

  useEffect(() => {
    setCapabilities(checkCapabilities());
  }, []);

  if (!capabilities) return null;

  // Render high-performance WebGL 3D Canvas
  if (capabilities.hasWebGL && !capabilities.prefersReducedMotion) {
    return <SceneCanvas />;
  }

  // Accessible Static Fallback (Pre-rendered visual)
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none bg-[#050505]">
      <img
        src={getAssetPath('/images/mclaren-720s.png')}
        alt="VELOCITY X Hypercar Showcase Stance"
        className="w-4/5 max-w-4xl object-contain opacity-80 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}
