import "./globals.css";
import { Inter } from "next/font/google";

import { RootLayoutProps } from "@/shared/interfaces/common";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
