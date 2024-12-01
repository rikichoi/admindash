"use client"
import { Donation } from "@/lib/types";
import React from "react";


interface InvoicePreviewProps {
  selectedRows: unknown[] | Donation[];
}

export default function InvoicePreview({ selectedRows }: InvoicePreviewProps) {
  const dataArray: JSX.Element[] = [];
  (selectedRows as Donation[]).forEach((row: Donation, index: number) => {
    Object.keys(row).forEach((key) => {
      if (row[key as keyof Donation]) {
        dataArray.push(
          <p className="text-black" key={`${index}-${key}`}>
            {key}: {String(row[key as keyof Donation])}
          </p>
        );
      }
    });
  });
  console.log(selectedRows)
  return (
    <div className="h-fit w-full bg-white text-black">
      {dataArray}
    </div>
  );
}
