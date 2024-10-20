"use client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import React, { Dispatch, SetStateAction } from "react";

type DeleteOrganisationModalProps = {
  name?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteOrganisationModal({
  name,
  setShowModal,
}: DeleteOrganisationModalProps) {
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get.name;

    await axios
      .delete(
        `http://localhost:5000/api/organisation/delete-organisation/${name}`,
        {}
      )
      .then(function (response) {
        console.log(response);
        setShowModal(false);
        revalidatePath("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="flex flex-col gap-3" action={handleSubmit}>
      <input className="border-2 p-2 rounded-lg" value={name} />
      <input
        type="submit"
        className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
      />
      <button
        onClick={() => setShowModal(false)}
        className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
      />
    </form>
  );
}
