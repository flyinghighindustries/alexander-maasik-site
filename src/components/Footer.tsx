import type { AlexanderEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function Footer({ entity, locale }: Props) {
  const s = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule py-10">
      <div className="container-page flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-muted">
        <p>© {year} {entity.name}. {s.footer.rights}</p>
        <ul className="flex flex-wrap items-center gap-6">
          {entity.linkedInUrl && (
            <li><a href={entity.linkedInUrl} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-ink">LinkedIn</a></li>
          )}
          {entity.facebookPageUrl && (
            <li><a href={entity.facebookPageUrl} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-ink">Facebook</a></li>
          )}
          {entity.twitterHandle && (
            <li><a href={`https://twitter.com/${entity.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-ink">X / Twitter</a></li>
          )}
          <li><a href={`mailto:${entity.emails[0]}`} className="no-underline hover:text-ink">Email</a></li>
        </ul>
      </div>
      <p className="container-page text-xs text-muted/70 mt-4">{s.footer.builtOn}</p>
    </footer>
  );
}
