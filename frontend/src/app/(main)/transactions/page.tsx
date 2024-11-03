import React from "react";
import { Metadata } from "next";
import { TransactionsTable } from "@/components/TransactionsTable";
import { getTransactions } from "@/server/api/actions";

export const metadata: Metadata = {
  title: "AdminDash - Transactions",
};

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  console.log(transactions)
  return (
    <div className="mt-20">
      <TransactionsTable transactions={transactions}/>
    </div>
  );
}
