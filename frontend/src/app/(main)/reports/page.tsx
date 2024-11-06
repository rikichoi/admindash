import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ReportsTable } from "@/components/ReportsTable";
import { getDonations } from "@/server/api/actions";

export const metadata: Metadata = {
  title: "AdminDash - Reports",
};

export default async function ReportsPage() {
  const donations = await getDonations();
  return (
    <div className="pt-20 p-8">
      <Link
        target="_blank"
        className="flex gap-2 mb-4 w-fit ms-auto bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-2 px-4 font-semibold"
        href={"/reports"}
      >
        Stripe Dashboard
      </Link>
      <ReportsTable donations={donations}/>
    </div>
  );
}
