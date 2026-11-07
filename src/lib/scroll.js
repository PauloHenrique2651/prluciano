let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollToHash(hash, immediate = false) {
  const el = hash && document.getElementById(hash.replace("#", ""));
  if (!el) return false;
  const offset = -76;
  if (lenis) lenis.scrollTo(el, { offset, immediate, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: immediate ? "auto" : "smooth" });
  return true;
}

export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
