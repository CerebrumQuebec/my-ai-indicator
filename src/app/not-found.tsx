"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-card">
      <div className="text-center p-8">
        <h1 className="text-8xl font-bold mb-4 text-white">404</h1>
        <div className="w-px h-12 bg-white/20 mx-auto mb-4"></div>
        <h2 className="text-2xl font-medium text-white mb-4">
          Page introuvable
        </h2>
        <p className="text-white/80 mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-white font-medium"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
