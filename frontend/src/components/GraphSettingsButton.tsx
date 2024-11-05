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
      <DropdownMenuTrigger className="w-fit ms-auto p-5 hover:bg-[#4ac5ac] bg-[#def2b1] hover:border-black duration-300" asChild>
        <Button variant="outline">
          <Settings2 size={26}/>
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
