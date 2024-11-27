import React from "react";
import { Metadata } from "next";
import { getDonations } from "@/server/api/actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReportsDataTable } from "@/components/ReportsDataTable";

export const metadata: Metadata = {
  title: "AdminDash - Reports",
};

export default async function ReportsPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");
  const donations = await getDonations();

  return (
    <div className="pt-20 p-8">
      <ReportsDataTable donations={donations}/>
    </div>
  );
}
