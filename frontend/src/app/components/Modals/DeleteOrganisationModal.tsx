"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

type DeleteOrganisationModalProps = {
  name?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteOrganisationModal({
  name,
  setShowModal,
}: DeleteOrganisationModalProps) {
  const handleSubmit = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/organisation/delete-organisation/${name}`,
        {}
      )
      .then(function (response) {
        console.log(response);
        setShowModal(false);
        redirect("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="flex flex-col gap-3" action={handleSubmit}>
      <input hidden className="border-2 p-2 rounded-lg" value={name} />
      <p>
        Are you sure you want to{" "}
        <span className="text-red-500 font-bold">{name}</span> as an
        organisation? 
      </p>
      <div className="flex ">
        <input
          type="submit"
          className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
        />
        <button
          onClick={() => setShowModal(false)}
          className="p-2 border-2 bg-red-600 text-white hover:cursor-pointer rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
