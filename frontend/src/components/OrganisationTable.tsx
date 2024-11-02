"use client";
import React, { useState } from "react";
import { Organisation } from "../lib/types";
import Link from "next/link";
import OrganisationFilterSection from "./OrganisationFilterSection";

type OrganisationTableProps = {
  _id?: string;
  organisations: Organisation[] | null;
};

export default function OrganisationTable({
  _id,
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
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-black border-b-2">
            <tr className="text-left">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Active
              </th>
              <th scope="col" className="px-6 py-3">
                Items
              </th>
              <th scope="col" className="px-6 py-3">
                Donations
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="">
            {sortedOrganisations ? (
              sortedOrganisations.map((organisation, index) => (
                <tr
                  key={index}
                  className={`${
                    _id == organisation._id ? "bg-gray-300" : ""
                  }     hover:bg-gray-200 border-b-2`}
                >
                  <th
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Link
                      className="flex px-6 py-4  w-full"
                      href={
                        _id == organisation._id
                          ? "/"
                          : `?_id=${organisation._id}`
                      }
                    >
                      {organisation.name}
                    </Link>
                  </th>
                  <td>
                    <Link
                      className="flex px-6 py-4  w-full"
                      href={
                        _id == organisation._id
                          ? "/"
                          : `?_id=${organisation._id}`
                      }
                    >
                      {organisation.activeStatus.toString()}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="flex px-6 py-4  w-full"
                      href={
                        _id == organisation._id
                          ? "/"
                          : `?_id=${organisation._id}`
                      }
                    >
                      {organisation.totalDonationItemsCount}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="flex px-6 py-4  w-full"
                      href={
                        _id == organisation._id
                          ? "/"
                          : `?_id=${organisation._id}`
                      }
                    >
                      {organisation.totalDonationsCount}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="flex px-6 py-4  w-full"
                      href={
                        _id == organisation._id
                          ? "/"
                          : `?_id=${organisation._id}`
                      }
                    >
                      {(organisation.totalDonationsValue).toLocaleString()}
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
      </div>
    </>
  );
}
