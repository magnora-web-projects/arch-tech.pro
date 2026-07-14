"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * BlueprintBackground
 * ---------------------------------------------------------------
 * A living drafting board for an interior design studio.
 *
 * Signature: the cursor behaves like a compass point taking a reading —
 * a CAD crosshair snaps thin gold measurement lines to nearby points on
 * a parallaxed blueprint grid, with a coordinate readout tracking it.
 *
 * As the visitor scrolls, furniture plan/elevation sketches (an armchair,
 * a pendant light, a sofa, a shelving unit...) draw themselves in one
 * stroke at a time, like pages of a furnishing plan passing underneath —
 * grounding the blueprint language in the actual craft: interiors.
 *
 * Drop-in replacement — same fixed, z-[-1], full bleed contract.
 */

const GOLD_DARK = "138, 90, 68"; // #8A5A44
const GOLD_MID = "212, 163, 148"; // #D4A394
const GOLD_LIGHT = "245, 230, 211"; // #F5E6D3

type Sweep = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number; // 0 -> 1
};

type MotifDef = {
  id: string;
  baseX: number; // 0..1, fraction of viewport width
  baseYFactor: number; // multiple of viewport height down the page
  depth: number; // parallax speed
  scale: number;
  rotation: number;
  render: () => React.ReactNode;
};

// ---- minimal line-art furniture symbols, elevation + plan mix (pathLength=100 for uniform draw-in) ----
const motifShapes: Record<string, React.ReactNode> = {
  armchair: (
    <g>
      <path
        pathLength={100}
        d="M14 74 L14 44 Q14 30 28 30 L58 30 Q72 30 72 44 L72 74"
      />
      <path pathLength={100} d="M14 74 L14 92 M72 74 L72 92" />
      <path
        pathLength={100}
        d="M6 50 L6 74 Q6 80 14 80 M80 50 L80 74 Q80 80 72 80"
      />
      <path
        pathLength={100}
        d="M6 50 L6 40 Q6 34 14 34 M80 50 L80 40 Q80 34 72 34"
      />
      <path pathLength={100} d="M20 92 L20 84 M66 92 L66 84" />
    </g>
  ),
  pendant: (
    <g>
      <path pathLength={100} d="M43 4 L43 32" />
      <path pathLength={100} d="M20 32 L66 32 L58 62 L28 62 Z" />
      <circle pathLength={100} cx="43" cy="70" r="3" />
    </g>
  ),
  sofa: (
    <g>
      <path
        pathLength={100}
        d="M8 58 L8 40 Q8 28 22 28 L64 28 Q78 28 78 40 L78 58"
      />
      <path pathLength={100} d="M8 58 L8 74 M78 58 L78 74" />
      <path
        pathLength={100}
        d="M2 44 L2 58 Q2 64 8 64 M84 44 L84 58 Q84 64 78 64"
      />
      <path pathLength={100} d="M20 58 L20 40 M43 58 L43 38 M66 58 L66 40" />
      <path pathLength={100} d="M14 74 L14 68 M72 74 L72 68" />
    </g>
  ),
  shelving: (
    <g>
      <rect pathLength={100} x="10" y="6" width="60" height="82" />
      <path pathLength={100} d="M10 27 L70 27 M10 48 L70 48 M10 68 L70 68" />
      <path pathLength={100} d="M40 6 L40 88" />
      <circle pathLength={100} cx="24" cy="17" r="4" />
      <path pathLength={100} d="M50 60 L62 60 L62 68 L50 68 Z" />
    </g>
  ),
  sidetable: (
    <g>
      <ellipse pathLength={100} cx="30" cy="16" rx="16" ry="5" />
      <path pathLength={100} d="M16 16 L16 62 M44 16 L44 62" />
      <path pathLength={100} d="M10 62 L50 62" />
      <path pathLength={100} d="M56 40 Q50 24 60 10 Q70 24 62 40 Z" />
      <path pathLength={100} d="M58 40 L58 62 M64 40 L64 62 M58 62 L64 62" />
    </g>
  ),
  diningchair: (
    <g>
      <path pathLength={100} d="M16 8 L16 34 M52 8 L52 34" />
      <path pathLength={100} d="M16 34 L52 34 L52 46 L16 46 Z" />
      <path pathLength={100} d="M16 46 L10 88 M52 46 L58 88" />
      <path pathLength={100} d="M16 8 Q34 2 52 8" />
    </g>
  ),
  rug: (
    <g>
      <rect pathLength={100} x="4" y="4" width="88" height="58" rx="2" />
      <rect
        pathLength={100}
        x="14"
        y="14"
        width="68"
        height="38"
        rx="1"
        strokeDasharray="4,5"
      />
      <path
        pathLength={100}
        d="M4 4 L14 14 M92 4 L82 14 M4 62 L14 52 M92 62 L82 52"
      />
    </g>
  ),
};

type MotifKey = keyof typeof motifShapes;
const motifKeys = Object.keys(motifShapes) as MotifKey[];

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudTextRef = useRef<HTMLSpanElement>(null);
  const motifRefs = useRef<(SVGGElement | null)[]>([]);
  const motifDataRef = useRef<MotifDef[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const crosshair = crosshairRef.current;
    const hud = hudRef.current;
    if (!canvas || !crosshair || !hud) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    canvas.width = cssWidth * devicePixelRatio;
    canvas.height = cssHeight * devicePixelRatio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(devicePixelRatio, devicePixelRatio);

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const buildMotifs = () => {
      motifDataRef.current = motifKeys.map((key, i) => ({
        id: key,
        baseX: 0.08 + ((i * 0.37) % 0.8),
        baseYFactor: 0.9 + i * 0.85,
        depth: 0.45 + (i % 3) * 0.08,
        scale: 0.85 + ((i * 13) % 5) * 0.07,
        rotation: ((i * 7) % 5) - 2,
        render: () => null,
      }));
    };
    buildMotifs();

    const handleResize = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = cssWidth * devicePixelRatio;
      canvas.height = cssHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    // ---- three depth layers of drafting grid, like stacked drawing sheets ----
    const layers = [
      { spacing: 140, parallax: 0.05, opacity: 0.13 },
      { spacing: 88, parallax: 0.12, opacity: 0.19 },
      { spacing: 46, parallax: 0.22, opacity: 0.1 },
    ];

    // ---- cursor state ----
    let mouseX = cssWidth / 2;
    let mouseY = cssHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let hasPointer = false;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasPointer) {
        hasPointer = true;
        gsap.to(crosshair, { opacity: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(hud, { opacity: 1, duration: 0.6, ease: "power2.out" });
      }
    };
    const handlePointerLeave = () => {
      hasPointer = false;
      gsap.to(crosshair, { opacity: 0, duration: 0.4, ease: "power2.in" });
      gsap.to(hud, { opacity: 0, duration: 0.4, ease: "power2.in" });
    };

    if (!isTouch) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    const xTo = gsap.quickTo(crosshair, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(crosshair, "y", { duration: 0.5, ease: "power3" });
    let spin: gsap.core.Tween | null = null;
    if (!reducedMotion) {
      spin = gsap.to(crosshair.querySelector(".ch-ring"), {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }

    // ---- ambient compass-arc sweeps ----
    const sweeps: Sweep[] = [];
    let sweepTimer: ReturnType<typeof setInterval> | null = null;
    if (!reducedMotion) {
      sweepTimer = setInterval(
        () => {
          sweeps.push({
            x: Math.random() * cssWidth,
            y: Math.random() * cssHeight,
            radius: 0,
            maxRadius: 160 + Math.random() * 220,
            life: 0,
          });
          if (sweeps.length > 4) sweeps.shift();
        },
        4200 + Math.random() * 1800,
      );
    }

    const SNAP_RADIUS = 150;
    let lastHudUpdate = 0;

    const render = (time: number) => {
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      layers.forEach((layer) => {
        const offset = (scrollY * layer.parallax) % layer.spacing;

        // verticals: quieter, thinner — they were dominating the composition
        ctx.strokeStyle = `rgba(170, 170, 170, ${layer.opacity * 0.28})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        for (
          let x = -layer.spacing;
          x < cssWidth + layer.spacing;
          x += layer.spacing
        ) {
          const xx = x - offset * 0.3;
          ctx.moveTo(xx, 0);
          ctx.lineTo(xx, cssHeight);
        }
        ctx.stroke();

        // horizontals: carry a bit more presence, read as datum lines
        ctx.strokeStyle = `rgba(170, 170, 170, ${layer.opacity * 0.45})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (
          let y = -layer.spacing;
          y < cssHeight + layer.spacing;
          y += layer.spacing
        ) {
          const yy = y - offset;
          ctx.moveTo(0, yy);
          ctx.lineTo(cssWidth, yy);
        }
        ctx.stroke();

        if (layer.spacing <= 46) {
          ctx.fillStyle = `rgba(${GOLD_MID}, ${layer.opacity * 0.6})`;
          for (
            let x = -layer.spacing;
            x < cssWidth + layer.spacing;
            x += layer.spacing
          ) {
            for (
              let y = -layer.spacing;
              y < cssHeight + layer.spacing;
              y += layer.spacing
            ) {
              const xx = x - offset * 0.3;
              const yy = y - offset;
              ctx.beginPath();
              ctx.arc(xx, yy, 1.1, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });

      // snap-lines: connect cursor to nearby fine-grid nodes, like taking a measurement
      if (hasPointer && !isTouch) {
        const fine = layers[2];
        const offset = (scrollY * fine.parallax) % fine.spacing;
        const startX =
          Math.floor((mouseX - SNAP_RADIUS) / fine.spacing) * fine.spacing;
        const startY =
          Math.floor((mouseY - SNAP_RADIUS) / fine.spacing) * fine.spacing;

        for (let x = startX; x < mouseX + SNAP_RADIUS; x += fine.spacing) {
          for (let y = startY; y < mouseY + SNAP_RADIUS; y += fine.spacing) {
            const xx = x - offset * 0.3;
            const yy = y - offset;
            const dx = xx - mouseX;
            const dy = yy - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < SNAP_RADIUS) {
              const t = 1 - dist / SNAP_RADIUS;
              ctx.beginPath();
              ctx.moveTo(mouseX, mouseY);
              ctx.lineTo(xx, yy);
              ctx.strokeStyle = `rgba(${GOLD_MID}, ${t * 0.32})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(xx, yy, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${t * 0.8})`;
              ctx.fill();
            }
          }
        }

        // soft spotlight around the cursor for extra contrast/depth
        const spotlight = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          220,
        );
        spotlight.addColorStop(0, `rgba(${GOLD_LIGHT}, 0.025)`);
        spotlight.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = spotlight;
        ctx.fillRect(mouseX - 220, mouseY - 220, 440, 440);
      }

      // ambient compass-arc sweeps
      for (let i = sweeps.length - 1; i >= 0; i--) {
        const s = sweeps[i];
        s.life += 0.006;
        s.radius = s.maxRadius * easeOutCubic(Math.min(s.life, 1));
        const fade = s.life < 0.15 ? s.life / 0.15 : 1 - (s.life - 0.15) / 0.85;
        if (fade <= 0 || s.life >= 1) {
          sweeps.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 1.4);
        ctx.strokeStyle = `rgba(${GOLD_DARK}, ${fade * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      if (hasPointer && time - lastHudUpdate > 60 && hudTextRef.current) {
        lastHudUpdate = time;
        const xLabel = String(Math.round(mouseX)).padStart(4, "0");
        const yLabel = String(Math.round(mouseY)).padStart(4, "0");
        hudTextRef.current.textContent = `X ${xLabel}  ·  Y ${yLabel}`;
      }

      xTo(mouseX);
      yTo(mouseY);
      gsap.set(hud, { x: mouseX + 22, y: mouseY + 18 });

      // ---- furniture motifs: draw themselves in as they pass through the viewport ----
      motifDataRef.current.forEach((m, i) => {
        const el = motifRefs.current[i];
        if (!el) return;
        const baseY = m.baseYFactor * cssHeight;
        const y = baseY - scrollY * m.depth;
        const x = m.baseX * cssWidth;
        const center = cssHeight * 0.55;
        const dist = Math.abs(y - center);
        const falloff = cssHeight * 0.62;
        const reveal = Math.max(0, 1 - dist / falloff);
        const eased = reveal * reveal * (3 - 2 * reveal); // smoothstep

        if (y < -160 || y > cssHeight + 160) {
          el.style.opacity = "0";
          return;
        }

        el.style.setProperty("--reveal", eased.toFixed(3));
        el.style.opacity = String(Math.min(1, eased * 1.15));
        el.style.transform = `translate(${x}px, ${y}px) rotate(${m.rotation}deg) scale(${m.scale})`;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    let animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (!isTouch) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }
      if (sweepTimer) clearInterval(sweepTimer);
      spin?.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] w-screen h-screen pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#010a32] via-[#080808] to-[#461f1f]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-75"
      />

      {/* furniture motifs — draw themselves in as the page scrolls */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible mix-blend-screen"
        style={{ opacity: 0.85 }}
      >
        {motifKeys.map((key, i) => (
          <g
            key={key}
            ref={(el) => {
              motifRefs.current[i] = el;
            }}
            style={{
              transformBox: "fill-box",
              willChange: "transform, opacity",
              opacity: 0,
              // @ts-expect-error -- custom property for CSS var draw-in
              "--reveal": 0,
            }}
            stroke={`rgba(${GOLD_MID}, 1)`}
            fill="none"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              style={{
                strokeDasharray: 100,
                strokeDashoffset: "calc(100 * (1 - var(--reveal, 0)))",
              }}
            >
              {motifShapes[key]}
            </g>
          </g>
        ))}
      </svg>

      {/* CAD crosshair — the cursor as a compass point */}
      <div
        ref={crosshairRef}
        className="absolute top-0 left-0 w-0 h-0 opacity-0"
        style={{ willChange: "transform" }}
      >
        <div className="ch-ring relative -translate-x-1/2 -translate-y-1/2 w-14 h-14">
          <svg viewBox="0 0 56 56" className="w-full h-full">
            <circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              stroke={`rgba(${GOLD_MID}, 0.55)`}
              strokeWidth="0.7"
              strokeDasharray="2,5"
            />
            <circle cx="28" cy="28" r="1.8" fill={`rgba(${GOLD_LIGHT}, 0.9)`} />
            <line
              x1="28"
              y1="6"
              x2="28"
              y2="14"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
            <line
              x1="28"
              y1="42"
              x2="28"
              y2="50"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
            <line
              x1="6"
              y1="28"
              x2="14"
              y2="28"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
            <line
              x1="42"
              y1="28"
              x2="50"
              y2="28"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>

      {/* coordinate readout HUD, like a plotter reading */}
      <div
        ref={hudRef}
        className="absolute top-0 left-0 opacity-0 whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        <div
          className="px-2 py-1 rounded-sm font-mono text-[0.62rem] tracking-[0.15em] border"
          style={{
            color: `rgba(${GOLD_LIGHT}, 0.95)`,
            background: "rgba(2, 2, 2, 0.55)",
            borderColor: `rgba(${GOLD_MID}, 0.35)`,
            backdropFilter: "blur(2px)",
          }}
        >
          <span ref={hudTextRef}>X 0000 · Y 0000</span>
        </div>
      </div>

      {/* architectural sheet corner marks */}
      <CornerMark className="top-6 left-6" />
      <CornerMark className="top-6 right-6 rotate-90" />
      <CornerMark className="bottom-6 right-6 rotate-180" />
      <CornerMark className="bottom-6 left-6 -rotate-90" />

      <div
        className="absolute bottom-6 left-14 font-mono text-[0.55rem] tracking-[0.3em] uppercase opacity-60"
        style={{ color: `rgba(${GOLD_LIGHT}, 1)` }}
      >
        Scale 1:100 · Sheet A-01
      </div>
    </div>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`absolute w-6 h-6 opacity-70 ${className}`}
    >
      <path
        d="M2 14 L2 2 L14 2"
        fill="none"
        stroke={`rgba(${GOLD_LIGHT}, 0.9)`}
        strokeWidth="1.1"
      />
    </svg>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
