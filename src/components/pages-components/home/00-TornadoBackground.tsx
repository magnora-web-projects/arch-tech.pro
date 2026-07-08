"use client";

import { useEffect, useRef } from "react";

export default function TornadoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = 2000; // High density for the tornado look

    class Particle {
      y: number;
      angle: number;
      baseRadius: number;
      speed: number;
      size: number;
      verticalSpeed: number;
      offset: number;

      constructor() {
        this.y = Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;

        // Creates the classic Tornado funnel shape: wide at top, narrow at bottom
        const normalizedY = this.y / height;
        this.baseRadius = 20 + Math.pow(1 - normalizedY, 2.5) * (width * 0.4);

        // Faster rotation at the narrow bottom, slower at the wide top
        this.speed = 0.005 + normalizedY * 0.02;

        this.size = Math.random() * 2;
        this.verticalSpeed = -0.5 - Math.random() * 2; // Moves particles upwards
        this.offset = (Math.random() - 0.5) * 50; // Add chaotic noise
      }

      update() {
        this.angle += this.speed;
        this.y += this.verticalSpeed;

        if (this.y < -50) {
          this.y = height + 50;
          this.angle = Math.random() * Math.PI * 2;
        }
      }

      draw() {
        if (!ctx) return;

        // 3D Projection math
        const x =
          width / 2 + Math.cos(this.angle) * this.baseRadius + this.offset;
        const z = Math.sin(this.angle); // -1 (back) to 1 (front)

        // Depth sorting effect
        const scale = (z + 2) / 3;
        const currentSize = this.size * scale;

        // Gray lightning/dust opacity based on depth
        const opacity = z > 0 ? 0.3 + z * 0.3 : 0.1;

        ctx.beginPath();
        ctx.arc(x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 210, ${opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Trail effect for smooth motion blur
      ctx.fillStyle = "rgba(3, 3, 3, 0.2)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ backgroundColor: "#030303" }}
    />
  );
}
