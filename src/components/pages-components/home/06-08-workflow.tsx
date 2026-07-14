"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhatWeDoSection from "./06-what-we-do";
import InteractiveProcess from "../../interactive-components/home/HowWeWork";
import { ProcessStep } from "@/src/lib";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkFlow({ steps }: { steps: ProcessStep[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelARef = useRef<HTMLDivElement>(null);
  const panelBRef = useRef<HTMLDivElement>(null);

  const panelAContentRef = useRef<HTMLDivElement>(null);
  const panelBContentRef = useRef<HTMLDivElement>(null);

  const seamRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const panelA = panelARef.current;
    const panelB = panelBRef.current;
    const panelAContent = panelAContentRef.current;
    const panelBContent = panelBContentRef.current;
    const seam = seamRef.current;

    if (
      !wrapper ||
      !track ||
      !panelA ||
      !panelB ||
      !panelAContent ||
      !panelBContent
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(track, { xPercent: 0 });
      gsap.set(panelB, { autoAlpha: 0.55, scale: 0.94 });
      if (seam) gsap.set(seam, { autoAlpha: 0 });

      const winH = window.innerHeight;
      const overflowA = Math.max(0, panelAContent.scrollHeight - winH);
      const overflowB = Math.max(0, panelBContent.scrollHeight - winH);
      const transitionDistance = winH * 1.4;

      const totalDistance = overflowA + transitionDistance + overflowB;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${totalDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let time = 0;

      if (overflowA > 0) {
        tl.to(
          panelAContent,
          { y: -overflowA, ease: "none", duration: overflowA },
          time,
        );
        time += overflowA;
      }

      tl.to(
        track,
        { xPercent: -50, ease: "none", duration: transitionDistance },
        time,
      )
        .to(
          panelA,
          {
            scale: 0.9,
            autoAlpha: 0.32,
            filter: "blur(6px)",
            ease: "none",
            duration: transitionDistance,
          },
          time,
        )
        .to(
          panelB,
          {
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: transitionDistance,
          },
          time,
        );

      if (seam) {
        tl.to(
          seam,
          { autoAlpha: 1, duration: transitionDistance * 0.22 },
          time + transitionDistance * 0.32,
        ).to(
          seam,
          { autoAlpha: 0, duration: transitionDistance * 0.22 },
          time + transitionDistance * 0.56,
        );
      }

      time += transitionDistance;

      if (overflowB > 0) {
        tl.to(
          panelBContent,
          { y: -overflowB, ease: "none", duration: overflowB },
          time,
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="flex flex-col w-full">
        <WhatWeDoSection />
        <InteractiveProcess steps={steps} />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: "200vw" }}
      >
        <div
          ref={panelARef}
          className="relative h-full w-screen flex items-start will-change-transform overflow-hidden"
        >
          <div
            ref={panelAContentRef}
            className="w-full flex flex-col justify-center min-h-screen will-change-transform"
          >
            <WhatWeDoSection />
          </div>
        </div>

        <div
          ref={panelBRef}
          className="relative h-full w-screen flex items-start will-change-transform overflow-hidden"
        >
          <div
            ref={panelBContentRef}
            className="w-full flex flex-col justify-center min-h-screen will-change-transform"
          >
            <InteractiveProcess steps={steps} />
          </div>
        </div>
      </div>

      <div
        ref={seamRef}
        className="absolute top-0 bottom-0 left-1/2 w-px opacity-0 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,163,148,0.85), transparent)",
          boxShadow: "0 0 24px rgba(212,163,148,0.5)",
        }}
      />
    </div>
  );
}
