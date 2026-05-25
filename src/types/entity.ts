export type Locale = "en" | "et";

export type YextImage = {
  url: string;
  alternateText?: string;
  width?: number;
  height?: number;
};

/**
 * Shape of the location entity once the Yext stream resolves.
 * Parallel-list fields are zipped at render time (Sendoplex pattern — structs
 * aren't available in all Yext accounts).
 */
export type AlexanderEntity = {
  id: string;
  name: string;
  emails: string[];
  linkedInUrl?: string;
  facebookPageUrl?: string;
  twitterHandle?: string;

  // Hero
  c_tagline: string;
  c_heroSubheadline: string;
  c_heroPortrait?: YextImage;

  // About
  c_aboutPhoto?: YextImage;
  c_aboutBody: string;

  // Services (parallel lists, zipped in <Services />)
  c_serviceTitles: string[];
  c_serviceBodies: string[];
  c_serviceEmailSubjects: string[];

  // Approach (parallel lists, zipped in <Approach />)
  c_approachTitles: string[];
  c_approachBodies: string[];

  // Selected work (parallel lists, zipped in <Work />)
  c_caseClients: string[];
  c_caseResults: string[];
  c_caseBodies: string[];

  // Closing CTA
  c_ctaHeadline: string;
  c_ctaBody: string;

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
