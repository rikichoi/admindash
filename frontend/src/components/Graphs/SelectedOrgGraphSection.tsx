"use client";
import React, { useState } from "react";
import { GraphSettingsButton } from "../GraphSettingsButton";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import { Item, Organisation } from "@/lib/types";

type SelectedOrgGraphSectionProps = {
  items?: Item[] | null;
};

export default function SelectedOrgGraphSection({
  items,
}: SelectedOrgGraphSectionProps) {
  const [graphType, setGraphType] = useState("line");
  return (
    <div className="justify-end flex flex-col gap-1">
      <GraphSettingsButton graphType={graphType} setGraphType={setGraphType} />
      {graphType == "line" && <LineGraph items={items} />}
      {graphType == "pie" && <PieGraph />}
      {graphType == "bar" && <BarGraph />}
    </div>
  );
}
