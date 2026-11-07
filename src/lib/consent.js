// Cookie / storage consent (LGPD & GDPR style): nothing optional runs until the visitor chooses.
// Essential storage (remembering this choice) is always allowed.
//
// To add analytics later, gate it like this:
//   import { onConsent } from "./lib/consent.js";
//   onConsent("analytics", () => { /* inject the analytics script here */ });

const KEY = "ee-consent";
const VERSION = 1;
const listeners = new Set();

export const CATEGORIES = [
  {
    key: "essential",
    name: "Essential",
    text: "Needed for the site to work, such as remembering this choice. Always on.",
    locked: true,
  },
  {
    key: "analytics",
    name: "Analytics",
    text: "Anonymous statistics about how pages are used, so we can improve the site.",
  },
  {
    key: "marketing",
    name: "Marketing",
    text: "Used to measure campaigns and show relevant content on other platforms.",
  },
];

export function readConsent() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    return v && v.version === VERSION ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(choices) {
  const value = { version: VERSION, date: new Date().toISOString(), essential: true, analytics: !!choices.analytics, marketing: !!choices.marketing };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  listeners.forEach((fn) => fn(value));
  return value;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Run `fn` once the visitor has allowed `category` (now, or whenever they do). */
export function onConsent(category, fn) {
  const now = readConsent();
  if (now?.[category]) return fn();
  const off = subscribe((v) => {
    if (v[category]) {
      off();
      fn();
    }
  });
}

/** Opens the preferences panel from anywhere (e.g. the footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event("ee-open-cookies"));
}
