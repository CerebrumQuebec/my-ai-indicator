import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WizardProvider } from "../contexts/WizardContext";
import { TranslationProvider } from "../contexts/TranslationContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://badgeai.org"),
  title: "Badge AI - AI Usage Transparency System",
  description:
    "Badge AI helps you communicate the level of AI involvement in your creative works with transparency and clarity. Evaluate your AI usage in audio, visual, and textual content.",
  keywords: [
    "AI badge",
    "AI transparency",
    "creative works",
    "AI usage",
    "content creation",
    "AI evaluation",
  ],
  authors: [{ name: "Philippe Bourque", url: "https://cerebrum.website" }],
  creator: "Cerebrum",
  publisher: "Cerebrum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://badgeai.org",
    siteName: "Badge AI",
    title: "Badge AI - AI Usage Transparency System",
    description:
      "Badge AI helps you communicate the level of AI involvement in your creative works with transparency and clarity. Evaluate your AI usage in audio, visual, and textual content.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Badge AI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badge AI - AI Usage Transparency System",
    description:
      "Badge AI helps you communicate the level of AI involvement in your creative works with transparency and clarity.",
    images: ["/logo.png"],
    creator: "@MonsieurBourque",
    site: "@MonsieurBourque",
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
  alternates: {
    canonical: "https://badgeai.org",
    languages: {
      "en-US": "https://badgeai.org",
      "fr-FR": "https://badgeai.org",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-surface-dark via-surface-dark/90 to-surface-card text-text-primary`}
      >
        <div className="fixed inset-0 -z-10 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <div className="fixed -top-40 -right-40 h-80 w-80 rounded-full bg-primary-500 opacity-20 blur-[100px]"></div>
        <div className="fixed -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-indigo opacity-20 blur-[100px]"></div>

        <TranslationProvider>
          <WizardProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-20 pb-12 px-4 sm:px-6">
                {children}
              </main>
              <Footer />
            </div>
            <AnalyticsTracker />
          </WizardProvider>
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}
