"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../checkout/actions";

type CheckoutFormProps = {
  amount: number;
};

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
      <CheckoutForm amount={5000} />
    </Elements>
  );
}
function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amount > 10) {
      createPaymentIntent(amount).then((res) => {
        if (res) {
          setClientSecret(res);
        }
      });
    }
    if (amount < 10) {
      return;
    }
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/api/checkout/new-donation?${amount}&${orgName}&${comment}&${donorName}&${itemId}${email && `&${email}`}${phone && `&${phone}`}`,
      },
    });
    console.log(result);
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(result);
    }
  };

  return (
    <div className="w-full h-full border-2">
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        <PaymentElement />

        {errorMessage && <div>{errorMessage}</div>}

        <button
          disabled={!stripe || loading || amount < 10}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-55"
        >
          {!loading
            ? `Pay $${(amount / 100).toLocaleString()}`
            : "Processing..."}
        </button>
      </form>
    </div>
  );
}
