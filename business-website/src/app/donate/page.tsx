import React from "react";
import OrganisationCarousel from "../../components/OrganisationCarousel";
import { getOrganisations } from "../../server/actions";

export default async function DonatePage() {
  const organisations = await getOrganisations();
  return (
    <div className="h-full min-h-screen bg-slate-50 pt-16 font-rubik">
      <div className="flex flex-col gap-12">
        <h1 className="text-center text-4xl font-semibold tracking-tighter text-black">
          Select an Organisation
        </h1>
        <OrganisationCarousel organisations={organisations} />
      </div>
    </div>
  );
}
