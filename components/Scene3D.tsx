"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function AnimatedSphere({
  position,
  color,
  speed,
  distort,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 100]}
        position={position}
        scale={0.8}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingOrbs() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />

      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <AnimatedSphere
        position={[-3.5, 0, -2]}
        color="#8b5cf6"
        speed={0.8}
        distort={0.4}
      />
      <AnimatedSphere
        position={[3.5, 1, -3]}
        color="#3b82f6"
        speed={0.6}
        distort={0.5}
      />
      <AnimatedSphere
        position={[0, -2, -4]}
        color="#06b6d4"
        speed={1}
        distort={0.3}
      />
      <AnimatedSphere
        position={[-2, 2, -5]}
        color="#a855f7"
        speed={0.5}
        distort={0.6}
      />
      <AnimatedSphere
        position={[2.5, -1.5, -2.5]}
        color="#6366f1"
        speed={0.7}
        distort={0.35}
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <FloatingOrbs />
        </Suspense>
      </Canvas>
    </div>
  );
}
