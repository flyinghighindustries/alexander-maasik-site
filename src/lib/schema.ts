import type { AlexanderEntity, Locale } from "@/types/entity";

const SITE_DOMAIN = "https://alexandermaasik.com";

/** Absolute canonical URL for this locale's page. */
export function canonicalUrl(locale: Locale): string {
  return locale === "et" ? `${SITE_DOMAIN}/` : `${SITE_DOMAIN}/${locale}`;
}

/** schema.org Person JSON-LD — Alexander himself. */
export function personSchema(entity: AlexanderEntity, locale: Locale) {
  const sameAs = [
    entity.linkedInUrl,
    entity.facebookPageUrl,
    entity.twitterHandle ? `https://twitter.com/${entity.twitterHandle}` : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: entity.name,
    jobTitle: entity.c_jobTitle,
    description: entity.c_tagline,
    email: `mailto:${entity.emails?.[0] ?? ""}`,
    image: entity.c_heroPortrait?.image?.url,
    url: canonicalUrl(locale),
    knowsAbout: entity.c_expertise ?? [],
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tallinn",
      addressCountry: "EE",
    },
    worksFor: {
      "@type": "Organization",
      name: "Nobel Digital OÜ",
      url: "https://nobeldigital.ee",
    },
  };
}

/** schema.org ProfessionalService JSON-LD — his consulting offering. */
export function professionalServiceSchema(entity: AlexanderEntity, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${entity.name} — Marketing Consulting`,
    provider: { "@type": "Person", name: entity.name },
    areaServed: "Worldwide",
    serviceType: entity.c_expertise ?? entity.c_serviceTitles ?? [],
    url: canonicalUrl(locale),
    image: entity.c_heroPortrait?.image?.url,
    description: entity.c_tagline,
    email: `mailto:${entity.emails?.[0] ?? ""}`,
  };
}

/** schema.org WebSite JSON-LD — enables sitelinks search box, declares locales. */
export function websiteSchema(entity: AlexanderEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: entity.name,
    url: SITE_DOMAIN,
    inLanguage: ["et", "en"],
  };
}

/** Build all three JSON-LD blobs as a single array. */
export function allSchemas(entity: AlexanderEntity, locale: Locale) {
  return [
    personSchema(entity, locale),
    professionalServiceSchema(entity, locale),
    websiteSchema(entity),
  ];
}
