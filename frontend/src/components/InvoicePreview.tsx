"use client";
import { Donation } from "@/lib/types";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SelectedRow = Donation & {
  orgId_name: string;
};

interface InvoicePreviewProps {
  selectedRows: unknown[] | SelectedRow[];
}

export default function InvoicePreview({ selectedRows }: InvoicePreviewProps) {
  // TODO: Create generate invoice functionality
  return (
    <div className="h-fit w-[900px] bg-white text-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="">Organisation</TableHead>
            <TableHead className="text-right ">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(selectedRows as SelectedRow[]).map((donation) => (
            <TableRow key={donation.donorName}>
              <TableCell className="font-medium">
                {donation.donorName}
              </TableCell>
              <TableCell>{donation.orgId_name}</TableCell>
              <TableCell className="text-right">{donation.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {(selectedRows as SelectedRow[]).reduce(
                (total, donation) => total + donation.amount,
                0
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
