import PaymentForm from "@/components/PaymentForm";
import { getOrganisationItems, getOrganisations } from "@/server/actions";
import React from "react";

type DonationPageProps = {
  searchParams: {
    itemId?: string;
  };
  params: {
    orgId: string;
  };
};

export default async function DonationPage({
  searchParams: { itemId },
  params: { orgId },
}: DonationPageProps) {
  const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY!.toString();
  const organisations = await getOrganisations();
  const items = await getOrganisationItems(orgId);
  return (
    <div className="min-h-screen bg-[url('./assets/donation-page-background.jpg')] bg-cover font-rubik lg:pb-4 lg:pt-6">
      {/* <div className="flex justify-center text-black">
        <ol>
          <li className="font-semibold">Test Card Details</li>
          <li className="list-disc">4242 4242 4242 4242</li>
          <li className="list-disc">Any 3 digits</li>
          <li className="list-disc">Any future date</li>
        </ol>
      </div> */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 border-2 bg-white p-6 lg:grid-cols-2 lg:rounded-xl">
        <div className="hidden items-center justify-center rounded-xl bg-black bg-[url('./assets/payment-form-background.jpg')] bg-cover bg-center lg:flex">
          <h2 className="px-16 text-6xl font-bold tracking-tighter text-white">
            We Can Support The Future
          </h2>
        </div>
        <PaymentForm
          orgId={orgId}
          itemId={itemId}
          items={items}
          organisations={organisations}
          STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
        />
      </div>
    </div>
  );
}
