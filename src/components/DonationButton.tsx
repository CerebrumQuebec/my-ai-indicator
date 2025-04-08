"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "../contexts/TranslationContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface DonateButtonProps {
  compact?: boolean;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  showButton?: boolean;
  locale?: string;
}

export default function DonateButton({
  compact = false,
  className = "",
  isOpen,
  onOpenChange,
  showButton = true,
  locale = "fr",
}: DonateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("5");
  const [isSubscription, setIsSubscription] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { t } = useTranslation();

  // Modal state management
  const isControlled = isOpen !== undefined;
  const isModalOpen = isControlled ? isOpen : internalIsOpen;
  const handleModalChange = (newState: boolean) => {
    if (isControlled) {
      onOpenChange?.(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  const handleDonateClick = async () => {
    try {
      setLoading(true);
      const finalAmount = customAmount || amount;
      const response = await fetch("/api/create-donation-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(finalAmount),
          isSubscription,
          success_url: `${window.location.origin}/donation/success`,
          cancel_url: window.location.href,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={() => handleModalChange(true)}
          className={`px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all duration-300 shadow-md hover:shadow-lg font-medium transform hover:-translate-y-0.5 ${className}`}
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.464 3.314a2 2 0 012.122 0l7 4.9A2 2 0 0120 9.864V20a2 2 0 01-2 2H6a2 2 0 01-2-2V9.864a2 2 0 01.414-1.65l7-4.9zM12 15a3 3 0 100-6 3 3 0 000 6z"
                fill="currentColor"
              />
            </svg>
            {t("donate")}
          </span>
        </button>
      )}

      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] animate-fadeIn"
            onClick={() => handleModalChange(false)}
          >
            {/* Modal Container */}
            <div className="min-h-screen px-4 text-center">
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block w-full max-w-md align-middle animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-4 p-6 bg-surface-dark/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      <span className="animated-gradient-text">
                        {t("donateTitle")}
                      </span>
                    </h3>
                    <button
                      onClick={() => handleModalChange(false)}
                      className="text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-surface-card/50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Donation Type Toggle */}
                  <div className="flex gap-2 p-1 bg-surface-card rounded-lg">
                    <button
                      onClick={() => setIsSubscription(false)}
                      className={`flex-1 py-2 px-3 rounded-md transition-all ${
                        !isSubscription
                          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-dark/50"
                      }`}
                    >
                      {t("oneTimeDonation")}
                    </button>
                    <button
                      onClick={() => setIsSubscription(true)}
                      className={`flex-1 py-2 px-3 rounded-md transition-all ${
                        isSubscription
                          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-dark/50"
                      }`}
                    >
                      {t("monthlyDonation")}
                    </button>
                  </div>

                  {/* Donation Amount Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-text-primary">
                      {t("amount")}
                    </label>
                    {/* Predefined Amounts */}
                    <div className="grid grid-cols-2 gap-2">
                      {["1", "5", "10", "20"].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => {
                            setAmount(preset);
                            setCustomAmount("");
                          }}
                          className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                            amount === preset && !customAmount
                              ? "bg-gradient-to-r from-primary-500/80 to-primary-600/80 text-white shadow-md transform -translate-y-0.5"
                              : "bg-surface-card text-text-secondary hover:text-text-primary hover:bg-surface-dark/70 hover:-translate-y-0.5"
                          }`}
                        >
                          {preset}$
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="mt-2">
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount("");
                          }}
                          placeholder={t("customAmount")}
                          className="w-full p-2 pr-8 border rounded-lg bg-surface-card border-white/10 text-text-primary placeholder:text-text-secondary focus:border-primary-500/50 focus:ring focus:ring-primary-500/20 outline-none transition-all"
                        />
                        <span className="absolute right-3 top-2.5 text-text-secondary">
                          $
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Donation Button */}
                  <button
                    onClick={handleDonateClick}
                    disabled={loading || (!amount && !customAmount)}
                    className={`w-full py-3 px-4 rounded-lg transition-all duration-300 ${
                      loading || (!amount && !customAmount)
                        ? "bg-surface-card text-text-secondary cursor-not-allowed"
                        : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    } disabled:opacity-50`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("loading")}
                      </span>
                    ) : (
                      `${isSubscription ? t("subscribe") : t("donate")} (${
                        customAmount || amount
                      }$ ${isSubscription ? t("perMonth") : ""})`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
