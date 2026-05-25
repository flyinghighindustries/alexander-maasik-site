import "../index.css";
import type {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import type { AlexanderEntity, Locale } from "@/types/entity";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Work } from "@/components/Work";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { allSchemas, canonicalUrl } from "@/lib/schema";

// Env vars set in the Yext Pages site settings:
//   YEXT_PUBLIC_LOCATION_ENTITY_ID   numeric id returned by POST /v2/.../entities
//   YEXT_PUBLIC_LOCATION_LOCALE_CODE comma-separated locales, e.g. "et,en"
const ENTITY_ID = process.env.YEXT_PUBLIC_LOCATION_ENTITY_ID ?? "";
const LOCALES = (process.env.YEXT_PUBLIC_LOCATION_LOCALE_CODE ?? "et,en")
  .split(",")
  .map((l) => l.trim())
  .filter(Boolean);

export const config: TemplateConfig = {
  name: "alexander-maasik-location",
  stream: {
    $id: "alexander-maasik-stream",
    filter: { entityIds: ENTITY_ID ? [ENTITY_ID] : [] },
    fields: [
      // Identity / built-in
      "id",
      "name",
      "slug",
      "emails",
      "linkedInUrl",
      "facebookPageUrl",
      "twitterHandle",
      // Hero
      "c_tagline",
      "c_heroEyebrow",
      "c_heroSubheadline",
      "c_heroPortrait",
      // About
      "c_aboutMetaLabel",
      "c_aboutPhoto",
      "c_aboutBody",
      // Services
      "c_servicesIntro",
      "c_serviceTitles",
      "c_serviceBodies",
      "c_serviceEmailSubjects",
      // Approach
      "c_approachTitles",
      "c_approachBodies",
      // Selected work
      "c_workIntro",
      "c_caseClients",
      "c_caseResults",
      "c_caseBodies",
      // CTA
      "c_ctaHeadline",
      "c_ctaBody",
      "c_ctaEmailSubject",
      // SEO / schema.org
      "c_jobTitle",
      "c_expertise",
      "c_yearsExperience",
      "c_favicon",
      "c_ogImage",
    ],
    localization: { locales: LOCALES, primary: false },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // Yext's recommended pattern: build URL from the entity's slug field.
  // See: https://hitchhikers.yext.com/docs/pages/multiple-language-support/
  //
  // In Yext UI, set the slug field per language profile:
  //   - Estonian (primary, root URL):  leave slug empty → falls through to "index"
  //   - English alternate (/en):       set slug to "en"
  if (document.slug) return document.slug;
  const locale = (document.meta?.locale ?? "et") as Locale;
  return locale === "et" ? "index" : `${locale}/${document.id}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({ document }): HeadConfig => {
  const doc = document as TemplateRenderProps["document"] & AlexanderEntity;
  const locale = (doc.meta?.locale ?? "et") as Locale;
  const tagline = doc.c_tagline ?? doc.name;
  const title = `${doc.name} — ${tagline}`;
  const description = doc.c_heroSubheadline ?? "";

  const ogImage =
    doc.c_ogImage?.image?.url ??
    doc.c_heroPortrait?.image?.url ??
    "";
  const faviconUrl = doc.c_favicon?.image?.url;

  // Build the three JSON-LD blobs once per page render
  const schemas = allSchemas(doc, locale);

  return {
    title,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    lang: locale,
    tags: [
      { type: "meta", attributes: { name: "description", content: description } },
      { type: "meta", attributes: { name: "robots", content: "index,follow" } },
      { type: "meta", attributes: { name: "author", content: doc.name } },

      // Open Graph
      { type: "meta", attributes: { property: "og:title", content: title } },
      { type: "meta", attributes: { property: "og:description", content: description } },
      { type: "meta", attributes: { property: "og:type", content: "website" } },
      { type: "meta", attributes: { property: "og:url", content: canonicalUrl(locale) } },
      { type: "meta", attributes: { property: "og:locale", content: locale === "et" ? "et_EE" : "en_US" } },
      ...(ogImage ? [{ type: "meta" as const, attributes: { property: "og:image", content: ogImage } }] : []),

      // Twitter card
      { type: "meta", attributes: { name: "twitter:card", content: "summary_large_image" } },
      { type: "meta", attributes: { name: "twitter:title", content: title } },
      { type: "meta", attributes: { name: "twitter:description", content: description } },
      ...(ogImage ? [{ type: "meta" as const, attributes: { name: "twitter:image", content: ogImage } }] : []),

      // Canonical + hreflang
      { type: "link", attributes: { rel: "canonical", href: canonicalUrl(locale) } },
      { type: "link", attributes: { rel: "alternate", hreflang: "et", href: canonicalUrl("et") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "en", href: canonicalUrl("en") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "x-default", href: canonicalUrl("et") } },

      // Favicon
      ...(faviconUrl
        ? [{ type: "link" as const, attributes: { rel: "icon", href: faviconUrl } }]
        : []),

      // schema.org JSON-LD (Person + ProfessionalService + WebSite)
      ...schemas.map((schema) => ({
        type: "script" as const,
        attributes: { type: "application/ld+json" },
        children: JSON.stringify(schema),
      })),
    ],
  };
};

type Doc = TemplateRenderProps["document"] & AlexanderEntity;

const LocationTemplate = ({ document }: TemplateRenderProps) => {
  const doc = document as Doc;
  const locale = (doc.meta?.locale ?? "et") as Locale;

  return (
    <div className="min-h-screen flex flex-col">
      <Header entity={doc} locale={locale} />
      <main className="flex-1">
        <Hero entity={doc} locale={locale} />
        <Services entity={doc} locale={locale} />
        <About entity={doc} locale={locale} />
        <Approach entity={doc} locale={locale} />
        <Work entity={doc} locale={locale} />
        <CTA entity={doc} locale={locale} />
      </main>
      <Footer entity={doc} locale={locale} />
    </div>
  );
};

export default LocationTemplate;
