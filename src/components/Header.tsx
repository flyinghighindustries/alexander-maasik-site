import type { AlexanderEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: AlexanderEntity; locale: Locale };

export function Header({ entity, locale }: Props) {
  const s = t(locale);
  const email = entity.emails[0];
  // Estonian (primary) lives at /, English alternate at /en/index.html.
  // Yext's CDN does NOT auto-rewrite /en/ → /en/index.html, so the href must
  // include the explicit filename to match what getPath() emits.
  // If you change either side, change both — getPath() lives in
  // src/templates/location.tsx.
  const otherLocale: Locale = locale === "et" ? "en" : "et";
  const otherLocaleHref = otherLocale === "et" ? "/" : `/${otherLocale}/index.html`;
  const selfHref = locale === "et" ? "/" : `/${locale}/index.html`;

  return (
    <header className="border-b border-rule bg-paper/90 backdrop-blur sticky top-0 z-30">
      <div className="container-page flex items-center justify-between py-4">
        <a href={selfHref} className="font-serif text-lg tracking-tight2 no-underline">
          {entity.name}
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#services" className="no-underline hover:text-accent">{s.nav.services}</a>
          <a href="#about" className="no-underline hover:text-accent">{s.nav.about}</a>
          <a href="#approach" className="no-underline hover:text-accent">{s.nav.approach}</a>
          <a href="#work" className="no-underline hover:text-accent">{s.nav.work}</a>
          <a href={`mailto:${email}`} className="no-underline hover:text-accent">{s.nav.contact}</a>
          <a href={otherLocaleHref} aria-label={s.nav.langSwitchLabel} className="text-muted no-underline hover:text-ink">
            {s.nav.langSwitch}
          </a>
        </nav>
        <a href={`mailto:${email}`} className="md:hidden btn-primary !px-4 !py-2 text-xs">
          {s.nav.contact}
        </a>
      </div>
    </header>
  );
}
