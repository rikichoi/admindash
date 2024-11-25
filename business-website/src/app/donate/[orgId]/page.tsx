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
    <div className="min-h-screen bg-slate-50 pt-16 font-rubik">
      <div className="flex justify-center text-black">
        <ol>
          <li className="font-semibold">Test Card Details</li>
          <li className="list-disc">4242 4242 4242 4242</li>
          <li className="list-disc">Any 3 digits</li>
          <li className="list-disc">Any future date</li>
        </ol>
      </div>
      <PaymentForm
        orgId={orgId}
        itemId={itemId}
        items={items}
        organisations={organisations}
        STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
      />
    </div>
  );
}
