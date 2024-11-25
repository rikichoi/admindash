import InfiniteSlider from "../components/InfiniteSlider";
import { ArrowRight } from "lucide-react";
import { getItems, getOrganisations } from "../server/actions";
import OrganisationCarousel from "../components/OrganisationCarousel";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ItemCarousel } from "@/components/ItemCarousel";

// type Donation = {
//   refundStatus: boolean;
//   amount: number;
//   orgName?: string;
//   comment: string;
//   donorName?: string;
//   itemId: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// async function getDonations(): Promise<Donation[] | undefined> {
//   try {
//     const response = await axios.get(
//       "http://3.128.24.35:5000/api/donation/get-donations"
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log(error.response?.data.errors);
//     } else {
//       console.log(error);
//     }
//   }
// }

export default async function Home() {
  const Mapbox = dynamic(() => import("../components/Mapbox"), {
    ssr: false,
  });

  const organisations = await getOrganisations();
  const items = await getItems();
  return (
    <div className="flex min-h-screen flex-col justify-center gap-16 bg-slate-50 pt-16 font-rubik">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold text-black lg:text-5xl">
          Change Lives & Support Children
        </h1>
        <p className="mx-auto max-w-xl items-center text-center text-sm text-gray-500 lg:text-lg">
          NexaGrid works over 190 countries and territories to save
          children&apos;s lives and to help them fulfil their potential. And we
          never give up.
        </p>
        <Link
          href={"/donate"}
          className="group relative mx-auto flex w-fit items-center gap-2 overflow-hidden rounded-lg bg-[#1ab394] px-2 py-3 text-lg text-white transition-all duration-300 ease-in-out hover:bg-[#00cca3] md:px-20"
        >
          <span className="duration 300 flex items-center gap-2 transition-transform ease-in-out group-hover:translate-x-2">
            Make a Donation <ArrowRight />
          </span>
        </Link>
        <div className="mx-auto max-w-3xl rounded-xl border-2 border-[#041e39]">
          <div className="flex min-h-9 w-full items-center gap-3 rounded-t-lg bg-[#041e39] px-4">
            <div className="h-3 w-3 rounded-full bg-white"></div>
            <div className="h-3 w-3 rounded-full bg-white"></div>
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
          <video className="h-full w-full rounded-b-lg" controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <section className="bg-white py-8 text-black">
        <h2 className="mb-2 text-center text-2xl font-bold leading-8">
          Our Clients
        </h2>
        <p className="text-center text-lg font-extralight leading-8">
          We are trusted by the world’s most innovative teams
        </p>
        <InfiniteSlider />
      </section>
      <div className="flex flex-col gap-12">
        <h1 className="text-center text-2xl font-semibold tracking-tighter text-black lg:text-4xl">
          Sponsored Organisations
        </h1>
        <OrganisationCarousel organisations={organisations} />
      </div>
      <div className="flex flex-col items-center justify-center gap-12 bg-white p-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <Link
            href={"/donate"}
            className="w-fit rounded-lg bg-[#e4f0c8] px-6 py-3 text-sm font-semibold uppercase text-green-800 transition-all duration-300 hover:bg-[#00cca3]"
          >
            Donate
          </Link>
          <h1 className="text-center text-2xl font-semibold tracking-tighter text-black lg:text-4xl">
            Your help is Needed
          </h1>
        </div>
        <ItemCarousel items={items} />
      </div>
      <div className="grid min-h-[90vh] gap-12 p-5 lg:grid-cols-2 lg:p-0">
        <div className="flex flex-col items-center justify-center gap-10 lg:items-baseline lg:pl-40">
          <h1 className="text-2xl font-semibold tracking-tighter text-black lg:text-4xl">
            Reach Out
          </h1>
          <p className="max-w-xl items-center text-sm text-gray-500 lg:text-xl">
            We always enjoy hearing from you. Have a story to tell or have a
            question? Contact us anytime.
          </p>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="max-w-xl items-center uppercase tracking-tight text-gray-500">
                Email
              </h2>
              <p className="max-w-xl items-center text-xl text-black">
                support@nexagrid.io
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="max-w-xl items-center uppercase tracking-tight text-gray-500">
                Mailing Address
              </h2>
              <p className="max-w-xl items-center text-xl text-black">
                234 N MICHELLIN AVE #8178 COVINA, CA 12312
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="max-w-xl items-center uppercase tracking-tight text-gray-500">
                Help Center
              </h2>
              <p className="max-w-xl items-center text-xl text-black">
                Learn More
              </p>
            </div>
          </div>
        </div>
        <Mapbox />
      </div>
    </div>
  );
}
