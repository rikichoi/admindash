import React from "react";
import { Button } from "./ui/button";

export default function GenerateInvoiceButton() {
  return (
    <>
      <Button
        className="flex gap-2 w-fit text-base bg-[#4ac5ac] transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold"
        onClick={() => console.log("Invoice Generating...")}
      >
        <span className="hidden md:block">Generate</span> Invoice
      </Button>
    </>
  );
}
