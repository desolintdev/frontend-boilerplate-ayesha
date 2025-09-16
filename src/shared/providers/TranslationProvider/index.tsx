"use client";

import { I18nextProvider } from "react-i18next";

import initializeTranslations, { i18nInstance } from "@/i18n";
import { TranslationsProviderProps } from "@/shared/interfaces/translations";

function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  initializeTranslations({ locale, resources, namespaces });

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

export default TranslationsProvider;
