// import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../components/OrganisationDataOptions";
import OrganisationTable from "../components/OrganisationTable";
import OrganisationGraph from "../components/OrganisationGraph";
import { Organisation } from "../lib/types";
import axios from "axios";
import ItemSection from "../components/ItemSection";

type HomeProps = {
  searchParams: {
    name: string;
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

export default async function Home({ searchParams: { name } }: HomeProps) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  // const items = await axios
  //   .get("http://localhost:5000/api/item/get-items")
  //   .then(function (response) {
  //     // handle success
  //     return response.data;
  //   });

  const organisations = await getOrganisations();

  return (
    <main className="bg-slate-50 mt-20 flex flex-col gap-2">
      <OrganisationDataOptions name={name} organisations={organisations} />
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
        {/* <ItemForm /> */}
        <div className="">
          <OrganisationTable name={name} organisations={organisations} />
        </div>
        <div className="flex-1">
          <OrganisationGraph name={name} />
        </div>
      </div>
      <div>
        <ItemSection />
      </div>
    </main>
  );
}
