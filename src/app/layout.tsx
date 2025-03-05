import "./globals.css";
import type { Metadata, Viewport } from "next";
import { WizardProvider } from "../contexts/WizardContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Indicateur d'Utilisation de l'IA",
  description:
    "Évaluez votre niveau d'utilisation de l'IA dans vos créations musicales et textuelles",
  keywords: [
    "IA",
    "intelligence artificielle",
    "musique",
    "texte",
    "création",
    "indicateur",
  ],
  authors: [{ name: "Indicateur IA Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#121827",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-b from-surface-dark to-surface-card text-text-primary">
        <WizardProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </WizardProvider>
      </body>
    </html>
  );
}
