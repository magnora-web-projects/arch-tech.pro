// src/components/shared/ArchitecturalIntro.tsx
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
      const paths = gsap.utils.toArray<SVGPathElement>(".davinci-path");

      // آماده‌سازی خطوط برای انیمیشن رسم شدن
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.9,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800", // طول اسکرول برای انجام کل انیمیشن
          pin: true,
          pinSpacing: true,
          scrub: 1.2, // نرمی اسکرول برای موبایل
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ۱. رسم کادر و پرسپکتیو اتاق (واکنش‌گرا)
      tl.to(".room-path", {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.out",
        stagger: 0.15,
      })
        // ۲. رسم دیتیل‌های مبل و معماری مرکزی
        .to(
          ".furniture-path",
          {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
            stagger: 0.05,
          },
          "-=2",
        )
        // ۳. ظهور متون با کنتراست بالا
        .fromTo(
          ".davinci-char",
          {
            opacity: 0,
            filter: "blur(20px)",
            y: 50,
            scale: 0.9,
            rotationX: 45,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 2,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1.5",
        )
        .fromTo(
          ".davinci-subtitle",
          { opacity: 0, letterSpacing: "0em" },
          {
            opacity: 1,
            letterSpacing: "0.8em",
            duration: 1.5,
            ease: "power2.out",
          },
          "<0.5",
        )
        // ۴. ترانزیشن Zoom Out و فید شدن به سمت Hero Slider
        .to(
          stickyRef.current,
          {
            scale: 0.65, // زوم اوت نرم
            opacity: 0, // محو شدن کامل
            filter: "blur(25px)",
            duration: 2.5,
            ease: "power2.inOut",
          },
          "+=0.5", // مکث کوتاه قبل از خروج
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      // اضافه شدن pointer-events-none کلید حل مشکل کلیک نشدن سایت است
      className="relative w-full h-screen bg-transparent z-[60] pointer-events-none"
    >
      <div
        ref={stickyRef}
        className="absolute inset-0 bg-[#050505] overflow-hidden flex flex-col items-center justify-center will-change-transform"
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
              <stop offset="0%" stopColor="#D4A394" />
              <stop offset="50%" stopColor="#F5E6D3" />
              <stop offset="100%" stopColor="#8A5A44" />
            </linearGradient>
            <linearGradient
              id="grid-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#444444" />
              <stop offset="50%" stopColor="#666666" />
              <stop offset="100%" stopColor="#222222" />
            </linearGradient>
          </defs>
        </svg>

        {/* لایه اول: رسم اتاق سه‌بعدی و کادر (استفاده از preserveAspectRatio="none" برای پوشش کامل و هوشمند موبایل و دسکتاپ) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <g
            filter="url(#davinci-glow)"
            stroke="url(#grid-gradient)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* کادر محیطی بیرون */}
            <path
              className="davinci-path room-path"
              vectorEffect="non-scaling-stroke"
              strokeWidth="1.5"
              d="M 5 5 L 95 5 L 95 95 L 5 95 Z"
            />
            {/* کادر دیوار انتهایی پرسپکتیو */}
            <path
              className="davinci-path room-path"
              vectorEffect="non-scaling-stroke"
              strokeWidth="1"
              d="M 35 35 L 65 35 L 65 65 L 35 65 Z"
            />
            {/* خطوط اتصال پرسپکتیو */}
            <path
              className="davinci-path room-path"
              vectorEffect="non-scaling-stroke"
              strokeWidth="1"
              d="M 5 5 L 35 35 M 95 5 L 65 35 M 5 95 L 35 65 M 95 95 L 65 65"
            />
          </g>
        </svg>

        {/* لایه دوم: رسم جزئیات مبل و معماری (استفاده از preserveAspectRatio="xMidYMid meet" برای جلوگیری از دفرمگی در موبایل) */}
        <svg
          className="absolute w-[90vw] max-w-[700px] h-[90vw] max-h-[700px] opacity-90 mix-blend-screen"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            filter="url(#davinci-glow)"
            stroke="url(#gold-gradient)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* حلقه‌های تناسبات فیبوناچی */}
            <circle
              className="davinci-path furniture-path"
              cx="250"
              cy="250"
              r="160"
              strokeWidth="0.5"
            />
            <circle
              className="davinci-path furniture-path"
              cx="250"
              cy="250"
              r="120"
              strokeWidth="0.5"
              strokeDasharray="4,6"
            />
            <circle
              className="davinci-path furniture-path"
              cx="250"
              cy="250"
              r="80"
              strokeWidth="0.5"
            />

            {/* رسم فریم یک مبل مدرن */}
            <path
              className="davinci-path furniture-path"
              strokeWidth="1.5"
              d="M 120 300 L 380 300 L 420 350 L 80 350 Z"
            />
            <path
              className="davinci-path furniture-path"
              strokeWidth="1.5"
              d="M 150 200 L 350 200 L 380 300 L 120 300 Z"
            />
            <path
              className="davinci-path furniture-path"
              strokeWidth="1"
              d="M 120 300 L 120 420 M 380 300 L 380 420 M 80 350 L 80 450 M 420 350 L 420 450"
            />

            {/* خط کشی‌های مهندسی پایین */}
            <path
              className="davinci-path furniture-path"
              strokeWidth="0.5"
              d="M 50 460 L 450 460 M 250 40 L 250 460"
            />
            <path
              className="davinci-path furniture-path"
              strokeWidth="0.5"
              strokeDasharray="2,4"
              d="M 230 440 L 270 440 M 230 480 L 270 480"
            />
          </g>
        </svg>

        {/* متون مرکزی با کنتراست بهبود یافته */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-12 px-4">
          <h1 className="flex text-[clamp(2.8rem,14vw,10rem)] font-normal text-white tracking-tighter uppercase leading-none drop-shadow-[0_10px_40px_rgba(212,163,148,0.7)]">
            {"ARCH TECH".split("").map((char, i) => (
              <span
                key={i}
                className="davinci-char inline-block will-change-transform transform-style-3d"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="davinci-subtitle absolute -bottom-10 md:-bottom-8 text-[0.65rem] md:text-sm font-semibold text-[#D4A394] uppercase tracking-[1em] will-change-transform drop-shadow-[0_0_20px_rgba(212,163,148,1)]">
            Design The Future
          </div>
        </div>
      </div>
    </section>
  );
}
