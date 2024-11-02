import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrganisationDataOptions from "../../components/OrganisationDataOptions";
import OrganisationTable from "../../components/OrganisationTable";
import OrganisationGraphSection from "../../components/OrganisationGraphSection";
import { Item, Organisation } from "../../lib/types";
import axios from "axios";
import ItemSection from "../../components/ItemSection";
import { Metadata } from "next";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
    <ResizablePanelGroup
      direction="vertical"
      className="pt-12 border bg-[#f7fafc]"
    >
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40}>
            <div className="flex flex-col p-2 gap-2">
              <OrganisationDataOptions
                _id={_id}
                organisations={organisations}
              />
              <OrganisationTable _id={_id} organisations={organisations} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <div className="flex flex-col p-2">
              <OrganisationGraphSection
                items={items}
                organisations={organisations}
                _id={_id}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex p-2 ">
          {items ? (
            <ItemSection items={items} _id={_id} />
          ) : (
            <span className="">No Organisation Selected...</span>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    // <main className="mt-12 flex flex-col gap-5 p-3">
    //   <OrganisationDataOptions _id={_id} organisations={organisations} />
    //   <div className="flex flex-col xl:flex-row justify-between gap-8">
    //     <div className="w-full lg:w-auto">
    //       <OrganisationTable _id={_id} organisations={organisations} />
    //     </div>
    //     <div className="flex-1">
    //       <OrganisationGraphSection _id={_id} />
    //     </div>
    //   </div>
    //   <div>
    //     <ItemSection items={items} _id={_id} />
    //   </div>
    // </main>
  );
}
