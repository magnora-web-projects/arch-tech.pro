export const WORKFLOW_CONFIG = {
  TRANSITION_MULTIPLIER: 1.4,
  PANEL_B_INITIAL: { autoAlpha: 0.55, scale: 0.94 },
  PANEL_A_TARGET: { scale: 0.9, autoAlpha: 0.32, filter: "blur(6px)" },
  PANEL_B_TARGET: { scale: 1, autoAlpha: 1, filter: "blur(0px)" },
  SEAM_TIMING: {
    FADE_IN_START: 0.32,
    FADE_IN_DURATION: 0.22,
    FADE_OUT_START: 0.56,
    FADE_OUT_DURATION: 0.22,
  },
  SEAM_STYLE: {
    background:
      "linear-gradient(to bottom, transparent, rgba(212,163,148,0.85), transparent)",
    boxShadow: "0 0 24px rgba(212,163,148,0.5)",
  },
};
