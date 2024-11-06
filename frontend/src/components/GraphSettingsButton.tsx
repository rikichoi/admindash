"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";

type GraphSettingsButtonProps = {
  graphType: string;
  setGraphType: Dispatch<SetStateAction<string>>;
};

export function GraphSettingsButton({
  graphType,
  setGraphType,
}: GraphSettingsButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      className="flex w-fit group ms-auto gap-2 mb-4 bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-2 px-4 font-semibold"
        asChild
      >
        <Button variant="outline">
          <Settings2 size={26} className="text-white group-hover:text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Graph Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={graphType} onValueChange={setGraphType}>
          <DropdownMenuRadioItem value="line">Line</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bar">Bar</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pie">Pie</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
