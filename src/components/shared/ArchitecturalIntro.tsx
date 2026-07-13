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
      // استفاده از ویژگی قدرتمند pathLength="100" در SVG باعث می‌شود
      // طول تمام خطوط فارغ از اندازه صفحه نمایش دقیقا 100 در نظر گرفته شود.
      gsap.set(".davinci-path", {
        strokeDasharray: 100,
        strokeDashoffset: 100,
        opacity: 0.9,
      });

      // تایم‌لاین بدون استفاده از Pin (فقط بر اساس اسکرول روی ارتفاع 500vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          scrub: 1.2, // فوق‌العاده نرم برای تاچ موبایل
        },
      });

      // ۱. رسم کادر دور صفحه و خطوط پرسپکتیو به سمت مرکز
      tl.to(".bg-grid-path", {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        stagger: 0.1,
      })
        // ۲. رسم طاق، مبل و تناسبات طلایی در مرکز
        .to(
          ".masterpiece-path",
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=1.5",
        )
        // ۳. ظهور متون باوقار و سه‌بعدی
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
            duration: 2,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=2.5",
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
          "<0.5",
        )
        // ۴. شیرجه سینمایی به قلب صفحه
        .to(
          stickyRef.current,
          {
            scale: 25, // زوم بسیار عمیق برای عبور از وسط طاق و مبل
            duration: 3.5,
            ease: "expo.in",
          },
          "+=0.2",
        )
        // ۵. جادوی نهایی: Fade ریز و سوسکی!
        // این انیمیشن دقیقا در لحظه‌ای اجرا می‌شود که Hero Slider زیر آن پارک شده است.
        .to(
          stickyRef.current,
          {
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=1.5", // همزمان با بخش انتهایی زوم محو می‌شود
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      // جادوی CSS: ارتفاع سکشن 500vh است اما مارجین پایین 200vh- دارد.
      // این یعنی اسلایدر بعدی دقیقا از ارتفاع 300vh شروع به بالا آمدن می‌کند
      // و چون خودش هم پین می‌شود، این دو لایه روی هم قرار می‌گیرند تا یک ترانزیشن نامرئی بسازند.
      className="relative w-full h-[200vh] bg-transparent z-[60] -mb-[200vh]"
    >
      <div
        ref={stickyRef}
        // استفاده از Sticky به جای Pin برای جلوگیری از باگ‌های پرش اسکرول
        className="sticky top-0 w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center will-change-transform transform-gpu"
      >
        {/* تعاریف افکت‌های نوری و رنگی */}
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

        {/* --- لایه اول: کادرکشی دور تا دور صفحه و خطوط پرسپکتیو کاملا ریسپانسیو --- */}
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
            {/* کادر محیطی (5 درصد فاصله از لبه‌ها در هر دیوایسی) */}
            <rect
              className="davinci-path bg-grid-path"
              x="5%"
              y="5%"
              width="90%"
              height="90%"
              pathLength="100"
              stroke="url(#gold-gradient)"
              strokeWidth="1.5"
            />

            {/* خطوط پرسپکتیو از ۴ گوشه به مرکز */}
            <line
              className="davinci-path bg-grid-path"
              x1="5%"
              y1="5%"
              x2="50%"
              y2="50%"
              pathLength="100"
              strokeWidth="1"
            />
            <line
              className="davinci-path bg-grid-path"
              x1="95%"
              y1="5%"
              x2="50%"
              y2="50%"
              pathLength="100"
              strokeWidth="1"
            />
            <line
              className="davinci-path bg-grid-path"
              x1="5%"
              y1="95%"
              x2="50%"
              y2="50%"
              pathLength="100"
              strokeWidth="1"
            />
            <line
              className="davinci-path bg-grid-path"
              x1="95%"
              y1="95%"
              x2="50%"
              y2="50%"
              pathLength="100"
              strokeWidth="1"
            />

            {/* کادر داخلی انتهای اتاق */}
            <rect
              className="davinci-path bg-grid-path"
              x="35%"
              y="35%"
              width="30%"
              height="30%"
              pathLength="100"
              strokeWidth="0.5"
              strokeDasharray="5,5"
            />
          </g>
        </svg>

        {/* --- لایه دوم: بوم هنری مینیمال مرکزی (بدون دفرمگی در موبایل) --- */}
        <svg
          className="absolute w-full h-full max-w-[900px] max-h-[900px] pointer-events-none opacity-90 mix-blend-screen p-4 md:p-0"
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
            {/* طاق کلاسیک رنسانس */}
            <path
              className="davinci-path masterpiece-path"
              pathLength="100"
              strokeWidth="2"
              d="M 200 1000 L 200 450 A 300 300 0 0 1 800 450 L 800 1000"
            />
            <path
              className="davinci-path masterpiece-path"
              pathLength="100"
              strokeWidth="1"
              strokeDasharray="4,8"
              d="M 250 1000 L 250 450 A 250 250 0 0 1 750 450 L 750 1000"
            />

            {/* خطوط آویز مرکزی */}
            <line
              className="davinci-path masterpiece-path"
              pathLength="100"
              x1="500"
              y1="150"
              x2="500"
              y2="350"
              strokeWidth="1"
            />
            <path
              className="davinci-path masterpiece-path"
              pathLength="100"
              strokeWidth="1.5"
              d="M 450 350 L 550 350 L 500 420 Z"
            />

            {/* تناسبات طلایی حول مبل */}
            <circle
              className="davinci-path masterpiece-path"
              pathLength="100"
              cx="500"
              cy="700"
              r="200"
              strokeWidth="0.5"
            />
            <circle
              className="davinci-path masterpiece-path"
              pathLength="100"
              cx="500"
              cy="700"
              r="150"
              strokeWidth="0.5"
              strokeDasharray="4,6"
            />

            {/* مبل مینیمال معماری */}
            <path
              className="davinci-path masterpiece-path"
              pathLength="100"
              strokeWidth="1.5"
              d="M 350 750 L 420 680 L 580 680 L 650 750"
            />
            <line
              className="davinci-path masterpiece-path"
              pathLength="100"
              x1="380"
              y1="750"
              x2="400"
              y2="850"
              strokeWidth="1.5"
            />
            <line
              className="davinci-path masterpiece-path"
              pathLength="100"
              x1="620"
              y1="750"
              x2="600"
              y2="850"
              strokeWidth="1.5"
            />
            <path
              className="davinci-path masterpiece-path"
              pathLength="100"
              strokeWidth="1.5"
              d="M 420 680 L 380 550 A 50 50 0 0 1 620 550 L 580 680"
            />

            {/* خطوط راهنمای مهندسی */}
            <line
              className="davinci-path masterpiece-path"
              pathLength="100"
              x1="280"
              y1="880"
              x2="720"
              y2="880"
              strokeWidth="0.5"
            />
            <line
              className="davinci-path masterpiece-path"
              pathLength="100"
              x1="300"
              y1="860"
              x2="300"
              y2="900"
              strokeWidth="0.5"
            />
            <line
              className="davinci-path masterpiece-path"
              pathLength="100"
              x1="700"
              y1="860"
              x2="700"
              y2="900"
              strokeWidth="0.5"
            />
          </g>
        </svg>

        {/* تایپوگرافی سه‌بعدی */}
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
