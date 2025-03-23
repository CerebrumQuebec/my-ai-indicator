import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WizardProvider } from "../contexts/WizardContext";
import { TranslationProvider } from "../contexts/TranslationContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Badge",
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
        className={`${inter.className} min-h-screen bg-gradient-to-b from-surface-dark to-surface-card text-text-primary`}
      >
        <TranslationProvider>
          <WizardProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </WizardProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
