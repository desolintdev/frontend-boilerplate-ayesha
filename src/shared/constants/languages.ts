import {LocalLanguages} from '@/shared/interfaces/languages';

export const localLanguages: LocalLanguages = {
  nl: {value: 'nl', label: 'Dutch', flag: 'nl'},
  en: {value: 'en', label: 'English', flag: 'gb'},
};

export const locales = Object.keys(localLanguages);
