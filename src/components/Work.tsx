import type { AlexanderEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function Work({ entity, locale }: Props) {
  const s = t(locale);
  const cases = zipParallel({
    client: entity.c_caseClients ?? [],
    result: entity.c_caseResults ?? [],
    body: entity.c_caseBodies ?? [],
  });
  if (cases.length === 0) return null;

  return (
    <section id="work" className="border-t border-rule py-20 md:py-28">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          <h2 className="md:col-span-5 text-3xl md:text-4xl">{s.work.heading}</h2>
          <p className="md:col-span-7 text-muted text-lg max-w-prose">{entity.c_workIntro}</p>
        </div>
        <ul className="divide-y divide-rule border-y border-rule">
          {cases.map((c) => (
            <li key={c.client} className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10">
              <div className="md:col-span-4">
                <p className="eyebrow mb-2">{c.client}</p>
                <p className="font-serif text-xl tracking-tight2">{c.result}</p>
              </div>
              <p className="md:col-span-8 text-muted leading-relaxed max-w-prose">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
