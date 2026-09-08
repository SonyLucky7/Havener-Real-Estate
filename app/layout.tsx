import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans, Amiri, Cairo } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Havener Property | Dubai Luxury Real Estate & Investment",
  description:
    "Discover luxury real estate, off-plan opportunities, villas, apartments and investment-focused properties in Dubai with Havener Property.",
  keywords: [
    "Dubai luxury real estate",
    "Havener Property",
    "Palm Jumeirah villas",
    "Dubai off-plan investments",
    "Dubai waterfront residences",
    "HNWI property Dubai",
    "Dubai Golden Visa real estate",
  ],
  authors: [{ name: "Havener Property Advisory" }],
  openGraph: {
    title: "Havener Property | Dubai Luxury Real Estate & Investment",
    description:
      "Curated luxury residences, off-plan opportunities, and strategic property investments in Dubai's premier destinations.",
    url: "https://havenerproperty.com",
    siteName: "Havener Property",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Havener Property Dubai Luxury Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Havener Property | Dubai Luxury Real Estate & Investment",
    description: "Curated luxury residences and strategic property investments across Dubai.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://havenerproperty.com",
    languages: {
      "en-US": "https://havenerproperty.com",
      "ar-AE": "https://havenerproperty.com?lang=ar",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakartaSans.variable} ${amiri.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* RealEstateAgent Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Havener Property",
              description:
                "Dubai Luxury Real Estate and Private Investment Advisory connecting international buyers and investors with high-value properties.",
              url: "https://havenerproperty.com",
              areaServed: ["Dubai", "United Arab Emirates", "Ras Al Khaimah"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressRegion: "Dubai",
                addressCountry: "AE",
              },
              priceRange: "$$$$",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0A0E24] font-sans selection:bg-[#E8922D]/20 selection:text-[#0A0E24]">
        {children}
      </body>
    </html>
  );
}
