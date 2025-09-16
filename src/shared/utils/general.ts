import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const getBaseUrl = ({
  headersList,
}: {
  headersList?: Headers | ReadonlyHeaders;
}) => {
  if (typeof window !== "undefined") return window.location.origin;

  const host = headersList?.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  return host ? `${protocol}://${host}` : "";
};

export function generateLocaleCookie({locale}: {locale: string}) {
  return {
    name: 'NEXTJS_LOCALE',
    value: locale,
    options: {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  };
}