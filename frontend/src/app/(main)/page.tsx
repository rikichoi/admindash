import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../../components/OrganisationDataOptions";
import OrganisationTable from "../../components/OrganisationTable";
import OrganisationGraphSection from "../../components/OrganisationGraphSection";
import { Item, Organisation } from "../../lib/types";
import axios from "axios";
import ItemSection from "../../components/ItemSection";
import { Metadata } from "next";

// TODO: make this dynamic so that selected org name gets displayed *optional*
export const metadata: Metadata = {
  title: "AdminDash - Dashboard",
};

type HomeProps = {
  searchParams: {
    _id: string;
  };
};

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

export default async function Home({ searchParams: { _id } }: HomeProps) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  async function getItems(): Promise<Item[] | null> {
    if (!_id) return null;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/item/get-org-items/${_id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const organisations = await getOrganisations();
  const items = await getItems();

  return (
    <main className="py-12 border h-full  bg-[#f7fafc]">
      <div className="flex flex-col xl:flex-row">
        <div className="flex overflow-y-scroll max-h-[493px] w-full xl:w-1/2 h-full p-4">
          {items ? (
            <ItemSection items={items} _id={_id} />
          ) : (
            <span className="">No Organisation Selected...</span>
          )}
        </div>
        <div className="flex border-t xl:border-l w-full xl:w-1/2 h-full flex-col p-2">
          <OrganisationGraphSection
            items={items}
            organisations={organisations}
            _id={_id}
          />
        </div>
      </div>
      <div>
        <div className="border-t flex h-full flex-col p-2 gap-2">
          <OrganisationDataOptions _id={_id} organisations={organisations} />
          <OrganisationTable _id={_id} organisations={organisations} />
        </div>
      </div>
    </main>
  );
}
