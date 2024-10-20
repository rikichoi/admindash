import axios from "axios";
import React from "react";
import { Organisation } from "../lib/types";
import Link from "next/link";

type OrganisationTableProps = { name?: string };

async function getOrganisations(): Promise<Organisation[] | null> {
  "use server";
  try {
    const response = await axios.get(
      "http://localhost:5000/api/organisation/get-organisations"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function OrganisationTable({
  name,
}: OrganisationTableProps) {
  const organisations = await getOrganisations();
  return (
    <table className="rounded-xl w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="text-left">
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Active Status
          </th>
          <th scope="col" className="px-6 py-3">
            Item Count
          </th>
          <th scope="col" className="px-6 py-3">
            Donations Count
          </th>
          <th scope="col" className="px-6 py-3">
            Donations Value
          </th>
        </tr>
      </thead>
      <tbody className="rounded-xl">
        {organisations?.map((organisation, index) => (
          <tr
            key={index}
            className={`${
              name == organisation.name ? "bg-gray-500" : "bg-gray-800"
            }  border-b bg-gray-800 border-gray-700  hover:bg-gray-600`}
          >
            <th
              scope="row"
              className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <Link
                className="flex px-6 py-4  w-full"
                href={`?name=${organisation.name}`}
              >
                {organisation.name}
              </Link>
            </th>
            <td>
              <Link
                className="flex px-6 py-4  w-full"
                href={`?name=${organisation.name}`}
              >
                {organisation.activeStatus.toString()}
              </Link>
            </td>
            <td>
              <Link
                className="flex px-6 py-4  w-full"
                href={`?name=${organisation.name}`}
              >
                {organisation.totalDonationItemsCount}
              </Link>
            </td>
            <td>
              <Link
                className="flex px-6 py-4  w-full"
                href={`?name=${organisation.name}`}
              >
                {organisation.totalDonationsCount}
              </Link>
            </td>
            <td>
              <Link
                className="flex px-6 py-4  w-full"
                href={`?name=${organisation.name}`}
              >
                {organisation.totalDonationsValue}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
