"use client";
import React, { useState } from "react";
import { GraphSettingsButton } from "../GraphSettingsButton";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";

export default function SelectedOrgGraphSection() {
  const [graphType, setGraphType] = useState("line");
  return (
    <div className="justify-end flex flex-col mt-5 gap-3">
      <GraphSettingsButton graphType={graphType} setGraphType={setGraphType} />
      {graphType == "line" && <LineGraph />}
      {graphType == "pie" && <PieGraph />}
      {graphType == "bar" && <BarGraph />}
    </div>
  );
}
