import axios from "axios";
import React from "react";
import { Organisation } from "../lib/types";

async function getOrganisations(): Promise<Organisation[] | null> {
  "use server";
  try {
    const response = await axios.get(
      "http://localhost:5000/api/organisation/get-organisations"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function OrganisationTable() {
  const organisations = await getOrganisations();
  return (
    <div className="border-2 text-black">
      {organisations?.map((organisation, index) => (
        <div key={index}>{JSON.stringify(organisation)}</div>
      ))}
    </div>
  );
}
