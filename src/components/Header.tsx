"use client";

import React from "react";
import Link from "next/link";
import { useWizard } from "../contexts/WizardContext";

const Header: React.FC = () => {
  const { setStep, setMusicCategory, setTextCategory } = useWizard();

  const handleReset = () => {
    setStep(1);
    setMusicCategory(null);
    setTextCategory(null);
  };

  return (
    <header className="w-full bg-surface-dark border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <Link
            href="/"
            onClick={handleReset}
            className="flex items-center text-2xl font-bold text-text-primary mb-4 md:mb-0 hover:text-primary-400 transition-colors"
          >
            <span className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg mr-3">
              ℹ️
            </span>
            Indicateur d&apos;Utilisation de l&apos;IA
          </Link>

          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/"
                  className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
