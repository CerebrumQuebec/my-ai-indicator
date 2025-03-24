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
          className={`px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium ${className}`}
        >
          {t("donate")}
        </button>
      )}

      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
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
                className="inline-block w-full max-w-md align-middle"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-4 p-6 bg-surface-dark/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/10">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {t("donateTitle")}
                    </h3>
                    <button
                      onClick={() => handleModalChange(false)}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Donation Type Toggle */}
                  <div className="flex gap-2 p-1 bg-surface-card rounded-lg">
                    <button
                      onClick={() => setIsSubscription(false)}
                      className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                        !isSubscription
                          ? "bg-primary-500 text-white"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {t("oneTimeDonation")}
                    </button>
                    <button
                      onClick={() => setIsSubscription(true)}
                      className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                        isSubscription
                          ? "bg-primary-500 text-white"
                          : "text-text-secondary hover:text-text-primary"
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
                          className={`py-2 px-4 rounded-lg transition-colors ${
                            amount === preset && !customAmount
                              ? "bg-primary-500 text-white"
                              : "bg-surface-card text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {preset}$
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="mt-2">
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
                        className="w-full p-2 border rounded-lg bg-surface-card border-white/10 text-text-primary placeholder:text-text-secondary"
                      />
                    </div>
                  </div>

                  {/* Donation Button */}
                  <button
                    onClick={handleDonateClick}
                    disabled={loading || (!amount && !customAmount)}
                    className={`w-full py-3 px-4 rounded-lg transition-opacity ${
                      loading || (!amount && !customAmount)
                        ? "bg-surface-card text-text-secondary"
                        : "bg-primary-500 text-white hover:opacity-90"
                    } disabled:opacity-50`}
                  >
                    {loading
                      ? t("loading")
                      : `${isSubscription ? t("subscribe") : t("donate")} (${
                          customAmount || amount
                        }$ ${isSubscription ? t("perMonth") : ""})`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
