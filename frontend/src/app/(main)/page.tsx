// import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../../components/OrganisationDataOptions";
import OrganisationTable from "../../components/OrganisationTable";
import OrganisationGraph from "../../components/OrganisationGraph";
import { Item, Organisation } from "../../lib/types";
import axios from "axios";
import ItemSection from "../../components/ItemSection";

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
    try {
      const response = await axios.get(
        `http://localhost:5000/api/item/get-org-items/${_id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // const items = await axios
  //   .get("http://localhost:5000/api/item/get-items")
  //   .then(function (response) {
  //     // handle success
  //     return response.data;
  //   });

  const organisations = await getOrganisations();
  const items = await getItems();

  console.log(items);

  return (
    <main className="bg-slate-50 mt-20 flex flex-col gap-2">
      <OrganisationDataOptions _id={_id} organisations={organisations} />
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-center ">
        {/* <ItemForm /> */}
        <div className="w-full lg:w-auto">
          <OrganisationTable _id={_id} organisations={organisations} />
        </div>
        <div className="flex-1">
          <OrganisationGraph _id={_id} />
        </div>
      </div>
      <div>
        <ItemSection items={items} _id={_id} />
      </div>
    </main>
  );
}
