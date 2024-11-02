"use client";
import React from "react";
import GeneralGraphSection from "./Graphs/GeneralGraphSection";
import SelectedOrgGraphSection from "./Graphs/SelectedOrgGraphSection";
import { Item, Organisation } from "@/lib/types";
type OrganisationGraphProps = {
  organisations?: Organisation[] | null;
  _id?: string;
  items?: Item[] | null;
};
export default function OrganisationGraphSection({
  _id,
  organisations,
  items,
}: OrganisationGraphProps) {
  console.log(_id);
  return (
    <div className="text-black">
      {_id ? (
        <SelectedOrgGraphSection items={items} />
      ) : (
        <GeneralGraphSection organisations={organisations} />
      )}
    </div>
  );
}
