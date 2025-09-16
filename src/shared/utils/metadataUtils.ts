import { Metadata } from "next";

import { BRANDING } from "@/shared/constants/general";

import translationUtilsValues from "./translationsUtils";

export const generateMetadata = async (input?: {
  pageName?: string;
}): Promise<Metadata> => {
  const { pageName = "mainPageTitle" } = input || {};

  const { t } = await translationUtilsValues();
  const { websiteName, websiteDescription, faviconPath } = await BRANDING();

  return {
    title: `${websiteName}${
      pageName !== "mainPageTitle" ? ` - ${t(`${pageName}.title`)}` : ""
    }`,
    description:
      pageName !== "mainPageTitle"
        ? t(`${pageName}.description`)
        : websiteDescription,
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: faviconPath,
          href: faviconPath,
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: faviconPath,
          href: faviconPath,
        },
      ],
    },
  };
};
