"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ArchitecturalIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isComplete ? "auto" : "hidden";
  }, [isComplete]);

  useGSAP(
    () => {
      if (!introRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => setIsComplete(true),
      });

      tl.to(vLineRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: "expo.inOut",
      })
        .to(
          hLineRef.current,
          {
            scaleX: 1,
            duration: 0.6,
            ease: "expo.inOut",
          },
          "-=0.4",
        )
        .to(
          [vLineRef.current, hLineRef.current],
          {
            rotate: 45,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "+=0.1",
        )
        .to(
          shapeRef.current,
          {
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.6",
        )
        .fromTo(
          ".char-letter",
          {
            y: (i) => (i % 2 === 0 ? -100 : 100),
            opacity: 0,
            rotateX: 90,
            rotateY: (i) => (i % 2 === 0 ? -45 : 45),
            z: -500,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "back.out(2)",
          },
          "-=0.4",
        )
        .to(
          shapeRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            rotate: -45,
            scale: 1.5,
            duration: 1.2,
            ease: "power4.inOut",
          },
          "+=0.3",
        )
        .to(
          ".char-letter",
          {
            z: 1000,
            opacity: 0,
            scale: 5,
            filter: "blur(20px)",
            stagger: {
              amount: 0.2,
              from: "center",
            },
            duration: 0.8,
            ease: "power3.in",
          },
          "-=1.2",
        )
        .to(
          [vLineRef.current, hLineRef.current],
          {
            opacity: 0,
            scale: 0,
            duration: 0.4,
          },
          "-=1",
        )
        .to(
          introRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "none",
          },
          "-=0.2",
        );
    },
    { scope: introRef },
  );

  if (isComplete) return null;

  const title = "ARCH-TECH";

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[100] w-screen h-screen bg-[#020202] flex items-center justify-center overflow-hidden will-change-transform perspective-[1500px]"
    >
      <div
        ref={vLineRef}
        className="absolute w-[1px] h-full bg-orange-500/50 scale-y-0 origin-center z-10"
      />
      <div
        ref={hLineRef}
        className="absolute w-full h-[1px] bg-orange-500/50 scale-x-0 origin-center z-10"
      />

      <div
        ref={shapeRef}
        className="absolute inset-0 z-20 flex items-center justify-center will-change-transform"
        style={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
      >
        <Image
          src="/shared/intro.jpg"
          alt="Intro"
          fill
          className="object-cover opacity-60 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-[#020202]/40" />
      </div>

      <div
        ref={textWrapperRef}
        className="relative z-30 flex items-center justify-center mix-blend-difference"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h1
          className="flex text-[10vw] md:text-[130px] font-black text-white tracking-tighter uppercase"
          style={{ transformStyle: "preserve-3d" }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="char-letter inline-block will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
