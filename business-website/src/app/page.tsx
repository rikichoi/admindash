import InfiniteSlider from "./components/InfiniteSlider";
import PaymentForm from "./components/PaymentForm";
import { ArrowRight } from "lucide-react";

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
  const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY!.toString();

  return (
    <div className="font-rubik justify-center bg-slate-50 flex flex-col min-h-screen pt-10 pb-20 gap-16 ">
      <div className="flex flex-col gap-3">
        <h1 className="text-black text-5xl font-bold text-center">
          Fast & Affordable Proxy Servers
        </h1>
        <p className="text-gray-500 text-lg max-w-xl items-center text-center mx-auto">
          Buy anonymous and private proxy servers. HTTP & SOCKS5 Proxy
          supported. IP Authentication or Password Authentication available.
        </p>
        <button className="flex gap-2 items-center mx-auto w-fit py-3 px-20 text-lg  text-white rounded-lg  transition-all bg-[#1ab394] duration-300 hover:bg-[#00cca3]">
          Try Now
          <ArrowRight />
        </button>
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
      <PaymentForm STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY} />
      <div className="text-black flex justify-center">
        <ol>
          <li>Test Card Details</li>
          <li>4242424242424242</li>
          <li>Any 3 digits</li>
          <li>Any future date</li>
        </ol>
      </div>
    </div>
  );
}
