import React from "react";
import { Metadata } from "next";
import { TransactionsTable } from "@/components/TransactionsTable";
import { getTransactions } from "@/server/api/actions";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AdminDash - Transactions",
};

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  console.log(transactions);
  return (
    <div className="pt-20 p-8">
      <Link
        target="_blank"
        className="flex gap-2 mb-4 w-fit ms-auto bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-2 px-4 font-semibold"
        href={"https://dashboard.stripe.com/test/dashboard"}
      >
        Stripe Dashboard <ChevronsRight />
      </Link>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
