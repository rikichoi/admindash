import React from "react";
import OrganisationCarousel from "../../components/OrganisationCarousel";
import { getItems, getOrganisations } from "../../server/actions";
import { ItemCarousel } from "@/components/ItemCarousel";

export default async function DonatePage() {
  const organisations = await getOrganisations();
  const items = await getItems();
  return (
    <div className="h-full min-h-screen bg-slate-50 pt-16 font-rubik">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-4xl font-semibold tracking-tighter text-black">
          Organisations
        </h1>
        <OrganisationCarousel organisations={organisations} />
        <h1 className="text-center text-4xl font-semibold tracking-tighter text-black">
          Item Campaigns
        </h1>
        <ItemCarousel backgroundColor={"bg-white"} items={items} />
      </div>
    </div>
  );
}
