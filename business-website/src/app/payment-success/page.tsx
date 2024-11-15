"use client";
import React from "react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="flex text-black bg-slate-50 min-h-screen flex-col gap-y-4 items-center justify-center">
      <h1 className=" text-5xl font-extrabold">Thank You!</h1>
      <h2 className=" text-2xl ">Your payment has been processed</h2>
      <Link
        href={"/"}
        className="bg-blue-500 xs:mt-5 sm:mt-5 lg:mt-0 py-4 px-6 border-2 border-black hover:shadow-inner hover:shadow-black transition-all duration-200"
      >
        Return to Home
      </Link>
    </main>
  );
}
