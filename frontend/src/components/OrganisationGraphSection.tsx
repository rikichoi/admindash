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

  return (
    <div className="text-black h-full">
      {_id ? (
        <SelectedOrgGraphSection items={items} />
      ) : (
        <GeneralGraphSection organisations={organisations} />
      )}
    </div>
  );
}
