import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getBaseUrl } from "@/shared/utils/general";
import { SITE_MAP_LINKS } from "@/shared/utils/PATHS";

export default function sitemap(): MetadataRoute.Sitemap {
  const headersList = headers() as unknown as Headers;
  const BASE_URL = getBaseUrl({ headersList });

  return Object.values(SITE_MAP_LINKS).map(
    ({ url, priority, changeFrequency, lastModified }) => ({
      url: `${BASE_URL}${url}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );
}
