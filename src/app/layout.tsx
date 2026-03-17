import { Amiri, Cormorant_Garamond, Lato, Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { defaultMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/seo";
import "@/styles/globals.css";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/shared/CustomCursor";
import PageTransition from "@/components/PageTransition";

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
          <CustomCursor />
          <NavBar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd()),
            }}
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
