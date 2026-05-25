export type Locale = "en" | "et";

export type YextImageRef = {
  url: string;
  width?: number;
  height?: number;
  alternateText?: string;
};
// Yext image fields wrap the actual image one level deep under `.image`.
export type YextImage = {
  image: YextImageRef;
};

/**
 * Shape of the `location` entity once the Yext stream resolves.
 * Parallel-list fields are zipped at render time (Sendoplex pattern — structs
 * aren't available in all Yext accounts).
 */
export type AlexanderEntity = {
  // Identity / built-in
  id: string;
  name: string;
  slug?: string;
  emails: string[];
  linkedInUrl?: string;
  facebookPageUrl?: string;
  twitterHandle?: string;

  // Hero
  c_tagline: string;
  c_heroEyebrow: string;
  c_heroSubheadline: string;
  c_heroPortrait?: YextImage;

  // About
  c_aboutMetaLabel: string;
  c_aboutPhoto?: YextImage;
  c_aboutBody: string;

  // Services (parallel lists, zipped in <Services />)
  c_servicesIntro: string;
  c_serviceTitles: string[];
  c_serviceBodies: string[];
  c_serviceEmailSubjects: string[];

  // Approach (parallel lists, zipped in <Approach />)
  c_approachTitles: string[];
  c_approachBodies: string[];

  // Selected work (parallel lists, zipped in <Work />)
  c_workIntro: string;
  c_caseClients: string[];
  c_caseResults: string[];
  c_caseBodies: string[];

  // Closing CTA
  c_ctaHeadline: string;
  c_ctaBody: string;
  c_ctaEmailSubject: string;

  // SEO / schema.org
  c_jobTitle: string;
  c_expertise: string[];
  c_yearsExperience?: string;
  c_favicon?: YextImage;
  c_ogImage?: YextImage;

  meta: { locale: Locale };
};

/** Zip a record-of-parallel-arrays into an array of records. */
export function zipParallel<T extends Record<string, readonly unknown[]>>(
  columns: T,
): Array<{ [K in keyof T]: T[K][number] }> {
  const keys = Object.keys(columns) as Array<keyof T>;
  const length = Math.max(...keys.map((k) => columns[k]?.length ?? 0));
  return Array.from({ length }, (_, i) => {
    const row = {} as { [K in keyof T]: T[K][number] };
    for (const k of keys) row[k] = columns[k]?.[i];
    return row;
  });
}
