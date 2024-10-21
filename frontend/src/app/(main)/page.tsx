// import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../components/OrganisationBar/OrganisationDataOptions";
import OrganisationTable from "./OrganisationTable";
import OrganisationGraph from "./OrganisationGraph";

type HomeProps = {
  searchParams: {
    name: string;
  };
};

export default async function Home({ searchParams: { name } }: HomeProps) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  // const items = await axios
  //   .get("http://localhost:5000/api/item/get-items")
  //   .then(function (response) {
  //     // handle success
  //     return response.data;
  //   });

  return (
    <main className="bg-slate-50 mt-20 flex flex-col gap-2">
      <OrganisationDataOptions name={name} />
      <div className="grid md:grid-cols-5 gap-8 items-center">
        {/* <ItemForm /> */}
        <div className="col-span-3 border-t-2">
          <OrganisationTable name={name}/>
        </div>
        <div className="col-span-2 border-2 ">
          <OrganisationGraph name={name} />
        </div>
      </div>
    </main>
  );
}
