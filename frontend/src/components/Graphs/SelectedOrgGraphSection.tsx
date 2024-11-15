"use client";
import React, { useState } from "react";
import { GraphSettingsButton } from "../GraphSettingsButton";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import { Item } from "@/lib/types";

type SelectedOrgGraphSectionProps = {
  items?: Item[] | null;
};

export default function SelectedOrgGraphSection({
  items,
}: SelectedOrgGraphSectionProps) {
  const [graphType, setGraphType] = useState("bar");
  return (
    <div className="border justify-start items-center bg-white rounded-xl min-h-80 p-4 flex flex-col gap-1">
      <div className="flex justify-between w-full">
        <h1 className="font-medium text-2xl">Analytics</h1>
        <GraphSettingsButton
          graphType={graphType}
          setGraphType={setGraphType}
        />
      </div>
      {graphType == "bar" && <BarGraph items={items} />}
      {graphType == "line" && <LineGraph items={items} />}
      {graphType == "pie" && <PieGraph items={items} />}
    </div>
  );
}
