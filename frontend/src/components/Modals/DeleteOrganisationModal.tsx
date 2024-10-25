"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

type DeleteOrganisationModalProps = {
  _id?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteOrganisationModal({
  _id,
  setShowModal,
}: DeleteOrganisationModalProps) {
  const router = useRouter();
  const handleSubmit = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/organisation/delete-organisation/${_id}`,
        {}
      )
      .then(function (response) {
        console.log(response);
        setShowModal(false);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="flex flex-col gap-3" action={handleSubmit}>
      <input hidden readOnly className="border-2 p-2 rounded-lg" value={_id} />
      <p>
        Are you sure you want to delete this organisation?
      </p>
      <div className="flex ">
        <input
          type="submit"
          className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
        />
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
