"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ArchitecturalIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isComplete]);

  useGSAP(
    () => {
      if (!introRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
        },
      });

      tl.to([line1Ref.current, line2Ref.current], {
        scaleX: 1,
        scaleY: 1,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
      });

      const progress = { value: 0 };
      tl.to(
        progress,
        {
          value: 100,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.innerText = Math.round(progress.value) + "%";
            }
          },
        },
        "-=1.5",
      );

      tl.fromTo(
        img1Ref.current,
        { y: -100, opacity: 0, scale: 1.2 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" },
        "-=1.5",
      );
      tl.fromTo(
        img2Ref.current,
        { y: 100, opacity: 0, scale: 1.2 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" },
        "-=1.2",
      );

      tl.fromTo(
        [text1Ref.current, text2Ref.current],
        { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=1",
      );

      tl.to({}, { duration: 0.5 });

      tl.to(introRef.current, {
        xPercent: -100,
        duration: 1.5,
        ease: "power4.inOut",
      });
    },
    { scope: introRef },
  );

  if (isComplete) return null;

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[100] w-screen h-screen bg-[#050505] flex items-center justify-center overflow-hidden will-change-transform"
    >
      <div
        ref={line1Ref}
        className="absolute top-1/4 left-0 w-full h-[1px] bg-white/10 scale-x-0 origin-left"
      />
      <div
        ref={line2Ref}
        className="absolute top-0 left-1/3 w-[1px] h-full bg-white/10 scale-y-0 origin-top"
      />

      <div
        ref={img1Ref}
        className="absolute top-10 right-10 w-[300px] h-[400px] opacity-0 overflow-hidden rounded-xl border border-white/5"
      >
        <Image
          src="/home/marketing.jpg"
          alt="Intro Texture"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale opacity-40"
        />
      </div>

      <div
        ref={img2Ref}
        className="absolute bottom-10 left-10 w-[400px] h-[250px] opacity-0 overflow-hidden rounded-xl border border-white/5"
      >
        <Image
          src="/home/floor-1.jpg"
          alt="Intro Texture"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale opacity-40"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center mix-blend-difference text-white">
        <div className="absolute -top-16 font-mono text-sm tracking-widest text-orange-500">
          LOADING <span ref={counterRef}>0%</span>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={text1Ref}
            className="text-6xl md:text-[120px] font-black tracking-tighter leading-none"
          >
            ARCH-TECH
          </h1>
        </div>
        <div className="overflow-hidden mt-2">
          <span
            ref={text2Ref}
            className="text-lg md:text-2xl font-light tracking-[0.5em] text-gray-400 uppercase"
          >
            Interior Architecture
          </span>
        </div>
      </div>
    </div>
  );
}
