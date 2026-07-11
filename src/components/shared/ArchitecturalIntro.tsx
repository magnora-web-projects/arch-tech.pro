"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ArchitecturalIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setIsComplete(false);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isComplete ? "auto" : "hidden";
  }, [isComplete]);

  useGSAP(
    () => {
      if (isComplete || !introRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasSeenIntro", "true");
          setIsComplete(true);
        },
      });

      tl.set(maskRef.current, {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      });

      tl.to(sparkRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(sparkRef.current, {
          scaleX: 200,
          scaleY: 0.1,
          duration: 0.8,
          ease: "expo.inOut",
        })
        .to(sparkRef.current, {
          opacity: 0,
          duration: 0.2,
        })
        .to(
          maskRef.current,
          {
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            duration: 1.2,
            ease: "expo.inOut",
          },
          "-=0.2",
        )
        .to(
          imageRef.current,
          {
            scale: 1.1,
            duration: 3,
            ease: "power1.out",
          },
          "-=1.2",
        )
        .to(
          maskRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power4.inOut",
          },
          "-=2",
        )
        .fromTo(
          ".dramatic-char",
          {
            opacity: 0,
            scale: 3,
            filter: "blur(20px)",
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1.2",
        )
        .to(
          textContainerRef.current,
          {
            scale: 1.05,
            duration: 2,
            ease: "none",
          },
          "-=1.2",
        )
        .to(
          introRef.current,
          {
            scale: 8,
            opacity: 0,
            filter: "blur(30px)",
            duration: 1.2,
            ease: "expo.in",
          },
          "+=0.1",
        );
    },
    { scope: introRef, dependencies: [isComplete] },
  );

  if (isComplete) return null;

  const title = "ARCH-TECH";

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[100] w-screen h-screen bg-[#171514] flex items-center justify-center overflow-hidden will-change-transform perspective-[2000px]"
    >
      <div
        ref={sparkRef}
        className="absolute z-30 w-2 h-2 bg-[#D4A394] rounded-full opacity-0 shadow-[0_0_30px_5px_rgba(212,163,148,0.8)] will-change-transform"
      />

      <div
        ref={maskRef}
        className="absolute inset-0 z-10 w-full h-full will-change-transform"
      >
        <Image
          ref={imageRef}
          src="/shared/intro.jpg"
          alt="Intro"
          fill
          className="object-cover opacity-40 mix-blend-luminosity will-change-transform scale-150"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171514] via-transparent to-[#171514] opacity-90" />
      </div>

      <div
        ref={textContainerRef}
        className="relative z-20 flex flex-col items-center justify-center mix-blend-screen will-change-transform"
      >
        <h1 className="flex text-[12vw] md:text-[150px] font-black text-[#F5F5F5] tracking-tighter uppercase leading-none">
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="dramatic-char inline-block will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <div className="dramatic-char mt-6 text-[10px] md:text-sm font-bold text-[#D4A394] uppercase tracking-[0.8em] will-change-transform">
          The Pinnacle of Design
        </div>
      </div>
    </div>
  );
}
