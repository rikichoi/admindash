"use client";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Dialog from "./OrganisationDialog";
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
    <div className="flex items-center gap-1 text-black">
      <Dialog
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
      </Dialog>
      <button
        onClick={() => (
          (document.body.style.overflow = "hidden"),
          setModalContent("Add Organisation"),
          setShowModal(true)
        )}
        className="flex tracking-tight duration-300 gap-1 border border-transparent hover:border-black font-semibold hover:bg-[#4ac5ac] bg-[#75ddc8] items-center rounded-lg p-2"
      >
        <Plus size={19} /> Add
      </button>
      {_id && (
        <>
          <button
            onClick={() => (
              setModalContent("Edit Organisation"), setShowModal(true)
            )}
            className="flex duration-300 tracking-tight gap-1 border border-transparent hover:border-black font-semibold hover:bg-orange-700 bg-orange-600 items-center rounded-lg p-2"
          >
            <Edit size={20} /> Edit
          </button>
          <button
            onClick={() => (
              setModalContent("Delete Organisation"), setShowModal(true)
            )}
            className="flex duration-300 tracking-tight gap-1 border border-transparent hover:border-black font-semibold hover:bg-red-600 bg-red-400 items-center rounded-lg p-2"
          >
            <Trash2 size={20} /> Delete
          </button>
        </>
      )}
    </div>
  );
}
