"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArchitecturalIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial Setup
      gsap.set(".davinci-path", {
        strokeDasharray: 100,
        strokeDashoffset: 100,
        opacity: 0.9,
      });

      // Prepare the interior to be hidden and slightly scaled down initially
      gsap.set(".interior-group", {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "50% 60%",
      });

      // Prepare the arch transform origin for accurate scaling
      gsap.set(".arch-group", { transformOrigin: "500px 700px" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          pin: true,
          scrub: 1, // Reduced scrub delay slightly for a tighter feel
        },
      });

      // --- PHASE 1: Draw the Gateway ---
      tl.to(".bg-grid-path", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.1,
      })
        .to(
          ".arch-path",
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=1",
        )

        // --- PHASE 2: Push Through The Door ---
        .addLabel("pushThrough")
        .to(
          ".arch-group",
          {
            scale: 15, // Massively scale to swallow the screen
            opacity: 0,
            duration: 2.5,
            ease: "power2.in",
          },
          "pushThrough",
        )

        // --- PHASE 3: Reveal The Room & Text ---
        .to(
          ".interior-group",
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power2.out",
          },
          "pushThrough+=0.5",
        )
        .to(
          ".interior-path",
          {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.out",
            stagger: 0.04,
          },
          "pushThrough+=0.5",
        )

        // Text appears rapidly as you enter the room
        .fromTo(
          ".davinci-char",
          {
            opacity: 0,
            filter: "blur(20px)",
            y: 50,
            scale: 0.8,
            rotationX: 45,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          "pushThrough+=0.8",
        )
        .fromTo(
          ".davinci-subtitle",
          { opacity: 0, letterSpacing: "0.2em", y: 20 },
          {
            opacity: 1,
            letterSpacing: "0.8em",
            y: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          "<0.3",
        )

        // Final fade out
        .to(
          stickyRef.current,
          {
            scale: 1.5,
            opacity: 0,
            filter: "blur(20px)",
            duration: 2,
            ease: "power2.inOut",
          },
          "+=0.5",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[250vh] bg-transparent -mb-[250vh] z-[-1] pointer-events-none"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen bg-[#05050576] overflow-hidden flex flex-col items-center justify-center will-change-transform transform-gpu"
      >
        <svg className="absolute w-0 h-0">
          <defs>
            <filter
              id="davinci-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id="gold-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8A5A44" />
              <stop offset="50%" stopColor="#D4A394" />
              <stop offset="100%" stopColor="#F5E6D3" />
            </linearGradient>
            <linearGradient
              id="grid-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#333333" />
              <stop offset="50%" stopColor="#555555" />
              <stop offset="100%" stopColor="#111111" />
            </linearGradient>
          </defs>
        </svg>

        {/* BACKGROUND GRID */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="url(#grid-gradient)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              className="davinci-path bg-grid-path"
              x="5%"
              y="5%"
              width="90%"
              height="90%"
              pathLength="100"
              strokeWidth="1.5"
            />
            <line
              className="davinci-path bg-grid-path"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              pathLength="100"
              strokeWidth="0.5"
            />
            <line
              className="davinci-path bg-grid-path"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
              pathLength="100"
              strokeWidth="0.5"
            />
          </g>
        </svg>

        {/* MAIN BLUEPRINT CANVAS */}
        <svg
          className="absolute w-full h-full pointer-events-none opacity-90 mix-blend-screen overflow-visible"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            filter="url(#davinci-glow)"
            stroke="url(#gold-gradient)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* --- THE GATEWAY ARCH --- */}
            <g className="arch-group">
              {/* Thick Outer Door Frame */}
              <path
                className="davinci-path arch-path"
                pathLength="100"
                strokeWidth="3"
                d="M 180 1000 L 180 400 A 320 320 0 0 1 820 400 L 820 1000"
              />
              {/* Inner Door Frame */}
              <path
                className="davinci-path arch-path"
                pathLength="100"
                strokeWidth="1"
                strokeDasharray="4,8"
                d="M 230 1000 L 230 400 A 270 270 0 0 1 770 400 L 770 1000"
              />
            </g>

            {/* --- THE INTERIOR ROOM --- */}
            <g className="interior-group">
              {/* Deep Kitchen Background */}
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="0.8"
                d="M 350 450 L 650 450 L 650 550 L 350 550 Z"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="350"
                y1="500"
                x2="650"
                y2="500"
                strokeWidth="0.5"
                strokeDasharray="2,4"
              />
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1"
                d="M 460 450 L 540 450 L 520 400 L 480 400 Z"
              />

              {/* Kitchen Island */}
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1.5"
                d="M 400 600 L 600 600 L 650 660 L 350 660 Z"
              />
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1.5"
                d="M 350 660 L 650 660 L 650 720 L 350 720 Z"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="450"
                y1="660"
                x2="450"
                y2="720"
                strokeWidth="0.8"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="550"
                y1="660"
                x2="550"
                y2="720"
                strokeWidth="0.8"
              />

              {/* Perspective Carpet */}
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1"
                d="M 220 950 L 780 950 L 620 760 L 380 760 Z"
              />
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="0.5"
                strokeDasharray="3,3"
                d="M 240 930 L 760 930 L 610 770 L 390 770 Z"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="300"
                y1="950"
                x2="440"
                y2="760"
                strokeWidth="0.5"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="700"
                y1="950"
                x2="560"
                y2="760"
                strokeWidth="0.5"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="280"
                y1="880"
                x2="720"
                y2="880"
                strokeWidth="0.5"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="330"
                y1="820"
                x2="670"
                y2="820"
                strokeWidth="0.5"
              />

              {/* Left Chair */}
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1"
                d="M 160 720 L 220 700 L 220 620 L 160 640 Z"
              />
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1.5"
                d="M 160 720 L 220 700 L 250 760 L 190 780 Z"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="160"
                y1="720"
                x2="160"
                y2="800"
                strokeWidth="1"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="220"
                y1="700"
                x2="220"
                y2="770"
                strokeWidth="1"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="250"
                y1="760"
                x2="250"
                y2="850"
                strokeWidth="1"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="190"
                y1="780"
                x2="190"
                y2="870"
                strokeWidth="1"
              />

              {/* Right Chair */}
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1"
                d="M 840 720 L 780 700 L 780 620 L 840 640 Z"
              />
              <path
                className="davinci-path interior-path"
                pathLength="100"
                strokeWidth="1.5"
                d="M 840 720 L 780 700 L 750 760 L 810 780 Z"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="840"
                y1="720"
                x2="840"
                y2="800"
                strokeWidth="1"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="780"
                y1="700"
                x2="780"
                y2="770"
                strokeWidth="1"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="750"
                y1="760"
                x2="750"
                y2="850"
                strokeWidth="1"
              />
              <line
                className="davinci-path interior-path"
                pathLength="100"
                x1="810"
                y1="780"
                x2="810"
                y2="870"
                strokeWidth="1"
              />
            </g>
          </g>
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none mt-16 px-4">
          <h1 className="flex text-[clamp(2.8rem,14vw,10rem)] font-thin text-white tracking-tighter uppercase leading-none drop-shadow-[0_10px_30px_rgba(212,163,148,0.4)]">
            {"ARCH TECH".split("").map((char, i) => (
              <span
                key={i}
                className="davinci-char inline-block will-change-transform transform-style-3d"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="davinci-subtitle absolute -bottom-12 md:-bottom-10 text-[0.65rem] md:text-sm font-light text-[#D4A394] uppercase tracking-[1em] will-change-transform drop-shadow-[0_0_15px_rgba(212,163,148,0.6)]">
            Design The Future
          </div>
        </div>
      </div>
    </section>
  );
}
