"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKFLOW_CONFIG } from "@/src/lib";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkFlowRefs {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  panelARef: React.RefObject<HTMLDivElement | null>;
  panelBRef: React.RefObject<HTMLDivElement | null>;
  panelAContentRef: React.RefObject<HTMLDivElement | null>;
  panelBContentRef: React.RefObject<HTMLDivElement | null>;
  seamRef: React.RefObject<HTMLDivElement | null>;
}

export function useWorkFlowAnimation({
  wrapperRef,
  trackRef,
  panelARef,
  panelBRef,
  panelAContentRef,
  panelBContentRef,
  seamRef,
}: WorkFlowRefs) {
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
      gsap.set(panelB, WORKFLOW_CONFIG.PANEL_B_INITIAL);
      if (seam) gsap.set(seam, { autoAlpha: 0 });

      const winH = window.innerHeight;
      const overflowA = Math.max(0, panelAContent.scrollHeight - winH);
      const overflowB = Math.max(0, panelBContent.scrollHeight - winH);
      const transitionDistance = winH * WORKFLOW_CONFIG.TRANSITION_MULTIPLIER;

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
            ...WORKFLOW_CONFIG.PANEL_A_TARGET,
            ease: "none",
            duration: transitionDistance,
          },
          time,
        )
        .to(
          panelB,
          {
            ...WORKFLOW_CONFIG.PANEL_B_TARGET,
            ease: "none",
            duration: transitionDistance,
          },
          time,
        );

      if (seam) {
        const {
          FADE_IN_START,
          FADE_IN_DURATION,
          FADE_OUT_START,
          FADE_OUT_DURATION,
        } = WORKFLOW_CONFIG.SEAM_TIMING;
        tl.to(
          seam,
          { autoAlpha: 1, duration: transitionDistance * FADE_IN_DURATION },
          time + transitionDistance * FADE_IN_START,
        ).to(
          seam,
          { autoAlpha: 0, duration: transitionDistance * FADE_OUT_DURATION },
          time + transitionDistance * FADE_OUT_START,
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

  return { reducedMotion };
}
