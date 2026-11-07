// Touch devices get the same choreography as desktop, with GPU-friendly variants of the
// effects that are expensive on phones (blur filters, scroll-linked clip-path, blend modes).
export const IS_TOUCH =
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

// The client wants the full motion experience everywhere, including on phones that have
// "remove animations" / battery-saver turned on (which reports prefers-reduced-motion).
export function useReducedMotion() {
  return false;
}

/** Blur only where it's cheap (desktop GPUs); phones get the same move without the filter. */
export const blurIn = (px) => (IS_TOUCH ? {} : { filter: `blur(${px}px)` });
export const blurOut = IS_TOUCH ? {} : { filter: "blur(0px)" };
