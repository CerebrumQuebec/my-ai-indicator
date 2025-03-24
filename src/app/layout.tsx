import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WizardProvider } from "../contexts/WizardContext";
import { TranslationProvider } from "../contexts/TranslationContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Badge AI",
  description: "Evaluate your level of AI usage in your creative works",
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
          </WizardProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
