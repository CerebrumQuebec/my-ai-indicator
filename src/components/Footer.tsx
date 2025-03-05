"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-dark border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-8 mb-4 md:mb-0">
            <Link
              href="/about"
              className="text-text-primary hover:text-primary-400 transition-colors font-medium"
            >
              À propos
            </Link>
            <Link
              href="/privacy"
              className="text-text-primary hover:text-primary-400 transition-colors font-medium"
            >
              Confidentialité
            </Link>
            <Link
              href="/contact"
              className="text-text-primary hover:text-primary-400 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
          <div className="text-text-secondary text-sm">
            <p>
              © {currentYear} Indicateur d&apos;Utilisation de l&apos;IA. Tous
              droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
