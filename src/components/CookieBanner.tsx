import { useEffect, useState } from "react";
import { useAnalytics } from "@yext/pages-components";
import { useConsent } from "@/hooks/useConsent";
import { PolicyDialog } from "@/components/PolicyDialog";
import { t } from "@/i18n";
import type { AlexanderEntity, Locale } from "@/types/entity";

type Props = { entity: AlexanderEntity; locale: Locale };

/**
 * GDPR-compliant cookie consent banner.
 *
 * - Hidden until the consent hook has mounted (SSR-safe; prevents flash).
 * - Two equally-weighted buttons: Accept / Reject. No dark patterns.
 * - Opens the privacy/cookies policy dialog inline.
 * - Rejection sticks — site continues to work; only essential storage
 *   (this very consent record) is set.
 * - Accept → calls Yext analytics.optIn() so AnalyticsProvider starts
 *   firing events. Reject → never call optIn(); events stay blocked.
 * - On mount, if status was previously "accepted" (return visitor), call
 *   optIn() so analytics resume without showing the banner again.
 */
export function CookieBanner({ entity, locale }: Props) {
  const s = t(locale);
  const { status, mounted, accept, reject } = useConsent();
  const analytics = useAnalytics();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Sync analytics opt-in with stored consent on every mount.
  // Safe to call optIn() multiple times — Yext's provider is idempotent.
  useEffect(() => {
    if (status === "accepted") analytics?.optIn?.();
  }, [status, analytics]);

  const handleAccept = () => {
    accept();
    analytics?.optIn?.();
  };

  const showBanner = mounted && status === "unset";

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-heading"
          aria-describedby="cookie-banner-body"
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 md:px-6 md:pb-6"
        >
          <div className="container-page">
            <div className="border border-rule bg-paper shadow-lg rounded-sm">
              <div className="p-6 md:p-7 grid gap-5 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <h2 id="cookie-banner-heading" className="font-serif text-lg mb-2">
                    {s.cookie.heading}
                  </h2>
                  <p id="cookie-banner-body" className="text-sm leading-relaxed text-muted">
                    {s.cookie.body}{" "}
                    <button
                      type="button"
                      onClick={() => setDialogOpen(true)}
                      className="underline hover:text-ink"
                    >
                      {s.cookie.learnMore}
                    </button>
                  </p>
                </div>
                <div className="md:col-span-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={reject}
                    className="btn-secondary !py-2 !px-5 text-sm"
                    autoFocus
                  >
                    {s.cookie.reject}
                  </button>
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="btn-primary !py-2 !px-5 text-sm"
                  >
                    {s.cookie.accept}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PolicyDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        entity={entity}
        locale={locale}
      />
    </>
  );
}
