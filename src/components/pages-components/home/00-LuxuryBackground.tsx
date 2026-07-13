"use client";

import { useEffect, useRef } from "react";

export default function LuxuryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      z: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 0,
        y: 0,
        baseX: Math.random() * width,
        baseY: Math.random() * height * 3 - height,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        color:
          Math.random() > 0.85
            ? "rgba(180, 200, 255, "
            : "rgba(255, 255, 255, ",
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < -100) p.baseX = width + 100;
        if (p.baseX > width + 100) p.baseX = -100;

        p.y = p.baseY - scrollY * (p.z * 0.4);
        p.x = p.baseX;

        const radius = p.z * 1.2;
        const opacity = Math.min(
          1,
          Math.max(0.1, 1 - Math.abs(p.y - height / 2) / (height * 1.2)),
        );

        if (p.y > -100 && p.y < height + 100) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${opacity * 0.8})`;
          ctx.fill();
        }
      });

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          if (
            p1.y < -100 ||
            p1.y > height + 100 ||
            p2.y < -100 ||
            p2.y > height + 100
          )
            continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineOpacity = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] w-screen h-screen pointer-events-none bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#525252] via-[#171717] to-[#050505] opacity-90" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-60"
      />
    </div>
  );
}
