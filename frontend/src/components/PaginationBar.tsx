import { generatePageLink } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  pathname: string;
  prevPage?: number;
  lastTransactionId?: string;
  hasMore?: boolean;
};

export default function PaginationBar({
  currentPage,
  totalPages,
  pathname,
  lastTransactionId,
  hasMore,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPages - 9));

  const numberedPageItems = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={generatePageLink(
          pathname,
          currentPage,
          page,
          undefined,
          lastTransactionId
        )}
        scroll={false}
        className={`${
          currentPage == page
            ? " pointer-events-none btn-active bg-slate-950"
            : "bg-slate-500 hover:bg-slate-700"
        } rounded-lg w-10 text-center  text-white p-2 font-bold tracking-tight`}
        key={page}
      >
        {page}
      </Link>
    );
  }

  if (numberedPageItems.length === 0) {
    return;
  }

  return (
    <div className="flex gap-3 justify-center">
      {pathname == "/transactions" ? (
        <>
          <Link
            href={generatePageLink(
              pathname,
              currentPage,
              parseInt(currentPage.toString()) - 1,
              undefined,
              lastTransactionId
            )}
            scroll={false}
            className={`${
              currentPage == 1
                ? " pointer-events-none btn-active bg-slate-500"
                : "bg-slate-950 hover:bg-slate-700"
            } rounded-lg text-center  text-white p-2 font-bold tracking-tight`}
          >
            <ChevronLeft />
          </Link>
          <button
            className={`pointer-events-none w-10  bg-slate-950  hover:bg-slate-600 rounded-lg text-center  text-white p-2 font-bold tracking-tight`}
          >
            {currentPage}
          </button>
          <Link
            href={generatePageLink(
              pathname,
              currentPage,
              parseInt(currentPage.toString()) + 1,
              undefined,
              lastTransactionId
            )}
            scroll={false}
            className={`${
              !hasMore
                ? " pointer-events-none btn-active bg-slate-500"
                : "bg-slate-950 hover:bg-slate-700"
            } rounded-lg text-center  text-white p-2 font-bold tracking-tight`}
          >
            <ChevronRight />
          </Link>
        </>
      ) : (
        numberedPageItems
      )}
    </div>
  );
}
