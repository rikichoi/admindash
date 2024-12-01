"use client";
import React, { Dispatch, SetStateAction } from "react";
import InvoicePreview from "../InvoicePreview";

interface GenerateInvoiceModalProps {
  selectedRows: unknown[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function GenerateInvoiceModal({
  selectedRows,
  setShowModal,
}: GenerateInvoiceModalProps) {
  return (
    <div className="flex flex-col gap-3">
      <InvoicePreview selectedRows={selectedRows} />
      <div className="flex ">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="p-2 border-2 bg-red-600 text-white hover:cursor-pointer rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
