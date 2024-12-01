"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import ReusableDialog from "./ReusableDialog";
import InvoicePreview from "./InvoicePreview";

interface GenerateInvoiceButtonProps {
  selectedRows: unknown[];
}

export default function GenerateInvoiceButton({
  selectedRows,
}: GenerateInvoiceButtonProps) {
  const [showModal, setShowModal] = useState(false);
  console.log(selectedRows);

  return (
    <>
      <ReusableDialog
        setShowModal={setShowModal}
        showModal={showModal}
        title={"Invoice Preview"}
      >
        <div className="">
          <InvoicePreview selectedRows={selectedRows} />
        </div>
      </ReusableDialog>
      <Button
        className="flex gap-2 w-fit text-base bg-[#4ac5ac] transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold"
        onClick={() => setShowModal(true)}
      >
        <span className="hidden md:block">Generate</span> Invoice
      </Button>
    </>
  );
}
