# Stripe Payment Implementation Documentation

## Overview

This document outlines the Stripe payment implementation in the project, which handles both one-time and recurring (subscription) donations in CAD currency.

## Prerequisites

- Stripe account
- Required packages (already in package.json):
  - `stripe`: ^14.8.0
  - `@stripe/stripe-js`: ^2.2.0
  - `@stripe/react-stripe-js`: ^2.4.0

## Environment Variables

Required environment variables:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_BASE_URL=your_app_base_url
```

## Implementation Components

### 1. Frontend Implementation (`DonationButton.tsx`)

- A React component that provides a donation interface
- Features:
  - Predefined donation amounts (1$, 5$, 10$, 20$)
  - Custom amount input
  - Toggle between one-time and recurring monthly donations
  - Bilingual support (English/French)
  - Responsive modal design
  - Minimum donation amount validation ($1)

### 2. API Routes

#### a. Create Donation Session (`/api/create-donation-session`)

- Creates a Stripe Checkout Session
- Handles both one-time payments and subscriptions
- Parameters:
  - `amount`: donation amount in CAD
  - `isSubscription`: boolean flag for subscription
  - `success_url`: redirect URL after successful payment
  - `cancel_url`: redirect URL if payment is cancelled
- Returns:
  - Success: `{ sessionId: string }`
  - Error: `{ error: string }`

#### b. Get Donation Balance (`/api/get-donation-balance`)

- Retrieves the current balance from Stripe
- Returns both available and pending balances in CAD
- Returns:
  - Success: `{ amount: number, details: { available: number, pending: number } }`
  - Error: `{ error: string }`

#### c. Create Payment Intent (`/api/create-payment-intent`)

- Creates a PaymentIntent for direct payment processing
- Parameters:
  - `amount`: payment amount in USD
- Returns:
  - Success: `{ clientSecret: string }`
  - Error: `{ message: string }`

## Usage Example

```typescript
// Initialize Stripe in your component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Handle donation
const handleDonation = async () => {
  const response = await fetch("/api/create-donation-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: 10,
      isSubscription: false,
      success_url: `${window.location.origin}/donation/success`,
      cancel_url: window.location.href,
    }),
  });

  const { sessionId } = await response.json();
  const stripe = await stripePromise;
  await stripe?.redirectToCheckout({ sessionId });
};
```

## Success Page

A success page is implemented at `/[locale]/donation/success` that displays a thank you message to users after successful donations.

## Error Handling

- Input validation for minimum donation amount
- Error handling for API calls with appropriate error messages
- Bilingual error messages (English/French)
- Graceful handling of Stripe API errors

## Security Considerations

- Stripe secret key is only used in server-side code
- Amount validation on both client and server side
- CORS protection on API routes
- Environment variables for sensitive data

## Testing

To test the implementation:

1. Use Stripe test keys in development
2. Test card numbers:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002
3. Test both one-time and subscription payments
4. Test error scenarios (insufficient funds, invalid card, etc.)

## UI Implementation

### Modal/Popup Component

The donation modal is implemented in the `DonationButton` component. Here's the UI code:

```tsx
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

  return (
    <div>
      {/* Modal/Popup UI */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => handleModalChange(false)}
          />

          {/* Modal Container */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-2rem)] max-w-md">
            <div className="flex flex-col gap-4 p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {locale === "fr" ? "Faire un don" : "Make a donation"}
                </h3>
                <button
                  onClick={() => handleModalChange(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Donation Amount Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold text-gray-800 dark:text-white">
                  {locale === "fr"
                    ? `Montant ${isSubscription ? "mensuel" : ""}`
                    : `${isSubscription ? "Monthly amount" : "Amount"}`}
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
                          ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                    placeholder={
                      locale === "fr"
                        ? "Autre montant (minimum 1$)"
                        : "Other amount (minimum $1)"
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Donation Button */}
              <button
                onClick={handleDonateClick}
                disabled={loading || (!amount && !customAmount)}
                className={`w-full py-3 px-4 rounded-lg transition-opacity ${
                  loading || (!amount && !customAmount)
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    : "bg-gray-800 dark:bg-white text-white dark:text-gray-900"
                } hover:opacity-90 disabled:opacity-50`}
              >
                {loading
                  ? locale === "fr"
                    ? "Chargement..."
                    : "Loading..."
                  : `${
                      isSubscription
                        ? locale === "fr"
                          ? "S'abonner"
                          : "Subscribe"
                        : locale === "fr"
                        ? "Faire un don"
                        : "Donate"
                    } (${customAmount || amount}$ ${
                      isSubscription
                        ? locale === "fr"
                          ? "/mois"
                          : "/month"
                        : ""
                    })`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

### Usage

To use the donation modal in your project:

1. Copy the component code above
2. Install required dependencies:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```
3. Set up your Tailwind CSS configuration for the UI classes
4. Import and use the component:

   ```tsx
   import DonationButton from "./components/DonationButton";

   export default function YourComponent() {
     return <DonationButton locale="en" className="your-custom-classes" />;
   }
   ```

### Styling Notes

- The UI uses Tailwind CSS for styling
- Dark mode support is included
- The modal is responsive and centered on screen
- Backdrop blur effect for modern look
- High contrast colors for accessibility
- Smooth transitions and hover effects
