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

// Env vars set in the Yext Pages site settings:
//   YEXT_PUBLIC_LOCATION_ENTITY_ID   numeric id returned by POST /v2/.../entities
//   YEXT_PUBLIC_LOCATION_LOCALE_CODE comma-separated locales, e.g. "en,et"
const ENTITY_ID = process.env.YEXT_PUBLIC_LOCATION_ENTITY_ID ?? "";
const LOCALES = (process.env.YEXT_PUBLIC_LOCATION_LOCALE_CODE ?? "en,et")
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
      "emails",
      "linkedInUrl",
      "facebookPageUrl",
      "twitterHandle",
      // Content (custom)
      "c_tagline",
      "c_heroSubheadline",
      "c_heroPortrait",
      "c_aboutPhoto",
      "c_aboutBody",
      "c_serviceTitles",
      "c_serviceBodies",
      "c_serviceEmailSubjects",
      "c_approachTitles",
      "c_approachBodies",
      "c_caseClients",
      "c_caseResults",
      "c_caseBodies",
      "c_ctaHeadline",
      "c_ctaBody",
    ],
    localization: { locales: LOCALES, primary: false },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const locale = (document.meta?.locale ?? "en") as Locale;
  // English at root, alternates under /<locale>/ — matches Sendoplex pattern.
  return locale === "en" ? "index.html" : `${locale}/index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({ document }): HeadConfig => {
  const locale = (document.meta?.locale ?? "en") as Locale;
  const tagline = document.c_tagline ?? document.name;
  const title = `${document.name} — ${tagline}`;
  return {
    title,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    lang: locale,
    tags: [
      { type: "meta", attributes: { name: "description", content: document.c_heroSubheadline ?? "" } },
      { type: "meta", attributes: { property: "og:title", content: title } },
      { type: "meta", attributes: { property: "og:description", content: document.c_heroSubheadline ?? "" } },
      { type: "meta", attributes: { property: "og:type", content: "website" } },
      { type: "meta", attributes: { name: "robots", content: "index,follow" } },
    ],
  };
};

type Doc = TemplateRenderProps["document"] & AlexanderEntity;

export default function LocationTemplate({ document }: TemplateRenderProps) {
  const doc = document as Doc;
  const locale = (doc.meta?.locale ?? "en") as Locale;

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
}
