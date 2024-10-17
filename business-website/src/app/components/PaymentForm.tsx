"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

type PaymentFormProps = {
  STRIPE_PUBLISHABLE_KEY: string;
};

export default function PaymentForm({
  STRIPE_PUBLISHABLE_KEY,
}: PaymentFormProps) {
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: 5000,
        appearance: { theme: "stripe" },
        currency: "usd",
      }}
    >
      <CheckoutForm amount={5000} displayAmount={5000} />
    </Elements>
  );
}
