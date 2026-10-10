'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { progressState, subscribePaint } from '../../lib/progressStore';

/**
 * VELOCITY X — Precision 3D Hypercar Component
 * 
 * Features:
 * - Named structural groups: Body, Glass, Wheels (FL/FR/RL/RR), Headlights, Taillights
 * - MeshPhysicalMaterial with clearcoat for real-time paint switching
 * - High-speed spinning wheels with ceramic brakes and lime calipers
 * - Emissive animated headlights and braking lightblades
 * - Contact shadow grounding plane
 */
export default function CarModel({ sceneState }) {
  const carGroupRef = useRef();
  const bodyMatRef = useRef();
  const headLightMatRef = useRef();
  const brakeLightMatRef = useRef();

  // Wheel refs for axle rotation
  const wheelFLRef = useRef();
  const wheelFRRef = useRef();
  const wheelRLRef = useRef();
  const wheelRRRef = useRef();

  // Subscribe to paint color updates
  useEffect(() => {
    const unsub = subscribePaint((hex) => {
      if (bodyMatRef.current) {
        bodyMatRef.current.color.set(hex);
      }
    });
    return unsub;
  }, []);

  // Shared geometry definitions for performance optimization (draw call reduction)
  const geometries = useMemo(() => {
    return {
      // Main Chassis Tub
      chassis: new THREE.BoxGeometry(1.7, 0.42, 3.8),
      cabin: new THREE.CylinderGeometry(0.7, 0.85, 0.45, 16),
      splitter: new THREE.BoxGeometry(1.85, 0.05, 0.6),
      sideSkirt: new THREE.BoxGeometry(0.18, 0.12, 2.4),
      rearWingBlade: new THREE.BoxGeometry(1.85, 0.04, 0.35),
      wingStrut: new THREE.BoxGeometry(0.04, 0.28, 0.15),
      diffuser: new THREE.BoxGeometry(1.75, 0.2, 0.5),

      // Wheel Components
      tire: new THREE.CylinderGeometry(0.38, 0.38, 0.26, 24),
      rimSpoke: new THREE.BoxGeometry(0.05, 0.65, 0.03),
      brakeRotor: new THREE.CylinderGeometry(0.24, 0.24, 0.02, 20),
      caliper: new THREE.BoxGeometry(0.08, 0.14, 0.06),

      // Optics
      headlightBar: new THREE.BoxGeometry(0.45, 0.04, 0.12),
      taillightBar: new THREE.BoxGeometry(1.68, 0.03, 0.05),
    };
  }, []);

  // Frame update: direct three.js object mutation (no React re-renders)
  useFrame(() => {
    if (!carGroupRef.current) return;

    // Apply scroll-driven position and scale
    carGroupRef.current.position.set(
      sceneState.current.carX,
      sceneState.current.carY,
      sceneState.current.carZ
    );

    // Combine scroll yaw with user interactive drag-orbit angle
    const totalYaw = sceneState.current.carRotY + progressState.dragOrbitAngle;
    carGroupRef.current.rotation.y = totalYaw;

    const s = sceneState.current.carScale;
    carGroupRef.current.scale.set(s, s, s);

    // Rotate all four wheels along axle
    const rot = sceneState.current.wheelRotation;
    if (wheelFLRef.current) wheelFLRef.current.rotation.x = rot;
    if (wheelFRRef.current) wheelFRRef.current.rotation.x = rot;
    if (wheelRLRef.current) wheelRLRef.current.rotation.x = rot;
    if (wheelRRRef.current) wheelRRRef.current.rotation.x = rot;

    // Modulate lighting intensities
    if (headLightMatRef.current) {
      headLightMatRef.current.emissiveIntensity = sceneState.current.headlights;
    }
    if (brakeLightMatRef.current) {
      brakeLightMatRef.current.emissiveIntensity = sceneState.current.brakeLights;
    }
  });

  return (
    <group ref={carGroupRef} position={[0, 0, 0]}>
      {/* ================= 1. BODY & AERODYNAMIC SHELL ================= */}
      <group name="Body">
        {/* Main Lower Monocoque Body */}
        <mesh position={[0, 0.26, 0]} castShadow receiveShadow geometry={geometries.chassis}>
          <meshPhysicalMaterial
            ref={bodyMatRef}
            color={progressState.paintColor}
            metalness={0.88}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
          />
        </mesh>

        {/* Front Nose Cone Slope */}
        <mesh position={[0, 0.22, 1.65]} rotation={[-0.15, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.25, 0.9]} />
          <meshPhysicalMaterial
            color={progressState.paintColor}
            metalness={0.88}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Rear Engine Cowl & Deck */}
        <mesh position={[0, 0.32, -1.35]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[1.55, 0.32, 1.2]} />
          <meshPhysicalMaterial
            color={progressState.paintColor}
            metalness={0.88}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Front Aero Splitter (Matte Carbon) */}
        <mesh position={[0, 0.08, 2.05]} castShadow geometry={geometries.splitter}>
          <meshStandardMaterial color="#111113" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Side Skirts (Left & Right) */}
        <mesh position={[-0.88, 0.1, 0]} castShadow geometry={geometries.sideSkirt}>
          <meshStandardMaterial color="#111113" roughness={0.7} metalness={0.3} />
        </mesh>
        <mesh position={[0.88, 0.1, 0]} castShadow geometry={geometries.sideSkirt}>
          <meshStandardMaterial color="#111113" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Rear Diffuser */}
        <mesh position={[0, 0.14, -1.95]} rotation={[-0.2, 0, 0]} castShadow geometry={geometries.diffuser}>
          <meshStandardMaterial color="#0d0d0f" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Rear Swan-Neck GT Wing */}
        <group position={[0, 0.65, -1.8]}>
          <mesh position={[0, 0, 0]} castShadow geometry={geometries.rearWingBlade}>
            <meshStandardMaterial color="#0a0a0c" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[-0.55, -0.15, -0.05]} geometry={geometries.wingStrut}>
            <meshStandardMaterial color="#1f1f23" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0.55, -0.15, -0.05]} geometry={geometries.wingStrut}>
            <meshStandardMaterial color="#1f1f23" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ================= 2. CABIN & COCKPIT GLASS ================= */}
      <group name="Glass" position={[0, 0.52, -0.1]}>
        {/* Canopy Greenhouse Glass */}
        <mesh rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.72, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshPhysicalMaterial
            color="#08080a"
            transmission={0.85}
            roughness={0.06}
            metalness={0.1}
            ior={1.52}
            transparent
            opacity={0.82}
          />
        </mesh>
      </group>

      {/* ================= 3. WHEELS & BRAKES (AXLE ROTATION) ================= */}
      <group name="Wheels">
        {/* Front Left */}
        <group position={[-0.88, 0.38, 1.25]} ref={wheelFLRef}>
          <WheelAssembly geometries={geometries} />
        </group>

        {/* Front Right */}
        <group position={[0.88, 0.38, 1.25]} ref={wheelFRRef}>
          <WheelAssembly geometries={geometries} isRight />
        </group>

        {/* Rear Left */}
        <group position={[-0.9, 0.38, -1.25]} ref={wheelRLRef}>
          <WheelAssembly geometries={geometries} isWide />
        </group>

        {/* Rear Right */}
        <group position={[0.9, 0.38, -1.25]} ref={wheelRRRef}>
          <WheelAssembly geometries={geometries} isRight isWide />
        </group>
      </group>

      {/* ================= 4. LIGHTS (HEADLIGHTS & BRAKES) ================= */}
      <group name="Lights">
        {/* Left Headlight Projector Strip */}
        <mesh position={[-0.58, 0.32, 1.95]} rotation={[0, 0.25, 0]} geometry={geometries.headlightBar}>
          <meshStandardMaterial
            ref={headLightMatRef}
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>

        {/* Right Headlight Projector Strip */}
        <mesh position={[0.58, 0.32, 1.95]} rotation={[0, -0.25, 0]} geometry={geometries.headlightBar}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>

        {/* Rear Full-Width Taillight Blade */}
        <mesh position={[0, 0.38, -1.98]} geometry={geometries.taillightBar}>
          <meshStandardMaterial
            ref={brakeLightMatRef}
            color="#ff1a1a"
            emissive="#ff1a1a"
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ================= 5. UNDER-CHASSIS CONTACT SHADOW ================= */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 4.4]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

/**
 * Reusable Wheel Component with Rim, Tire, Carbon Ceramic Rotor, and Lime Caliper
 */
function WheelAssembly({ geometries, isRight = false, isWide = false }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Tire Rubber */}
      <mesh geometry={geometries.tire} castShadow>
        <meshStandardMaterial color="#141416" roughness={0.92} metalness={0.05} />
      </mesh>

      {/* High-Tech Multispoke Rim */}
      <mesh geometry={geometries.rimSpoke}>
        <meshStandardMaterial color="#2d2d34" roughness={0.25} metalness={0.9} />
      </mesh>
      <mesh geometry={geometries.rimSpoke} rotation={[0, 0, Math.PI / 3]}>
        <meshStandardMaterial color="#2d2d34" roughness={0.25} metalness={0.9} />
      </mesh>
      <mesh geometry={geometries.rimSpoke} rotation={[0, 0, (Math.PI / 3) * 2]}>
        <meshStandardMaterial color="#2d2d34" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* Ceramic Brake Rotor */}
      <mesh position={[0, isRight ? -0.06 : 0.06, 0]} geometry={geometries.brakeRotor}>
        <meshStandardMaterial color="#4b4b54" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Electric Lime Brake Caliper */}
      <mesh position={[0.12, isRight ? -0.07 : 0.07, 0.08]} geometry={geometries.caliper}>
        <meshStandardMaterial
          color="#c6ff00"
          emissive="#c6ff00"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}
