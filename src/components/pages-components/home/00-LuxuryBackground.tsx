"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * BlueprintBackground
 * ---------------------------------------------------------------
 * A living drafting board for an architecture / interior design studio.
 *
 * Signature: the cursor behaves like a compass point taking a reading —
 * a CAD crosshair snaps thin gold measurement lines to nearby points on
 * a parallaxed blueprint grid, with a coordinate readout tracking it.
 * Ambient compass-arc sweeps and sheet corner marks round out the scene.
 *
 * Drop-in replacement for LuxuryBackground — same fixed, z-[-1], full
 * bleed contract, so it can sit under SmoothDarkLayout unchanged.
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

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudTextRef = useRef<HTMLSpanElement>(null);

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

    let width = (canvas.width = window.innerWidth * devicePixelRatio);
    let height = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(devicePixelRatio, devicePixelRatio);
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      width = canvas.width = cssWidth * devicePixelRatio;
      height = canvas.height = cssHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    // ---- three depth layers of drafting grid, like stacked drawing sheets ----
    const layers = [
      { spacing: 140, parallax: 0.05, opacity: 0.16 },
      { spacing: 88, parallax: 0.12, opacity: 0.22 },
      { spacing: 46, parallax: 0.22, opacity: 0.12 },
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

    // smooth-follow crosshair via gsap quickTo, and slow perpetual compass spin
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

    const SNAP_RADIUS = 230;
    let lastHudUpdate = 0;

    const render = (time: number) => {
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // draw grid layers with parallax drift
      layers.forEach((layer) => {
        const offset = (scrollY * layer.parallax) % layer.spacing;
        ctx.strokeStyle = `rgba(150, 150, 150, ${layer.opacity * 0.4})`;
        ctx.lineWidth = 0.5;
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

        // faint nodes at intersections of the finest layer only (perf)
        if (layer.spacing <= 46) {
          ctx.fillStyle = `rgba(${GOLD_MID}, ${layer.opacity * 0.5})`;
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
              ctx.arc(xx, yy, 1, 0, Math.PI * 2);
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
              ctx.strokeStyle = `rgba(${GOLD_MID}, ${t * 0.35})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(xx, yy, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${t * 0.9})`;
              ctx.fill();
            }
          }
        }
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
        ctx.strokeStyle = `rgba(${GOLD_DARK}, ${fade * 0.18})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // throttled HUD text update (avoid thrashing the DOM every frame)
      if (hasPointer && time - lastHudUpdate > 60 && hudTextRef.current) {
        lastHudUpdate = time;
        const xLabel = String(Math.round(mouseX)).padStart(4, "0");
        const yLabel = String(Math.round(mouseY)).padStart(4, "0");
        hudTextRef.current.textContent = `X ${xLabel}  ·  Y ${yLabel}`;
      }

      xTo(mouseX);
      yTo(mouseY);
      gsap.set(hud, { x: mouseX + 22, y: mouseY + 18 });

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
    <div className="fixed inset-0 z-[-1] w-screen h-screen pointer-events-none bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#525252] via-[#171717] to-[#050505] opacity-90" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-70"
      />

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
              strokeWidth="0.75"
              strokeDasharray="2,4"
            />
            <circle cx="28" cy="28" r="2" fill={`rgba(${GOLD_LIGHT}, 0.9)`} />
            <line
              x1="28"
              y1="2"
              x2="28"
              y2="12"
              stroke={`rgba(${GOLD_MID}, 0.7)`}
              strokeWidth="0.75"
            />
            <line
              x1="28"
              y1="44"
              x2="28"
              y2="54"
              stroke={`rgba(${GOLD_MID}, 0.7)`}
              strokeWidth="0.75"
            />
            <line
              x1="2"
              y1="28"
              x2="12"
              y2="28"
              stroke={`rgba(${GOLD_MID}, 0.7)`}
              strokeWidth="0.75"
            />
            <line
              x1="44"
              y1="28"
              x2="54"
              y2="28"
              stroke={`rgba(${GOLD_MID}, 0.7)`}
              strokeWidth="0.75"
            />
          </svg>
        </div>
      </div>

      {/* coordinate readout HUD, like a plotter reading */}
      <div
        ref={hudRef}
        className="absolute top-0 left-0 opacity-0 font-mono text-[0.6rem] tracking-[0.15em] whitespace-nowrap"
        style={{ color: `rgba(${GOLD_LIGHT}, 0.7)`, willChange: "transform" }}
      >
        <span ref={hudTextRef}>X 0000 · Y 0000</span>
      </div>

      {/* architectural sheet corner marks */}
      <CornerMark className="top-6 left-6" />
      <CornerMark className="top-6 right-6 rotate-90" />
      <CornerMark className="bottom-6 right-6 rotate-180" />
      <CornerMark className="bottom-6 left-6 -rotate-90" />

      <div
        className="absolute bottom-6 left-14 font-mono text-[0.55rem] tracking-[0.3em] uppercase opacity-40"
        style={{ color: `rgba(${GOLD_MID}, 1)` }}
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
      className={`absolute w-6 h-6 opacity-50 ${className}`}
    >
      <path
        d="M2 14 L2 2 L14 2"
        fill="none"
        stroke={`rgba(${GOLD_MID}, 0.8)`}
        strokeWidth="1"
      />
    </svg>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
