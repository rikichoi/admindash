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
  const donationRawProgress = Math.ceil(totalDonationValue / donationGoalValue);
  let donationFormattedProgress = 0;
  if (donationRawProgress > 100) {
    donationFormattedProgress = 100;
  } else {
    donationFormattedProgress = donationRawProgress;
  }
  return (
    <Progress
      value={donationFormattedProgress}
      className="w-full bg-slate-200 [&>*]:bg-[#49a27d]"
    />
  );
}
