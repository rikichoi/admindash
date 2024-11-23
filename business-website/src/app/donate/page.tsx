import React from "react";
import OrganisationCarousel from "../../components/OrganisationCarousel";
import { getOrganisations } from "../server/actions";

export default async function DonatePage() {
  const organisations = await getOrganisations();
  return (
    <div className="bg-slate-50 h-full font-rubik pt-16 min-h-screen">
      <div className="flex flex-col gap-12">
        <h1 className="text-black tracking-tighter text-4xl font-semibold text-center">
          Select an Organisation
        </h1>
        <OrganisationCarousel organisations={organisations} />
      </div>
    </div>
  );
}
