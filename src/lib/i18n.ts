// src/lib/i18n.ts
import i18next from "i18next";

/**
 * Type-safe translation helper for dynamic content
 * @param key Translation key
 * @param defaultValue Fallback if translation is not found
 */
export function getDynamicTranslation(
  key: string,
  defaultValue: string
): string {
  const translated = i18next.t(key, { defaultValue });
  return translated;
}
