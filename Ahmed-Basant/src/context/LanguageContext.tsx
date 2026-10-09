import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { translations, type TranslationKey } from '@/data/translations';
import { defaultContent } from '@/data/defaultContent';

export type Language = 'ar' | 'en';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'ab_lang_pref';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'en' || saved === 'ar' ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  const setLang = (newLang: Language) => setLangState(newLang);
  const toggleLang = () => setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const t = (key: TranslationKey) =>
    translations[lang][key] ?? translations.ar[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export type { TranslationKey };
export { defaultContent };
