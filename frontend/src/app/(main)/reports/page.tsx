import React from "react";
import { Metadata } from "next";
import { ReportsTable } from "@/components/ReportsTable";
import { getDonations } from "@/server/api/actions";

export const metadata: Metadata = {
  title: "AdminDash - Reports",
};

export default async function ReportsPage() {
  const donations = await getDonations();
  return (
    <div className="pt-20 p-8">
      <ReportsTable donations={donations}/>
    </div>
  );
}
