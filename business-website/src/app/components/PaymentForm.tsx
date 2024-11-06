"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../checkout/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDonationSchema, createDonationSchema } from "../lib/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CheckoutFormProps = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
};

type PaymentFormProps = {
  STRIPE_PUBLISHABLE_KEY: string;
};

export default function PaymentForm({
  STRIPE_PUBLISHABLE_KEY,
}: PaymentFormProps) {
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const [amount, setAmount] = useState(0);
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amount < 10 ? 10 : amount,
        appearance: { theme: "stripe" },
        currency: "usd",
      }}
    >
      <CheckoutForm amount={amount} setAmount={setAmount} />
    </Elements>
  );
}

function CheckoutForm({ amount, setAmount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateDonationSchema>({
    resolver: zodResolver(createDonationSchema),
  });
  const formSubmitHandler: SubmitHandler<CreateDonationSchema> = (data) => {
    stripeSubmitHandler(data);
  };
  // add debounce function for these things and perhaps clean up
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

  const amountValue = watch("amount");

  useEffect(() => {
    console.log(amountValue);
    setAmount(parseInt(amountValue) || 0);
  }, [amountValue]);

  const stripeSubmitHandler = async (data: CreateDonationSchema) => {
    const { amount, comment, itemId, orgName, donorName, email, phone } = data;
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    console.log(encodeURIComponent(comment));
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    // TODO: Implement RHF and Zod for "return_url" values. This should be possible because the entire form is client side
    const result = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: `https://admindash-sooty.vercel.app/api/checkout/new-donation/${amount}/${orgName}/${encodeURIComponent(
          comment
        )}/${(donorName && encodeURIComponent(donorName)) || null}/${itemId}/${
          email || null
        }/${phone || null}`,
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
    <div className="max-w-3xl mx-auto h-full border-2 rounded-lg">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="bg-white p-2 rounded-md text-black "
      >
        <h1 className="text-3xl">Make a donation</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h2>Item ID</h2>
            <input
              className="border-2 p-2 rounded-lg"
              {...register("itemId")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.itemId?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Amount</h2>
            <input
              className="border-2 p-2 rounded-lg"
              {...register("amount")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.amount?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Organisation</h2>
            <input
              className="border-2 p-2 rounded-lg"
              {...register("orgName")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.orgName?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Full Name</h2>
            <input
              className="border-2 p-2 rounded-lg"
              {...register("donorName")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.donorName?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Comment</h2>
            <input
              className="border-2 p-2 rounded-lg"
              {...register("comment")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.comment?.message}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col flex-grow">
              <h2>Email</h2>
              <input
                className="border-2 p-2 rounded-lg"
                {...register("email")}
              />
              {/* errors will return when field validation fails  */}
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col flex-grow">
              <h2>Phone Number</h2>
              <Controller
                control={control}
                render={({ field }) => (
                  <input
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("email");
                    }}
                    className="border-2 p-2 rounded-lg"
                  />
                )}
                name="phone"
              />
              {/* errors will return when field validation fails  */}
              <p className="text-red-500">{errors.phone?.message}</p>
            </div>
          </div>
        </div>
        <PaymentElement />

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

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
