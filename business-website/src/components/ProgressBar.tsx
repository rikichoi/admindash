"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  donationGoalValue: number;
  totalDonationValue: number;
}

export function ProgressBar({
  donationGoalValue,
  totalDonationValue,
}: ProgressBarProps) {
  return (
    <Progress
    
      value={totalDonationValue / donationGoalValue}
      className="w-full bg-slate-200"
    />
  );
}
