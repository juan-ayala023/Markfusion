"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const NODE_COUNT = 170;
const LINK_DISTANCE = 1.05;
const MAX_LINKS_PER_NODE = 4;
const PULSE_COUNT = 34;
/** Radio de influencia del cursor, en coordenadas de pantalla normalizadas. */
const HIGHLIGHT_RADIUS = 0.32;

const COLOR_IDLE = new THREE.Color("#34452a");
const COLOR_ACTIVE = new THREE.Color("#a4f53a");

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Graph = {
  nodes: Float32Array;
  edges: [number, number][];
  neighbors: number[][];
  linePositions: Float32Array;
};

/** Red determinista: nodos dentro de un elipsoide desplazado a la derecha (el texto vive a la izquierda). */
function buildGraph(): Graph {
  const random = mulberry32(7);
  const nodes = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i++) {
    let x: number, y: number, z: number;
    do {
      x = random() * 2 - 1;
      y = random() * 2 - 1;
      z = random() * 2 - 1;
    } while (x * x + y * y + z * z > 1);
    nodes.set([x * 4.6 + 1.6, y * 2.7, z * 1.8], i * 3);
  }

  const edges: [number, number][] = [];
  const neighbors: number[][] = Array.from({ length: NODE_COUNT }, () => []);
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (neighbors[i].length >= MAX_LINKS_PER_NODE || neighbors[j].length >= MAX_LINKS_PER_NODE) continue;
      const dx = nodes[i * 3] - nodes[j * 3];
      const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
      const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
      if (Math.hypot(dx, dy, dz) < LINK_DISTANCE) {
        edges.push([i, j]);
        neighbors[i].push(j);
        neighbors[j].push(i);
      }
    }
  }

  const linePositions = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], index) => {
    linePositions.set(nodes.subarray(a * 3, a * 3 + 3), index * 6);
    linePositions.set(nodes.subarray(b * 3, b * 3 + 3), index * 6 + 3);
  });

  return { nodes, edges, neighbors, linePositions };
}

function createDotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

type Pulse = { from: number; to: number; progress: number; speed: number };

function Network() {
  const { camera, gl, size } = useThree();
  const graph = useMemo(buildGraph, []);
  const dot = useMemo(createDotTexture, []);

  const group = useRef<THREE.Group>(null);
  const nodeColors = useRef<THREE.BufferAttribute>(null);
  const pulseGeometry = useRef<THREE.BufferGeometry>(null);

  const colors = useMemo(() => {
    const array = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) COLOR_IDLE.toArray(array, i * 3);
    return array;
  }, []);
  const glow = useMemo(() => new Float32Array(NODE_COUNT), []);
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);
  const pulses = useMemo<Pulse[]>(() => {
    const random = mulberry32(21);
    return Array.from({ length: PULSE_COUNT }, () => {
      const [from, to] = graph.edges[Math.floor(random() * graph.edges.length)];
      return { from, to, progress: random(), speed: 0.35 + random() * 0.5 };
    });
  }, [graph]);

  const pointer = useRef({ x: 10, y: 10 });
  const spin = useRef(0);
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const mixed = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useEffect(() => () => dot.dispose(), [dot]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const step = Math.min(delta, 0.05);
    const { x: px, y: py } = pointer.current;
    const hasPointer = Math.abs(px) <= 1.2 && Math.abs(py) <= 1.2;

    // Rotación lenta + parallax hacia el cursor
    spin.current += step * 0.035;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, spin.current + (hasPointer ? px * 0.28 : 0), 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, hasPointer ? -py * 0.14 : 0, 0.04);
    g.updateMatrixWorld();

    // Los nodos cercanos al cursor se encienden
    const aspect = size.width / size.height;
    for (let i = 0; i < NODE_COUNT; i++) {
      scratch.fromArray(graph.nodes, i * 3).applyMatrix4(g.matrixWorld).project(camera);
      const distance = Math.hypot((scratch.x - px) * aspect, scratch.y - py);
      const target = hasPointer ? Math.max(0, 1 - distance / HIGHLIGHT_RADIUS) : 0;
      glow[i] += (target - glow[i]) * 0.12;
      mixed.copy(COLOR_IDLE).lerp(COLOR_ACTIVE, glow[i]).toArray(colors, i * 3);
    }
    if (nodeColors.current) nodeColors.current.needsUpdate = true;

    // Pulsos que viajan por las conexiones como señales
    for (let p = 0; p < PULSE_COUNT; p++) {
      const pulse = pulses[p];
      pulse.progress += step * pulse.speed;
      if (pulse.progress >= 1) {
        const options = graph.neighbors[pulse.to];
        pulse.from = pulse.to;
        pulse.to = options.length ? options[Math.floor(Math.random() * options.length)] : pulse.from;
        pulse.progress = 0;
      }
      const a = pulse.from * 3;
      const b = pulse.to * 3;
      const t = pulse.progress;
      pulsePositions[p * 3] = graph.nodes[a] + (graph.nodes[b] - graph.nodes[a]) * t;
      pulsePositions[p * 3 + 1] = graph.nodes[a + 1] + (graph.nodes[b + 1] - graph.nodes[a + 1]) * t;
      pulsePositions[p * 3 + 2] = graph.nodes[a + 2] + (graph.nodes[b + 2] - graph.nodes[a + 2]) * t;
    }
    const pulseAttribute = pulseGeometry.current?.getAttribute("position");
    if (pulseAttribute) pulseAttribute.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graph.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6be000"
          transparent
          opacity={0.13}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graph.nodes, 3]} />
          <bufferAttribute ref={nodeColors} attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          map={dot}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points>
        <bufferGeometry ref={pulseGeometry}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={dot}
          color="#b8ff5c"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  // Fuera de pantalla no se renderiza ningún frame
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={dpr}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <Network />
      </Canvas>
    </div>
  );
}
