"use client";
import { deleteOrganisation } from "@/server/api/actions";
import React, { Dispatch, SetStateAction } from "react";

type DeleteOrganisationModalProps = {
  _id?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteOrganisationModal({
  _id,
  setShowModal,
}: DeleteOrganisationModalProps) {
  const handleSubmit = async () => {
    if (!_id) return;
    try {
      await deleteOrganisation(_id);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" action={handleSubmit}>
      <input hidden readOnly className="border-2 p-2 rounded-lg" value={_id} />
      <p>Are you sure you want to delete this organisation?</p>
      <div className="flex ">
        <button
          type="submit"
          className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
        >Delete</button>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="p-2 border-2 bg-red-600 text-white hover:cursor-pointer rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
