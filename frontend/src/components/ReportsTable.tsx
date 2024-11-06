"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Donation } from "@/lib/types";
import { Button } from "./ui/button";
import { MinusCircleIcon } from "lucide-react";
import { useState } from "react";

type ReportsTableProps = {
  donations: Donation[];
};

export function ReportsTable({ donations }: ReportsTableProps) {
  const [donationsData, setDonationsData] = useState<Donation[]>(donations);

  const deletedSections: {
    donationIndex: number;
    section: keyof Donation;
    value: string | number | boolean | Date | undefined;
  }[] = [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const fieldName = e.target.name as keyof Donation;
    (donations[index][fieldName] as string) = e.target.value;
    console.log("changes are going through");
  }


  function removeSection(section: keyof Donation) {
    const updatedDonations = donationsData.map((donation, index) => {
      deletedSections.push({
        donationIndex: index,
        section: section,
        value: donation[section],
      });
      const updatedDonation = { ...donation };
      delete updatedDonation[section];
      return updatedDonation;
    });
    setDonationsData(updatedDonations);
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <Button onClick={() => console.log(donationsData)}>Log</Button>
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-2">
                  Name
                  <Button onClick={() => removeSection("donorName")}>
                    <MinusCircleIcon />
                  </Button>
                </div>
              </TableHead>
              <TableHead className="">
                <div className="flex items-center gap-2">
                  Comment
                  <Button onClick={() => removeSection("comment")}>
                    <MinusCircleIcon />
                  </Button>
                </div>
              </TableHead>
              <TableHead className="">
                <div className="flex items-center gap-2">
                  Organisation
                  <Button onClick={() => removeSection("orgName")}>
                    <MinusCircleIcon />
                  </Button>
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center gap-2">
                  Amount
                  <Button onClick={() => removeSection("amount")}>
                    <MinusCircleIcon />
                  </Button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donationsData.map((donation, index) => (
              <TableRow key={index}>
                {donation.donorName && (
                  <TableCell className="font-medium">
                    <Input
                      name="donorName"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={donation.donorName}
                    ></Input>
                  </TableCell>
                )}
                <TableCell>
                  <Input
                    name="comment"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={donation.comment}
                  ></Input>
                </TableCell>
                <TableCell>
                  <Input
                    name="orgName"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={donation.orgName}
                  ></Input>
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    name="amount"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={donation.amount}
                  ></Input>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
    </div>
  );
}
