"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

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
      <DropdownMenuTrigger className="w-fit ms-auto" asChild>
        <Button variant="outline">
          <Settings2 />
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
