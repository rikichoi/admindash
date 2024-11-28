"use client";
import React, { useEffect, useState } from "react";
import ReusableDialog from "./ReusableDialog";
import AddOrganisationModal from "./Modals/AddOrganisationModal";
import DeleteOrganisationModal from "./Modals/DeleteOrganisationModal";
import EditOrganisationModal from "./Modals/EditOrganisationModal";
import { Organisation } from "../lib/types";

type OrganisationDataOptionsProps = {
  _id?: string;
  organisations: Organisation[] | null;
};

export default function OrganisationDataOptions({
  _id,
  organisations,
}: OrganisationDataOptionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Add Organisation");
  const [selectedOrganisation, setSelectedOrganisation] = useState<
    Organisation | undefined
  >();

  useEffect(() => {
    const selectedOrg: Organisation | undefined = organisations?.filter(
      (org) => {
        return org._id == _id;
      }
    )[0];
    setSelectedOrganisation(selectedOrg);
  }, [_id]);

  return (
    <div className="flex justify-end items-center gap-1 text-black">
      <ReusableDialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Add Organisation" && (
          <AddOrganisationModal setShowModal={setShowModal} />
        )}
        {modalContent == "Edit Organisation" && (
          <EditOrganisationModal
            setShowModal={setShowModal}
            organisation={selectedOrganisation}
            _id={_id}
          />
        )}
        {modalContent == "Delete Organisation" && (
          <DeleteOrganisationModal _id={_id} setShowModal={setShowModal} />
        )}
      </ReusableDialog>
      <h1 className="text-2xl font-medium me-auto">Organisations</h1>
      <button
        onClick={() => (
          (document.body.style.overflow = "hidden"),
          setModalContent("Add Organisation"),
          setShowModal(true)
        )}
        className="flex tracking-tight text-white duration-300 gap-1 border border-transparent hover:border-black font-semibold hover:bg-[#4ac5ac] bg-[#49b989] items-center rounded-lg px-4 p-2"
      >
        Add
      </button>
      {_id && (
        <>
          <button
            onClick={() => (
              setModalContent("Edit Organisation"), setShowModal(true)
            )}
            className="flex duration-300 text-white tracking-tight gap-1 border border-transparent hover:border-black font-semibold hover:bg-orange-500 bg-orange-600 items-center rounded-lg px-4 p-2"
          >
            Edit
          </button>
          <button
            onClick={() => (
              setModalContent("Delete Organisation"), setShowModal(true)
            )}
            className="flex duration-300 text-white tracking-tight gap-1 border border-transparent hover:border-black font-semibold hover:bg-red-600 bg-red-500 items-center rounded-lg px-4 p-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
