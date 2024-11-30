"use client";
import { Donation } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";

type ReviewDonationModalProps = {
  donation?: Donation;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function ReviewDonationModal({
  donation,
  setShowModal,
}: ReviewDonationModalProps) {
  console.log(donation);
  if (!donation) {
    return;
  }
  return (
    <div className="flex flex-col gap-3">
      <p>Donor Name: {donation.donorName}</p>
      <p>
        Amount: $
        {(Math.floor(donation.amount) / 100).toFixed(2).toLocaleString()}
      </p>
      <div className="flex gap-7">
        <p>Email: {donation.donorName}</p>
        <p>Phone: {donation.donorName}</p>
      </div>
      <p>Comment: {donation.comment}</p>
      <p>Refund Status: {String(donation.refundStatus)}</p>
      <p>Organisation Name: {donation.orgId.name}</p>
      <p>
        Total Donations Value:{" "}
        {(Math.floor(donation.orgId.totalDonationsValue) / 100)
          .toFixed(2)
          .toLocaleString()}
      </p>
      <p>Total Donations Count: {donation.orgId.totalDonationsCount}</p>

      <div className="flex ">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="p-2 border-2 bg-red-600 text-white hover:cursor-pointer rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
