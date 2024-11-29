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
  console.log(donation)
  return (
    <div className="flex flex-col gap-3">
      <h1>Organisation Name: {donation?.orgId.name}</h1>
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
