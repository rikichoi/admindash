"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import NameFilterPopover from "./NameFilterPopover";

type OrganisationFilterSectionProps = {
  nameSort?: string;
  setNameSort: Dispatch<SetStateAction<string | undefined>>;
  setNameFilter: Dispatch<SetStateAction<string | undefined>>;
};

export default function OrganisationFilterSection({
  nameSort,
  setNameSort,
}: OrganisationFilterSectionProps) {
  const [nameFilterValue, setNameFilterValue] = useState<string>();
  const router = useRouter();

  return (
    <div className="text-black flex gap-3 ">
      <NameFilterPopover
        setNameFilter={setNameFilterValue}
        setNameSort={setNameSort}
        nameSort={nameSort}
      />
    </div>
  );
}
