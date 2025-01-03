import React from "react";
import { Button } from "./ui/button";
import { Donation } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GenerateCsvButtonProps {
  selectedRows: unknown[] | Donation[];
}

export default function GenerateCsvButton({
  selectedRows,
}: GenerateCsvButtonProps) {
  const downloadCsv = () => {
    if (selectedRows.length === 0) return;

    const headers = Object.keys(selectedRows[0] as Donation).join(",");
    const csvContent = [
      headers,
      ...selectedRows.map((row) => {
        return Object.values(row as Donation).join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const date = new Date();
    const dateString = `${date.toLocaleDateString()}_${date.toLocaleTimeString()}`;
    link.setAttribute("download", `${dateString}_donation_data.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <TooltipProvider delayDuration={1} skipDelayDuration={1}>
        <Tooltip>
          <TooltipTrigger className="hover:cursor-default">
            <Button
              disabled={!selectedRows || selectedRows.length <= 0}
              className={`${
                !selectedRows || selectedRows.length < 1
                  ? "hover:cursor-default"
                  : ""
              } flex gap-2 w-fit text-base bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold`}
              onClick={() => downloadCsv()}
            >
              <span className="hidden md:block">Download</span> CSV
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
