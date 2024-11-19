import React from "react";
import { Metadata } from "next";
import { TransactionsTable } from "@/components/TransactionsTable";
import { getTransactions } from "@/server/api/actions";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "AdminDash - Transactions",
};

type TransactionsPageProps = {
  searchParams: {
    prevPage: number;
    page: number;
    lastTransactionId?: string;
  };
};

export default async function TransactionsPage({
  searchParams: { prevPage, page = 1, lastTransactionId },
}: TransactionsPageProps) {
  const session = await getServerSession();
  if (!session) redirect("/login");
  const transactions = await getTransactions(prevPage, page, lastTransactionId);
  let lastTransactionObjectId;
  if (prevPage < page) {
    lastTransactionObjectId =
      transactions.transactions[transactions.transactions.length - 1].id;
  } else {
    lastTransactionObjectId = transactions.transactions[0].id;
  }
  const hasMore = transactions.hasMore;

  return (
    <div className="pt-20 p-8">
      <Link
        target="_blank"
        className="flex gap-2 mb-4 w-fit ms-auto bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-2 px-4 font-semibold"
        href={"https://dashboard.stripe.com/test/dashboard"}
      >
        Stripe Dashboard <ChevronsRight />
      </Link>
      <TransactionsTable
        page={page}
        transactions={transactions.transactions}
        lastTransactionId={lastTransactionObjectId}
        hasMore={hasMore}
      />
    </div>
  );
}
