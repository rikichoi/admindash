"use client";
import React from "react";
import GeneralGraphSection from "./Graphs/GeneralGraphSection";
import SelectedOrgGraphSection from "./Graphs/SelectedOrgGraphSection";
type OrganisationGraphProps = {
  _id?: string;
};
export default function OrganisationGraphSection({
  _id,
}: OrganisationGraphProps) {
  console.log(_id);
  return (
    <div className="text-black">
      {_id ? <SelectedOrgGraphSection /> : <GeneralGraphSection />}
    </div>
  );
}
