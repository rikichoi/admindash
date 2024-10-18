import axios from "axios";
import PaymentForm from "./components/PaymentForm";

type Donation = {
  refundStatus: boolean;
  amount: number;
  orgName?: string;
  comment: string;
  donorName?: string;
  itemId: string;
  createdAt: Date;
  updatedAt: Date;
};

async function getDonations(): Promise<Donation[] | undefined> {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/donation/get-donations"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.errors);
    } else {
      console.log(error);
    }
  }
}

export default async function Home() {
  const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY!.toString();
  const donations = await getDonations();
  return (
    <div className="bg-slate-50 border-2 flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <PaymentForm STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY} />
      <div className="text-black flex gap-40">
        <ol>
          <li>Test Card Details</li>
          <li>4242424242424242</li>
          <li>Any 3 digits</li>
          <li>Any future date</li>
        </ol>
        <div className="flex flex-col gap-5">
          {donations &&
            donations.map((donation, index) => (
              <ol key={index}>
                <li>Donor Name: {donation.donorName}</li>
                <li>Comment: {donation.comment}</li>
              </ol>
            ))}
        </div>
      </div>
    </div>
  );
}
