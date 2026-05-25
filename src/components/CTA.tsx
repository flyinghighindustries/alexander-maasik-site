import type { AlexanderEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function CTA({ entity, locale }: Props) {
  const s = t(locale);
  const email = entity.emails[0];
  const subject = encodeURIComponent(entity.c_ctaEmailSubject ?? "");

  return (
    <section id="contact" className="border-t border-rule py-24 md:py-32">
      <div className="container-page text-center">
        <h2 className="text-3xl md:text-5xl mb-6 max-w-3xl mx-auto">{entity.c_ctaHeadline}</h2>
        <p className="text-muted text-lg max-w-prose mx-auto mb-10">{entity.c_ctaBody}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a className="btn-primary" href={`mailto:${email}?subject=${subject}`}>{s.cta.primary}</a>
          <span className="text-muted text-sm">{s.cta.or}</span>
          {entity.linkedInUrl && (
            <a className="btn-secondary" href={entity.linkedInUrl} target="_blank" rel="noopener noreferrer">
              {s.cta.linkedIn}
            </a>
          )}
        </div>
        <p className="mt-10 text-sm text-muted">
          <a href={`mailto:${email}`} className="no-underline hover:text-ink">{email}</a>
        </p>
      </div>
    </section>
  );
}
