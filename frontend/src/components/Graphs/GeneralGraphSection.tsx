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
    <div className="justify-end flex flex-col mt-5 gap-3">
      <GraphSettingsButton graphType={graphType} setGraphType={setGraphType} />
      {graphType == "line" && <LineGraph organisations={organisations} />}
      {graphType == "pie" && <PieGraph />}
      {graphType == "bar" && <BarGraph />}
    </div>
  );
}
