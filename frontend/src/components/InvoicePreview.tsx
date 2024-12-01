import React from "react";

interface InvoicePreviewProps {
  selectedRows: unknown[];
}

export default function InvoicePreview({ selectedRows }: InvoicePreviewProps) {
  return <div>{JSON.stringify(selectedRows)}</div>;
}
