"use client";
import React, { useState } from "react";
import { Organisation } from "../lib/types";
import Link from "next/link";
import OrganisationFilterSection from "./OrganisationFilterSection";

type OrganisationTableProps = {
  name?: string;
  organisations: Organisation[] | null;
};

export default function OrganisationTable({
  name,
  organisations,
}: OrganisationTableProps) {
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const [nameSort, setNameSort] = useState<string | undefined>(undefined);

  const sortedOrganisations = organisations?.sort(nameSort && eval(nameSort));

  return (
    <>
      <OrganisationFilterSection
        nameSort={nameSort}
        setNameSort={setNameSort}
        setNameFilter={setNameFilter}
      />
      <table className="w-full text-xs text-left text-gray-500">
        <thead className="uppercase text-gray-400 border-b-2">
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
        <tbody className="">
          {sortedOrganisations ? (
            sortedOrganisations.map((organisation, index) => (
              <tr
                key={index}
                className={`${
                  name == organisation.name ? "bg-gray-300" : ""
                }     hover:bg-gray-200 border-b-2`}
              >
                <th
                  scope="row"
                  className="font-medium text-gray-900 whitespace-nowrap"
                >
                  <Link
                    className="flex px-6 py-4  w-full"
                    href={
                      name == organisation.name
                        ? "/"
                        : `?name=${organisation.name}`
                    }
                  >
                    {organisation.name}
                  </Link>
                </th>
                <td>
                  <Link
                    className="flex px-6 py-4  w-full"
                    href={
                      name == organisation.name
                        ? "/"
                        : `?name=${organisation.name}`
                    }
                  >
                    {organisation.activeStatus.toString()}
                  </Link>
                </td>
                <td>
                  <Link
                    className="flex px-6 py-4  w-full"
                    href={
                      name == organisation.name
                        ? "/"
                        : `?name=${organisation.name}`
                    }
                  >
                    {organisation.totalDonationItemsCount}
                  </Link>
                </td>
                <td>
                  <Link
                    className="flex px-6 py-4  w-full"
                    href={
                      name == organisation.name
                        ? "/"
                        : `?name=${organisation.name}`
                    }
                  >
                    {organisation.totalDonationsCount}
                  </Link>
                </td>
                <td>
                  <Link
                    className="flex px-6 py-4  w-full"
                    href={
                      name == organisation.name
                        ? "/"
                        : `?name=${organisation.name}`
                    }
                  >
                    {organisation.totalDonationsValue}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className={` border-b-2`}>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                <span className="flex px-6 py-4  w-full">---</span>
              </th>
              <td>
                <span className="flex px-6 py-4  w-full">---</span>
              </td>
              <td>
                <span className="flex px-6 py-4  w-full">---</span>
              </td>
              <td>
                <span className="flex px-6 py-4  w-full">---</span>
              </td>
              <td>
                <span className="flex px-6 py-4  w-full">---</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
