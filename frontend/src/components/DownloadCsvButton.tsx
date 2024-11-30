import React from "react";
import { Button } from "./ui/button";

interface DownloadCsvButtonProps {
  headers: string[];
  rows: unknown[];
}

export default function DownloadCsvButton({
  headers,
  rows,
}: DownloadCsvButtonProps) {
  function downloadCsv() {
    const csvString = [headers.join(","), rows.join(",")].join("\n");
    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv" });
    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${new Date().toLocaleDateString()}_donation_data.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Button
        className="flex gap-2 w-fit text-base bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold"
        onClick={() => downloadCsv()}
      >
        <span className="hidden md:block">Download</span> CSV
      </Button>
    </>
  );
}
