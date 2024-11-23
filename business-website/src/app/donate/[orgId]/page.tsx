import PaymentForm from "@/components/PaymentForm";
import { getOrganisationItems, getOrganisations } from "@/app/server/actions";
import React from "react";

type DonationPageProps = {
  params: {
    orgId: string;
  };
};

export default async function DonationPage({
  params: { orgId },
}: DonationPageProps) {
  const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY!.toString();
  const organisations = await getOrganisations();
  const items = await getOrganisationItems(orgId);
  return (
    <div className="bg-slate-50 font-rubik pt-16 min-h-screen">
      <div className="text-black flex justify-center">
        <ol>
          <li className="font-semibold">Test Card Details</li>
          <li className="list-disc">4242 4242 4242 4242</li>
          <li className="list-disc">Any 3 digits</li>
          <li className="list-disc">Any future date</li>
        </ol>
      </div>
      <PaymentForm
        orgId={orgId}
        items={items}
        organisations={organisations}
        STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
      />
    </div>
  );
}
