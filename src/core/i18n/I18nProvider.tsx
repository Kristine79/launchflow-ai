import { type ReactNode, createContext, useContext } from 'react';
import { t, getDefaultLocale, type LocaleCode, type Messages } from '@/locales';
import ru from '@/locales/ru.json';

interface I18nContextValue {
  locale: LocaleCode;
  t: (key: string, params?: Record<string, string | number>) => string;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'ru',
  t: (key) => key,
  messages: ru,
});

export function useLocale() {
  return useContext(I18nContext);
}

interface I18nProviderProps {
  children: ReactNode;
  locale?: LocaleCode;
}

export function I18nProvider({ children, locale = getDefaultLocale() }: I18nProviderProps) {
  const translate = (key: string, params?: Record<string, string | number>) => t(locale, key, params);

  return (
    <I18nContext.Provider value={{ locale, t: translate, messages: ru }}>
      {children}
    </I18nContext.Provider>
  );
}
