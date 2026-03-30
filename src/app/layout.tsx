import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";

import { JsonLdWebsite } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — developer, designer, builder`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — developer, designer, builder`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — developer, designer, builder`,
    description: SITE_DESCRIPTION,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col items-center overflow-x-hidden bg-[var(--bg)] font-body leading-relaxed text-fg">
        <JsonLdWebsite />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh w-full max-w-portfolio flex-col px-[clamp(1.25rem,5vw,1.75rem)]">
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>
            <Nav />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
