"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../app/checkout/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDonationSchema, createDonationSchema } from "../lib/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Item, Organisation } from "../lib/types";
import { useRouter } from "next/navigation";

type CheckoutFormProps = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  organisations: Organisation[] | undefined;
  items: Item[] | undefined;
  orgId: string;
  itemId?: string;
};

type PaymentFormProps = {
  STRIPE_PUBLISHABLE_KEY: string;
  organisations: Organisation[] | undefined;
  items: Item[] | undefined;
  orgId: string;
  itemId?: string;
};

export default function PaymentForm({
  STRIPE_PUBLISHABLE_KEY,
  organisations,
  items,
  orgId,
  itemId,
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
      <CheckoutForm
        orgId={orgId}
        itemId={itemId}
        items={items}
        organisations={organisations}
        amount={amount}
        setAmount={setAmount}
      />
    </Elements>
  );
}

function CheckoutForm({
  amount,
  setAmount,
  organisations,
  items,
  orgId,
  itemId,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [donationType, setDonationType] = useState<string>(
    itemId ? "item" : "general",
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateDonationSchema>({
    resolver: zodResolver(createDonationSchema),
    defaultValues: {
      itemId: itemId ? itemId : undefined,
      orgId: orgId,
    },
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
    setAmount(parseInt(amountValue) || 0);
  }, [amountValue]);

  useEffect(() => {
    if (donationType == "general") {
      setValue("itemId", undefined);
    }
  }, [donationType]);

  const stripeSubmitHandler = async (data: CreateDonationSchema) => {
    const { amount, comment, itemId, orgId, donorName, email, phone } = data;
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
    // return_url: `https://admindash-sooty.vercel.app/api/checkout/new-donation/${amount}/${orgId}/${encodeURIComponent(
    const result = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: `https://nexagrid.vercel.app/api/checkout/new-donation/${amount}/${orgId}/${encodeURIComponent(comment)}/${(donorName && encodeURIComponent(donorName)) || null}/${(itemId && donationType == "item" && itemId) || null}/${email || null}/${phone || null}/paymentId=`,
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
    <div className="w-full rounded-lg">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="rounded-md bg-white p-2 text-black"
      >
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Make a Donation
        </h1>
        <h2 className="font-semibold tracking-tighter text-red-500">
          Test Card Details
        </h2>
        <ul className="mb-5">
          <li>Card: 4242 4242 4242 4242</li>
          <li>Date: 44/44</li>
          <li>CVC: 444</li>
        </ul>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h2>Donation Type</h2>
            <div className="mx-auto flex w-full max-w-64 justify-between">
              <div className="flex gap-3">
                <h3>General</h3>
                <input
                  type="radio"
                  name="donationType"
                  defaultChecked={donationType == "general"}
                  onClick={(e) =>
                    setDonationType((e.target as HTMLInputElement).value)
                  }
                  value={"general"}
                  className="w-5 rounded-lg border p-2 accent-green-400"
                />
              </div>
              <div className="flex gap-3">
                <h3>Item</h3>
                <input
                  type="radio"
                  name="donationType"
                  defaultChecked={donationType == "item"}
                  onClick={(e) =>
                    setDonationType((e.target as HTMLInputElement).value)
                  }
                  value={"item"}
                  className="w-5 rounded-lg border p-2 accent-green-400"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h2 className={`${donationType == "general" && "line-through"}`}>
              Item
            </h2>
            <select
              disabled={donationType !== "item"}
              className={`${donationType == "general" && "bg-orange-100 hover:cursor-not-allowed"} rounded-lg border-2 p-2`}
              {...register("itemId")}
            >
              <option className="line-through" disabled value={""}>
                Select an Item
              </option>
              {items && items.length > 0 ? (
                items?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option disabled value={""}>
                  No items...
                </option>
              )}
            </select>
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.itemId?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Amount (In Cents - i.e $500 = 50000)</h2>
            <input
              className="rounded-lg border-2 p-2"
              {...register("amount")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.amount?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Organisation</h2>
            <select className="rounded-lg border-2 p-2" {...register("orgId")}>
              {organisations?.map((organisation) => (
                <option
                  onClick={() => router.push(`/donate/${organisation._id}`)}
                  key={organisation._id}
                  value={organisation._id}
                >
                  {organisation.name}
                </option>
              ))}
            </select>
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.orgId?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Full Name</h2>
            <input
              className="rounded-lg border-2 p-2"
              {...register("donorName")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.donorName?.message}</p>
          </div>
          <div className="flex flex-col">
            <h2>Comment</h2>
            <input
              className="rounded-lg border-2 p-2"
              {...register("comment")}
            />
            {/* errors will return when field validation fails  */}
            <p className="text-red-500">{errors.comment?.message}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-grow flex-col">
              <h2>Email</h2>
              <input
                className="rounded-lg border-2 p-2"
                {...register("email")}
              />
              {/* errors will return when field validation fails  */}
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div className="flex flex-grow flex-col">
              <h2>Phone Number</h2>
              <Controller
                control={control}
                render={({ field }) => (
                  <input
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("email");
                    }}
                    className="rounded-lg border-2 p-2"
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
          className="mt-2 w-full rounded-md bg-black p-5 font-bold text-white disabled:opacity-55"
        >
          {!loading
            ? `Pay $${(amount / 100).toLocaleString()}`
            : "Processing..."}
        </button>
      </form>
    </div>
  );
}
