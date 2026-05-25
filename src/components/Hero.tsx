import type { AlexanderEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function Hero({ entity, locale }: Props) {
  const s = t(locale);
  const email = entity.emails[0];
  const subject = encodeURIComponent(s.cta.subject);

  return (
    <section className="container-page pt-16 md:pt-28 pb-20 md:pb-32">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6">{s.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-6xl leading-[1.05] mb-6">{entity.c_tagline}</h1>
          <p className="text-lg md:text-xl text-muted max-w-prose mb-10">{entity.c_heroSubheadline}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a className="btn-primary" href={`mailto:${email}?subject=${subject}`}>{s.hero.primaryCta}</a>
            <a className="btn-secondary" href="#approach">{s.hero.secondaryCta}</a>
          </div>
        </div>
        {entity.c_heroPortrait?.image?.url && (
          <div className="md:col-span-5">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-rule">
              <img
                src={entity.c_heroPortrait.image.url}
                alt={entity.c_heroPortrait.image.alternateText ?? entity.name}
                width={entity.c_heroPortrait.image.width}
                height={entity.c_heroPortrait.image.height}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
