import { useCallback, useEffect, useState } from "react";

/**
 * GDPR-compliant cookie consent state.
 *
 * Bump CONSENT_VERSION when the privacy/cookies policy materially changes —
 * existing users will be shown the banner again to re-consent.
 *
 * Version history:
 *   v1 — initial release; no tracking at all
 *   v2 — added Yext Analytics (first-party pageview/click tracking,
 *        gated on consent)
 */
export const CONSENT_VERSION = 2;
const STORAGE_KEY = "alexander-maasik:consent";

export type ConsentStatus = "accepted" | "rejected" | "unset";

type StoredConsent = {
  status: Exclude<ConsentStatus, "unset">;
  version: number;
  timestamp: number;
};

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || typeof parsed.version !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(status: Exclude<ConsentStatus, "unset">): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredConsent = {
      status,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* localStorage disabled (private mode, quota); fall through */
  }
}

/**
 * Returns the current consent decision plus setters.
 *
 * SSR-safe: returns { status: "unset", mounted: false } on first server
 * render to avoid hydration mismatch. The banner component reads `mounted`
 * to decide when to actually render.
 *
 * If you ever load tracking scripts (GA, FB pixel, etc), gate them on
 * `status === "accepted"` — never load before consent.
 */
export function useConsent() {
  const [status, setStatus] = useState<ConsentStatus>("unset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = readStored();
    if (stored && stored.version === CONSENT_VERSION) {
      setStatus(stored.status);
    } else {
      // No record, or policy version bumped — leave status as "unset".
      setStatus("unset");
    }
  }, []);

  const accept = useCallback(() => {
    writeStored("accepted");
    setStatus("accepted");
  }, []);

  const reject = useCallback(() => {
    writeStored("rejected");
    setStatus("rejected");
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    setStatus("unset");
  }, []);

  return { status, mounted, accept, reject, reset };
}
