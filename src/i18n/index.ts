import { en } from "./en";
import { et } from "./et";
import type { Locale } from "@/types/entity";

export const strings = { en, et };

export function t(locale: Locale) {
  return strings[locale] ?? strings.en;
}
