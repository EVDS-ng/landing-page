import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const commission = localFont({
  src: [
    {
      path: "../../public/fonts/Commissioner-VariableFont_wght (1).ttf",
      style: "normal",
    },
  ],
  variable: "--font-commission",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Everyday Surprises - Birthday Savings & Celebration Platform",
  description:
    "Save for birthdays, invite contributions, and let trusted vendors handle everything. Join 100+ Nigerians planning unforgettable birthdays in Lagos.",
  keywords: [
    "birthday planning",
    "birthday savings",
    "birthday celebration",
    "party planning Nigeria",
    "Lagos events",
    "birthday vendors",
    "birthday savings",
    "celebration planning",
    "party coordination",
    "Nigerian birthdays",
  ],
  authors: [{ name: "Everyday Surprises Team" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Everyday Surprises - Birthday Savings & Celebration Platform",
    description:
      "Save for birthdays, invite contributions, and let trusted vendors handle everything. Join 100+ Nigerians planning unforgettable birthdays in Lagos.",
    images: ["/og.png"],
    type: "website",
    siteName: "Everyday Surprises",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyday Surprises - Stop wishing. Start celebrating.",
    description:
      "Save for birthdays, invite contributions, and let trusted vendors handle everything. Join the waitlist for ₦2,000 bonus!",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#072147",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${commission.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-B2RXRGTT8S`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B2RXRGTT8S');
          `}
        </Script>
      </body>
    </html>
  );
}
