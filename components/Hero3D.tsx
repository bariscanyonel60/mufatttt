"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

/* Blueprint tower: wireframe floors rise from a grid, edges catch gold light.
   Mouse tilts the whole group — a model on a drafting table. */

function Tower({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null!);
  const floors = 14;

  const edges = useMemo(() => {
    const lines: [number, number, number][][] = [];
    for (let i = 0; i < floors; i++) {
      const y = i * 0.62;
      const s = 2.2 - i * 0.055; // gentle taper
      const h = s / 2;
      lines.push([
        [-h, y, -h], [h, y, -h], [h, y, h], [-h, y, h], [-h, y, -h],
      ]);
    }
    // vertical corner columns
    const top = (floors - 1) * 0.62;
    const s0 = 2.2 / 2, s1 = (2.2 - (floors - 1) * 0.055) / 2;
    ([[-1,-1],[1,-1],[1,1],[-1,1]] as const).forEach(([sx, sz]) => {
      lines.push([[sx * s0, 0, sz * s0], [sx * s1, top, sz * s1]]);
    });
    return lines;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    group.current.rotation.y = t * 0.12 + mouse.current.x * 0.35;
    group.current.rotation.x = -0.08 + mouse.current.y * 0.18;
  });

  return (
    <group ref={group} position={[0, -3.6, 0]}>
      {edges.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={i % 4 === 0 ? "#D9A441" : "#8a8a8a"}
          transparent
          opacity={i % 4 === 0 ? 0.9 : 0.32}
          lineWidth={1}
        />
      ))}
      {/* glass slabs on a few floors */}
      {[3, 7, 11].map((f) => (
        <mesh key={f} position={[0, f * 0.62, 0]}>
          <boxGeometry args={[2.2 - f * 0.055, 0.02, 2.2 - f * 0.055]} />
          <meshBasicMaterial color="#D9A441" transparent opacity={0.10} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const n = 350;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D9A441" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
      aria-hidden
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [4.5, 1.6, 8.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.35}>
          <Tower mouse={mouse} />
        </Float>
        <Particles />
      </Canvas>
    </div>
  );
}
