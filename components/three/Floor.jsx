'use client';

/**
 * VELOCITY X — Studio Floor & Kinetic Grid (Section 3)
 */
export default function Floor() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Matte Black Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#050505"
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      {/* Cyber Grid Lines */}
      <gridHelper
        args={[40, 40, '#c6ff00', '#1f2410']}
        position={[0, 0.005, 0]}
      />
    </group>
  );
}
