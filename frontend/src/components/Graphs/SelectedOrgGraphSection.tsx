"use client";
import React, { useState } from "react";
import { GraphSettingsButton } from "../GraphSettingsButton";

export default function SelectedOrgGraphSection() {
  const [graphType, setGraphType] = useState("line");
  return (
    <div className="justify-end flex flex-col">
      <GraphSettingsButton graphType={graphType} setGraphType={setGraphType} />
      <div>SelectedOrgGraphSection</div>
    </div>
  );
}
