"use client";
import React, { useState } from "react";
import { GraphSettingsButton } from "../GraphSettingsButton";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";

export default function GeneralGraphSection() {
  const [graphType, setGraphType] = useState("line");

  return (
    <div className="justify-end flex flex-col">
      <GraphSettingsButton graphType={graphType} setGraphType={setGraphType} />
      {graphType == "line" && <LineGraph />}
      {graphType == "pie" && <PieGraph />}
      {graphType == "bar" && <BarGraph />}
    </div>
  );
}
