"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../checkout/actions";

type CheckoutFormProps = {
  amount: number;
  displayAmount: number;
};

export default function CheckoutForm({ amount, displayAmount }: CheckoutFormProps) {
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
        // return_url: "https://techbyte-store.vercel.app/payment-success",
        return_url: "http://localhost:3000/payment-success",
      },
    });
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
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-55"
        >
          {!loading ? `Pay $${displayAmount}` : "Processing..."}
        </button>
      </form>
    </div>
  );
}
