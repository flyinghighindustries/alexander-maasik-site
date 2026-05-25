import type { AlexanderEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function Approach({ entity, locale }: Props) {
  const s = t(locale);
  const principles = zipParallel({
    title: entity.c_approachTitles ?? [],
    body: entity.c_approachBodies ?? [],
  });
  if (principles.length === 0) return null;

  return (
    <section id="approach" className="border-t border-rule bg-ink text-paper py-20 md:py-28">
      <div className="container-page">
        <h2 className="text-3xl md:text-4xl mb-12 md:mb-16">{s.approach.heading}</h2>
        <ol className="grid md:grid-cols-3 gap-10 md:gap-12">
          {principles.map((p, i) => (
            <li key={p.title}>
              <div className="eyebrow text-paper/60 mb-4">0{i + 1}</div>
              <h3 className="text-xl mb-3 text-paper">{p.title}</h3>
              <p className="text-paper/80 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
