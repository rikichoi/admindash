import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../../components/OrganisationDataOptions";
import OrganisationTable from "../../components/OrganisationTable";
import OrganisationGraphSection from "../../components/OrganisationGraphSection";
import ItemSection from "../../components/ItemSection";
import { Metadata } from "next";
import PaginationBar from "@/components/PaginationBar";
import {
  getAllOrganisations,
  getItems,
  getPaginatedOrganisations,
} from "@/server/api/actions";

export const metadata: Metadata = {
  title: "AdminDash - Dashboard",
};

type HomeProps = {
  searchParams: {
    _id: string;
    page: number;
  };
};

export default async function Home({
  searchParams: { _id, page = 1 },
}: HomeProps) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const [allOrganisations, paginatedOrganisations] = await Promise.all([
    getAllOrganisations(),
    getPaginatedOrganisations(page),
  ]);

  const items = await getItems(_id);

  const pageSize = 5;
  const totalPages = Math.ceil(allOrganisations.length / pageSize);

  return (
    <main className="py-12 h-full bg-[#f7fcec]">
      <div className="p-8 pb-1 space-y-2">
        <OrganisationDataOptions
          _id={_id}
          organisations={paginatedOrganisations}
        />
        <div className="bg-white border rounded-xl p-4 flex flex-col gap-2">
            <OrganisationTable
              currentPage={page}
              _id={_id}
              organisations={paginatedOrganisations}
            />
          <PaginationBar
            pathname={"/"}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row ">
        <div className="flex w-full xl:w-1/2 h-full p-8">
          {items ? (
            <ItemSection items={items} _id={_id} />
          ) : (
            <div className=" border bg-white rounded-xl w-full min-h-80 p-4 flex flex-col gap-1">
              <h1 className="font-medium text-2xl">Campaign Items</h1>
              <p className="text-base lg:text-xl m-auto justify-center flex">
                No Organisation Selected...
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full xl:w-1/2 max-h-[493px] h-full flex-col p-8">
          {allOrganisations && allOrganisations.length > 0 ? (
            <OrganisationGraphSection
              items={items}
              organisations={allOrganisations}
              _id={_id}
            />
          ) : (
            <div className=" border bg-white rounded-xl w-full min-h-80 p-4 flex flex-col gap-1">
              <h1 className="font-medium text-2xl">Analytics</h1>
              <p className="text-base lg:text-xl m-auto justify-center flex">
                No Organisation Selected...
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
