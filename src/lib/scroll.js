let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

const OFFSET = -76;

// Instant jumps set the native scroll position and keep Lenis in sync, so they work even
// when animation frames are paused (background tabs, slow phones).
function jump(y) {
  window.scrollTo(0, y);
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
}

export function scrollToHash(hash, immediate = false) {
  const el = hash && document.getElementById(hash.replace("#", ""));
  if (!el) return false;
  if (immediate) {
    jump(Math.max(0, el.getBoundingClientRect().top + window.scrollY + OFFSET));
    return true;
  }
  if (lenis) lenis.scrollTo(el, { offset: OFFSET, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + OFFSET, behavior: "smooth" });
  return true;
}

export function scrollTop() {
  jump(0);
}
