"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import ReusableDialog from "./ReusableDialog";
import GenerateInvoiceModal from "./Modals/GenerateInvoiceModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GenerateInvoiceButtonProps {
  selectedRows: unknown[];
}

export default function GenerateInvoiceButton({
  selectedRows,
}: GenerateInvoiceButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ReusableDialog
        setShowModal={setShowModal}
        showModal={showModal}
        title={"Invoice Preview"}
      >
        <GenerateInvoiceModal
          selectedRows={selectedRows}
          setShowModal={setShowModal}
        />
      </ReusableDialog>
      <TooltipProvider delayDuration={1} skipDelayDuration={1}>
        <Tooltip>
          <TooltipTrigger className="hover:cursor-default">
            <Button
              disabled={!selectedRows || selectedRows.length <= 0}
              className={`${
                !selectedRows || selectedRows.length < 1
                  ? "hover:cursor-default"
                  : ""
              } flex gap-2 w-fit text-base bg-[#4ac5ac] transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold`}
              onClick={() => setShowModal(true)}
            >
              <span className="hidden md:block">Generate</span> Invoice
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={`${
              selectedRows && selectedRows.length > 0 ? "hidden" : ""
            } bg-red-500`}
          >
            <p>Please select at least 1 item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
