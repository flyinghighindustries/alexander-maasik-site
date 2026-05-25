import type { AlexanderEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function Services({ entity, locale }: Props) {
  const s = t(locale);
  const email = entity.emails[0];

  const services = zipParallel({
    title: entity.c_serviceTitles ?? [],
    body: entity.c_serviceBodies ?? [],
    emailSubject: entity.c_serviceEmailSubjects ?? [],
  });

  if (services.length === 0) return null;

  return (
    <section id="services" className="border-t border-rule py-20 md:py-28">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          <h2 className="md:col-span-5 text-3xl md:text-4xl">{s.services.heading}</h2>
          <p className="md:col-span-7 text-muted text-lg max-w-prose">{s.services.intro}</p>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((svc) => (
            <li
              key={svc.title}
              className="border border-rule p-8 flex flex-col justify-between bg-paper hover:border-ink transition-colors"
            >
              <div>
                <h3 className="text-xl mb-4">{svc.title}</h3>
                <p className="text-muted leading-relaxed">{svc.body}</p>
              </div>
              <a
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium no-underline hover:text-accent"
                href={`mailto:${email}?subject=${encodeURIComponent(svc.emailSubject ?? s.cta.subject)}`}
              >
                {s.services.ctaLabel}
                <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
