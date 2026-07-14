import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sweep, MotifDef, GOLD_DARK, GOLD_LIGHT, GOLD_MID } from "@/src/lib";
import { easeOut } from "@/src/components";
import {
  MOTIF_KEYS,
  BLUEPRINT_LAYERS,
  SNAP_RADIUS,
  HUD_UPDATE_INTERVAL,
} from "@/src/lib";

interface BlueprintRefs {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  crosshairRef: React.RefObject<HTMLDivElement | null>;
  hudRef: React.RefObject<HTMLDivElement | null>;
  hudTextRef: React.RefObject<HTMLSpanElement | null>;
  motifRefs: React.MutableRefObject<(SVGGElement | null)[]>;
}

export function useBlueprintEngine({
  canvasRef,
  crosshairRef,
  hudRef,
  hudTextRef,
  motifRefs,
}: BlueprintRefs) {
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

    motifDataRef.current = MOTIF_KEYS.map((key, i) => ({
      id: key,
      baseX: 0.08 + ((i * 0.37) % 0.8),
      baseYFactor: 0.9 + i * 0.85,
      depth: 0.45 + (i % 3) * 0.08,
      scale: 0.85 + ((i * 13) % 5) * 0.07,
      rotation: ((i * 7) % 5) - 2,
      render: () => null,
    }));

    const handleResize = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = cssWidth * devicePixelRatio;
      canvas.height = cssHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

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

    let lastHudUpdate = 0;

    const render = (time: number) => {
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      BLUEPRINT_LAYERS.forEach((layer) => {
        const offset = (scrollY * layer.parallax) % layer.spacing;

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

      if (hasPointer && !isTouch) {
        const fine = BLUEPRINT_LAYERS[2];
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

      for (let i = sweeps.length - 1; i >= 0; i--) {
        const s = sweeps[i];
        s.life += 0.006;
        s.radius = s.maxRadius * easeOut(Math.min(s.life, 1));
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

      if (
        hasPointer &&
        time - lastHudUpdate > HUD_UPDATE_INTERVAL &&
        hudTextRef.current
      ) {
        lastHudUpdate = time;
        const xLabel = String(Math.round(mouseX)).padStart(4, "0");
        const yLabel = String(Math.round(mouseY)).padStart(4, "0");
        hudTextRef.current.textContent = `X ${xLabel}  ·  Y ${yLabel}`;
      }

      xTo(mouseX);
      yTo(mouseY);
      gsap.set(hud, { x: mouseX + 22, y: mouseY + 18 });

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
        const eased = reveal * reveal * (3 - 2 * reveal);

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
}
