// import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../components/OrganisationBar/OrganisationDataOptions";
import OrganisationTable from "./OrganisationTable";

export default async function Home() {
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
      <OrganisationDataOptions />
      <div className="grid grid-cols-5 md:flex-row gap-8 items-center">
        {/* <ItemForm /> */}
        <div className="col-span-3 border-2 h-[500px] rounded-lg">
          <OrganisationTable />
        </div>
        <div className="col-span-2 border-2 "></div>
      </div>
    </main>
  );
}
