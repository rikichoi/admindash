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
  return (
    <div className="flex flex-col gap-3">
      <p>{JSON.stringify(donation)}</p>
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
