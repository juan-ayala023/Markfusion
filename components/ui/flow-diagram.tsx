"use client";

import { useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { FlowEdge, FlowNode } from "@/content/types";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const NODE_H = 42;
const PADDING = 4;
const STEP_MS = 850;
const HOLD_STEPS = 4;

type FlowDiagramProps = {
  nodes: readonly FlowNode[];
  edges: readonly FlowEdge[];
  title: string;
  done: string;
  /** true: se repite (demo). false: se dibuja una vez al entrar en pantalla (caso de estudio). */
  loop?: boolean;
  nodeWidth?: number;
  columnGap?: number;
  rowGap?: number;
  className?: string;
};

function useLayout(nodes: readonly FlowNode[], nodeWidth: number, columnGap: number, rowGap: number) {
  return useMemo(() => {
    const columns = Math.max(...nodes.map((node) => node.col)) + 1;
    const perColumn = Array.from({ length: columns }, (_, col) => nodes.filter((node) => node.col === col));
    const maxRows = Math.max(...perColumn.map((column) => column.length));
    const height = (maxRows - 1) * rowGap + NODE_H + PADDING * 2;
    const width = columns * nodeWidth + (columns - 1) * columnGap + PADDING * 2;

    const positions = new Map<string, { x: number; y: number; col: number }>();
    perColumn.forEach((column, col) => {
      const offset = (height - ((column.length - 1) * rowGap + NODE_H)) / 2;
      column.forEach((node, row) => {
        positions.set(node.id, { x: PADDING + col * (nodeWidth + columnGap), y: offset + row * rowGap, col });
      });
    });
    return { width, height, columns, positions };
  }, [nodes, nodeWidth, columnGap, rowGap]);
}

/** Diagrama de flujo estilo n8n: los nodos se encienden por columnas y las señales recorren las conexiones. */
export function FlowDiagram({
  nodes,
  edges,
  title,
  done,
  loop = true,
  nodeWidth = 116,
  columnGap = 18,
  rowGap = 120,
  className,
}: FlowDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: !loop });
  const reduceMotion = useReducedMotionSafe();
  const [tick, setTick] = useState(0);
  const { width, height, columns, positions } = useLayout(nodes, nodeWidth, columnGap, rowGap);

  const donePhase = columns + 1;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    if (!loop && tick >= donePhase) return;
    const id = setTimeout(() => setTick((value) => (loop ? (value + 1) % (donePhase + HOLD_STEPS) : value + 1)), STEP_MS);
    return () => clearTimeout(id);
  }, [inView, reduceMotion, loop, tick, donePhase]);

  const phase = reduceMotion ? donePhase : Math.min(tick, donePhase);

  return (
    <div ref={ref} aria-hidden className={cn("relative flex h-full flex-col", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="label-mono truncate text-[10px] text-subtle">{title}</span>
        <span
          className={cn(
            "shrink-0 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 font-mono text-[10px] text-brand-to transition-opacity duration-500",
            phase >= donePhase ? "opacity-100" : "opacity-0",
          )}
        >
          ✓ {done}
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 w-full flex-1" preserveAspectRatio="xMidYMid meet">
        {edges.map(({ from, to }) => {
          const a = positions.get(from);
          const b = positions.get(to);
          if (!a || !b) return null;
          const x1 = a.x + nodeWidth;
          const y1 = a.y + NODE_H / 2;
          const x2 = b.x;
          const y2 = b.y + NODE_H / 2;
          const mid = (x1 + x2) / 2;
          const d = `M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
          const active = phase >= b.col + 1;
          return (
            <g key={`${from}-${to}`}>
              <path d={d} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth={1.5} />
              <path
                d={d}
                fill="none"
                pathLength={1}
                stroke="var(--color-brand)"
                strokeOpacity={0.55}
                strokeWidth={1.5}
                strokeDasharray="1 1"
                strokeDashoffset={active ? 0 : 1}
                style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
              <path
                d={d}
                fill="none"
                pathLength={1}
                stroke="#d4ff8a"
                strokeWidth={2.5}
                strokeLinecap="round"
                className={cn("flow-dash transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
              />
            </g>
          );
        })}

        {nodes.map((node) => {
          const position = positions.get(node.id)!;
          const lit = phase >= position.col + 1;
          return (
            <g key={node.id} transform={`translate(${position.x} ${position.y})`}>
              <rect
                width={nodeWidth}
                height={NODE_H}
                rx={10}
                fill="var(--color-surface-2)"
                stroke={lit ? "rgb(142 234 0 / 0.55)" : "rgb(255 255 255 / 0.1)"}
                style={{ transition: "stroke 400ms ease" }}
              />
              <rect
                x={8}
                y={10}
                width={22}
                height={22}
                rx={6}
                fill={lit ? "rgb(107 224 0 / 0.18)" : "rgb(255 255 255 / 0.05)"}
                style={{ transition: "fill 400ms ease" }}
              />
              <text
                x={19}
                y={25}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={lit ? "var(--color-brand-to)" : "var(--color-subtle)"}
                style={{ transition: "fill 400ms ease" }}
              >
                {node.title[0]}
              </text>
              <text x={37} y={19} fontSize={11} fontWeight={500} fill="var(--color-fg)">
                {node.title}
              </text>
              <text x={37} y={32} fontSize={9} fill="var(--color-muted)" className="font-mono">
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
