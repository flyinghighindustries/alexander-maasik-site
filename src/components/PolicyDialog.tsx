import { useEffect, useRef, useState } from "react";
import { t } from "@/i18n";
import type { AlexanderEntity, Locale } from "@/types/entity";

type Props = {
  open: boolean;
  onClose: () => void;
  entity: AlexanderEntity;
  locale: Locale;
  /** Which tab to focus on open. Defaults to "privacy". */
  initialTab?: "privacy" | "cookies";
};

type Tab = "privacy" | "cookies";

/**
 * Accessible modal showing privacy and cookies policy content from Yext.
 *
 * - Tab-controlled (Privacy / Cookies)
 * - Closes on Escape key or backdrop click
 * - Restores focus on close
 * - Body scroll locked while open
 */
export function PolicyDialog({ open, onClose, entity, locale, initialTab = "privacy" }: Props) {
  const s = t(locale);
  const [tab, setTab] = useState<Tab>(initialTab);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  // Body scroll lock + focus management
  useEffect(() => {
    if (!open) return;
    if (typeof document === "undefined") return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Move focus into the dialog
    requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const privacyContent = entity.c_privacyPolicyContent ?? s.policy.privacyFallback;
  const cookiesContent = entity.c_cookiesContent ?? s.policy.cookiesFallback;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={(e) => {
        // Click on backdrop closes; clicks inside dialog don't
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60" aria-hidden />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-dialog-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[85vh] bg-paper border border-rule rounded-sm shadow-2xl flex flex-col focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4 p-6 md:p-7 border-b border-rule">
          <div>
            <h2 id="policy-dialog-title" className="font-serif text-2xl tracking-tight2 mb-3">
              {s.policy.heading}
            </h2>
            <nav className="flex gap-2 text-sm" aria-label={s.policy.tabsAriaLabel}>
              <button
                type="button"
                onClick={() => setTab("privacy")}
                aria-pressed={tab === "privacy"}
                className={`px-3 py-1.5 border rounded-sm transition-colors ${
                  tab === "privacy"
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {s.policy.privacyTab}
              </button>
              <button
                type="button"
                onClick={() => setTab("cookies")}
                aria-pressed={tab === "cookies"}
                className={`px-3 py-1.5 border rounded-sm transition-colors ${
                  tab === "cookies"
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {s.policy.cookiesTab}
              </button>
            </nav>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={s.policy.close}
            className="text-muted hover:text-ink text-2xl leading-none shrink-0"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-7">
          <div className="prose-policy text-sm leading-relaxed whitespace-pre-line">
            {tab === "privacy" ? privacyContent : cookiesContent}
          </div>
        </div>
      </div>
    </div>
  );
}
