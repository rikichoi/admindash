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
      // "http://localhost:5000/api/organisation/get-organisations"
      `http://${process.env.next_public_endpoint_url}/api/organisation/get-organisations`
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
        `http://${process.env.next_public_endpoint_url}/api/item/get-org-items/${_id}`
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
    <main className="py-12 h-full bg-[#f7fcec]">
      <div className="p-8 pb-1 space-y-2">
        <OrganisationDataOptions _id={_id} organisations={organisations} />
        <div className="bg-white border rounded-xl p-4 flex flex-col gap-2">
          <OrganisationTable _id={_id} organisations={organisations} />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row ">
        <div className="flex w-full xl:w-1/2 h-full p-8">
          {items ? (
            <ItemSection items={items} _id={_id} />
          ) : (
            <div className="justify-center items-center border bg-white rounded-xl w-full min-h-80 p-4 flex flex-col gap-1">
              <span className="text-xl">No Organisation Selected...</span>
            </div>
          )}
        </div>
        <div className="flex w-full xl:w-1/2 max-h-[493px] h-full flex-col p-8">
          <OrganisationGraphSection
            items={items}
            organisations={organisations}
            _id={_id}
          />
        </div>
      </div>
    </main>
  );
}
