import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

export const locales = { ru, en } as const;
export type LocaleCode = keyof typeof locales;
export type Messages = typeof ru;

const defaultLocale: LocaleCode = 'ru';

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce<Record<string, string>>((acc, key) => {
    const val = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') return { ...acc, [path]: val };
    if (val && typeof val === 'object') return { ...acc, ...flatten(val as Record<string, unknown>, path) };
    return acc;
  }, {});
}

const flatCache = new Map<LocaleCode, Record<string, string>>();

function getMessages(locale: LocaleCode): Record<string, string> {
  if (!flatCache.has(locale)) {
    flatCache.set(locale, flatten(locales[locale] as unknown as Record<string, unknown>));
  }
  return flatCache.get(locale)!;
}

export function t(locale: LocaleCode, key: string, params?: Record<string, string | number>): string {
  const messages = getMessages(locale);
  let text = messages[key];
  if (text === undefined || text === '') {
    text = messages[key] || key;
  }
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}

export function getDefaultLocale(): LocaleCode {
  return defaultLocale;
}

export function isLocaleAvailable(code: string): code is LocaleCode {
  return code in locales;
}
