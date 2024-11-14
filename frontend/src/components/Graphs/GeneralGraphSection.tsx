"use client";
import React, { useState } from "react";
import { GraphSettingsButton } from "../GraphSettingsButton";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import { Organisation } from "@/lib/types";

type GeneralGraphSectionProps = {
  organisations?: Organisation[] | null;
};

export default function GeneralGraphSection({
  organisations,
}: GeneralGraphSectionProps) {
  const [graphType, setGraphType] = useState("line");

  return (
    <div className="border justify-start items-center bg-white rounded-xl min-h-80 p-4 flex flex-col gap-1">
      <div className="flex justify-between w-full">
        <h1 className="font-medium text-2xl">Analytics</h1>
        <GraphSettingsButton
          graphType={graphType}
          setGraphType={setGraphType}
        />
      </div>
      {graphType == "line" && <LineGraph organisations={organisations} />}
      {graphType == "pie" && <PieGraph organisations={organisations} />}
      {graphType == "bar" && <BarGraph organisations={organisations} />}
    </div>
  );
}
