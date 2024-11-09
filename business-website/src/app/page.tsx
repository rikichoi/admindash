import InfiniteSlider from "./components/InfiniteSlider";
import { ArrowRight } from "lucide-react";
import { getOrganisations } from "./server/actions";
import GridCarousel from "./components/GridCarousel";
import Link from "next/link";
import Mapbox from "./components/Mapbox";

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
  const organisations = await getOrganisations();
  console.log(organisations);
  return (
    <div className="font-rubik justify-center bg-slate-50 flex flex-col min-h-screen pt-16 gap-16 ">
      <div className="flex flex-col gap-6">
        <h1 className="text-black text-3xl lg:text-5xl font-bold text-center">
          Change Lives & Support Children
        </h1>
        <p className="text-gray-500 text-lg max-w-xl items-center text-center mx-auto">
          NexaGrid works over 190 countries and territories to save
          children&apos;s lives and to help them fulfil their potential. And we
          never give up.
        </p>
        <Link
          href={"/donate"}
          className="flex gap-2 group relative overflow-hidden transition-all ease-in-out duration-300 items-center mx-auto w-fit py-3 px-2 md:px-20 text-lg  text-white rounded-lg bg-[#1ab394] hover:bg-[#00cca3]"
        >
          <span className="flex gap-2 items-center transition-transform duration 300 ease-in-out group-hover:translate-x-2">
            Make a Donation <ArrowRight />
          </span>
        </Link>
        <div className="max-w-3xl mx-auto border-2 border-[#041e39] rounded-xl">
          <div className="w-full bg-[#041e39] min-h-9 rounded-t-lg items-center flex px-4 gap-3">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
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
      <section className="bg-white text-black py-8">
        <h2 className="text-center text-2xl mb-2 font-bold leading-8">
          Our Clients
        </h2>
        <p className="text-center text-lg font-extralight leading-8 ">
          We are trusted by the world’s most innovative teams
        </p>
        <InfiniteSlider />
      </section>
      <div className="flex flex-col gap-12">
        <h1 className="text-black tracking-tighter text-4xl font-semibold text-center">
          Sponsored Organisations
        </h1>
        <GridCarousel organisations={organisations} />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 min-h-[90vh]">
        <div className="flex flex-col gap-10 items-center lg:items-baseline lg:pl-40 justify-center">
          <h1 className="text-black tracking-tighter  text-4xl font-semibold">
            Reach Out
          </h1>
          <p className="text-gray-500 text-xl max-w-xl items-center">
            We always enjoy hearing from you. Have a story to tell or have a
            question? Contact us anytime.
          </p>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className=" text-gray-500 uppercase tracking-tight  max-w-xl items-center">
                Email
              </h2>
              <p className="text-black text-xl max-w-xl items-center">
                support@nexagrid.io
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-gray-500 uppercase tracking-tight  max-w-xl items-center">
                Mailing Address
              </h2>
              <p className="text-black text-xl max-w-xl items-center">
                234 N MICHELLIN AVE #8178 COVINA, CA 12312
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-gray-500 uppercase tracking-tight  max-w-xl items-center">
                Help Center
              </h2>
              <p className="text-black text-xl max-w-xl items-center">
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
