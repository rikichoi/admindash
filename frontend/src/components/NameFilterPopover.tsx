"use client";
import { PlusCircle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// type NameFilterPopoverProps = {
//   nameSort?: string;
//   setNameSort: Dispatch<SetStateAction<string | undefined>>;
//   setNameFilter: Dispatch<SetStateAction<string | undefined>>;
// };

export default function NameFilterPopover() {
  // const [nameFilterValue, setNameFilterValue] = useState<string>();
  // const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger disabled asChild>
        <Button variant="outline">
          <PlusCircle size={14} />
          Name
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Name</h4>
            <p className="text-sm text-muted-foreground">
              Filter and Sort by Name
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Search</Label>
              <Input
                // onChange={(e) => {
                //   setNameFilterValue(e.target.value);
                // }}
                id="nameFilter"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Sort By:</Label>
              <Button
                // className={
                //   nameSort == "(a, b) => a.name.localeCompare(b.name)"
                //     ? "bg-slate-300"
                //     : ""
                // }
                // onClick={() =>
                //   nameSort == "(a, b) => a.name.localeCompare(b.name)"
                //     ? setNameSort(undefined)
                //     : setNameSort("(a, b) => a.name.localeCompare(b.name)")
                // }
                variant="outline"
              >
                Asc
              </Button>
              <Button
                // className={
                //   nameSort == "(a, b) => b.name.localeCompare(a.name)"
                //     ? "bg-slate-300"
                //     : ""
                // }
                // onClick={() =>
                //   nameSort == "(a, b) => b.name.localeCompare(a.name)"
                //     ? setNameSort(undefined)
                //     : setNameSort("(a, b) => b.name.localeCompare(a.name)")
                // }
                variant="outline"
              >
                Desc
              </Button>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Button
                // onClick={() =>
                //   nameFilterValue &&
                //   router.push(`/?nameFilter=${nameFilterValue}`)
                // }
                variant="outline"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
