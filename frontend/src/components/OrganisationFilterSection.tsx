"use client";
import React from "react";
import NameFilterPopover from "./NameFilterPopover";

// type OrganisationFilterSectionProps = {
//   // TODO: Add sort, filter, pagination
//   nameSort?: string;
//   setNameSort: Dispatch<SetStateAction<string | undefined>>;
//   setNameFilter: Dispatch<SetStateAction<string | undefined>>;
// };

export default function OrganisationFilterSection() {


  return (
    <div className="text-black flex gap-3 ">
      <NameFilterPopover

      />
    </div>
  );
}
