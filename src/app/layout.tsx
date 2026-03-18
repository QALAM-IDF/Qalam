import { Amiri, Cormorant_Garamond, Lato, Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { defaultMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/seo";
import "@/styles/globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { SkipLink } from "@/components/ui/SkipLink";
import { SentryUserProvider } from "@/components/SentryUserProvider";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  ...defaultMetadata,
  description:
    "Qalam — L'arabe, la clé d'un nouveau monde. Cours d'arabe en ligne pour hommes, femmes et enfants. Tous niveaux, du débutant au coranique. Formations éligibles CPF.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${amiri.variable} ${cormorant.variable} ${lato.variable} ${nunito.variable} antialiased`}>
          <SentryUserProvider />
          <SkipLink />
          <CustomCursor />
          <ConditionalLayout>{children}</ConditionalLayout>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd()),
            }}
            strategy="afterInteractive"
          />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
