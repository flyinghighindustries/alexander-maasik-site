import type { AlexanderEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function About({ entity, locale }: Props) {
  const s = t(locale);
  return (
    <section id="about" className="border-t border-rule py-20 md:py-28">
      <div className="container-page grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        {entity.c_aboutPhoto?.image?.url && (
          <div className="md:col-span-5">
            <div className="aspect-square w-full overflow-hidden rounded-sm bg-rule">
              <img
                src={entity.c_aboutPhoto.image.url}
                alt={entity.c_aboutPhoto.image.alternateText ?? entity.name}
                width={entity.c_aboutPhoto.image.width}
                height={entity.c_aboutPhoto.image.height}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
        <div className="md:col-span-7">
          <p className="eyebrow mb-4">{entity.c_aboutMetaLabel}</p>
          <h2 className="text-3xl md:text-4xl mb-6">{s.about.heading}</h2>
          <p className="text-lg leading-relaxed text-ink/90 max-w-prose whitespace-pre-line">
            {entity.c_aboutBody}
          </p>
        </div>
      </div>
    </section>
  );
}
