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
    value:
      | string
      | number
      | boolean
      | Date
      | { _id: string; name: string }
      | undefined;
  }[] = [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const fieldName = e.target.name as keyof Donation;
    (donations[index][fieldName] as string) = e.target.value;
    console.log("changes are going through");
    console.log(donations);
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

  const downloadCSV = () => {
    // Convert the data array into a CSV string
    const csvString = [
      [
        "_id",
        "refundStatus",
        "amount",
        "Organisation",
        "comment",
        "donorName",
        "email",
        "phone",
        "itemId",
        "createdAt",
        "updatedAt",
      ], // Specify your headers here
      ...donations.map((donation) => [
        donation._id ? donation._id : null,
        donation.refundStatus,
        donation.amount ? donation.amount : null,
        donation.orgId.name ? donation.orgId.name : null,
        donation.comment ? donation.comment : null,
        donation.donorName ? donation.donorName : null,
        donation.email ? donation.email : null,
        donation.phone ? donation.phone : null,
        donation.itemId ? donation.itemId._id : null,
        donation.createdAt ? donation.createdAt : null,
        donation.updatedAt ? donation.updatedAt : null,
      ]), // Map your data fields accordingly
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv" });
    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "donation_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="justify-end flex gap-3 mb-4 ">
        <Button
          className="flex gap-2 w-fit text-base bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold"
          onClick={downloadCSV}
        >
          <span className="hidden md:block">Download</span> CSV
        </Button>
        <Button
          disabled
          className="flex gap-2 w-fit text-base bg-black transition-all duration-200 hover:bg-white hover:text-black border border-transparent hover:border-black rounded-xl text-white items-center p-5 font-semibold"
          onClick={downloadCSV}
        >
          <span className="hidden md:block">Generate</span> Invoice
        </Button>
      </div>
      <div className="border bg-white rounded-xl p-4">
        <Table>
          <TableCaption>A list of your recent donations.</TableCaption>
          <TableHeader>
            {donationsData
              .filter((donation, index) => index < 1)
              .map((data, index) => (
                <TableRow key={index}>
                  {data._id && (
                    <TableHead className="w-[100px]">
                      <div className="flex items-center gap-2">
                        ID
                        <Button
                          className="rounded-full w-7 h-7"
                          onClick={() => removeSection("_id")}
                        >
                          <MinusCircleIcon />
                        </Button>
                      </div>
                    </TableHead>
                  )}
                  {data.donorName && (
                    <TableHead className="w-[100px]">
                      <div className="flex items-center gap-2">
                        Name
                        <Button
                          className="rounded-full w-7 h-7"
                          onClick={() => removeSection("donorName")}
                        >
                          <MinusCircleIcon />
                        </Button>
                      </div>
                    </TableHead>
                  )}
                  {data.orgId && (
                    <TableHead className="">
                      <div className="flex items-center gap-2">
                        Organisatin
                        <Button
                          className="rounded-full w-7 h-7"
                          onClick={() => removeSection("orgId")}
                        >
                          <MinusCircleIcon />
                        </Button>
                      </div>
                    </TableHead>
                  )}
                  {data.comment && (
                    <TableHead className="">
                      <div className="flex items-center gap-2">
                        Comment
                        <Button
                          className="rounded-full w-7 h-7"
                          onClick={() => removeSection("comment")}
                        >
                          <MinusCircleIcon />
                        </Button>
                      </div>
                    </TableHead>
                  )}
                  {data.amount && (
                    <TableHead className="text-right">
                      <div className="flex items-center gap-2">
                        Amount
                        <Button
                          className="rounded-full w-7 h-7"
                          onClick={() => removeSection("amount")}
                        >
                          <MinusCircleIcon />
                        </Button>
                      </div>
                    </TableHead>
                  )}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {donationsData.map((donation, index) => (
              <TableRow key={index}>
                {donation._id && (
                  <TableCell>
                    <Input
                      name="_id"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={donation._id}
                    ></Input>
                  </TableCell>
                )}
                {donation.donorName && (
                  <TableCell className="font-medium">
                    <Input
                      name="donorName"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={donation.donorName}
                    ></Input>
                  </TableCell>
                )}

                {donation.orgId && (
                  <TableCell>
                    <Input
                      name="orgName"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={donation.orgId.name}
                    ></Input>
                  </TableCell>
                )}

                {donation.comment && (
                  <TableCell>
                    <Input
                      name="comment"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={donation.comment}
                    ></Input>
                  </TableCell>
                )}
                {donation.amount && (
                  <TableCell className="text-right">
                    <Input
                      name="amount"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={donation.amount}
                    ></Input>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                $
                {donationsData
                  .reduce(
                    (accumulator, donation) => donation.amount + accumulator,
                    0
                  )
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
