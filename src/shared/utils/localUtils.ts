import {locales, localLanguages} from '@/shared/constants/languages';
import {LanguageOption} from '@/shared/interfaces/languages';
import {getFutureDate} from '@/shared/utils/dateUtils';

export const setLanguageCookieInBrowser = ({
  language,
}: {
  language: string;
}): void => {
  const expires = getFutureDate({days: 30});
  document.cookie = `NEXTJS_LOCALE=${language};expires=${expires};path=/`;
};

export const getCurrentLanguage = ({
  currentLocale,
}: {
  currentLocale: string;
}): LanguageOption | null => {
  const currentLanguageKey = Object.keys(localLanguages).find(
    (key) => localLanguages[key].value === currentLocale
  );

  if (!currentLanguageKey) return null;

  return {
    value: localLanguages[currentLanguageKey].value,
    label: localLanguages[currentLanguageKey].label,
    flag: localLanguages[currentLanguageKey].flag,
  };
};

export const getLanguageOptions = (): LanguageOption[] => {
  return locales.map((language) => ({
    value: localLanguages[language].value,
    label: localLanguages[language].label,
    flag: localLanguages[language].flag,
  }));
};
