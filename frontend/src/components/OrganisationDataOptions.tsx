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
    <div className="flex items-center gap-2 text-white">
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
        className="flex duration-200 gap-2 hover:bg-blue-700 bg-blue-600 items-center rounded-lg p-3"
      >
        <Plus size={20} /> Organisation
      </button>
      {_id && (
        <>
          <button
            onClick={() => (
              setModalContent("Edit Organisation"), setShowModal(true)
            )}
            className="flex duration-200 gap-2 hover:bg-orange-700 bg-orange-600 items-center rounded-lg p-3"
          >
            <Edit size={20} /> Edit
          </button>
          <button
            onClick={() => (
              setModalContent("Delete Organisation"), setShowModal(true)
            )}
            className="flex duration-200 gap-2 hover:bg-red-700 bg-red-600 items-center rounded-lg p-3"
          >
            <Trash2 size={20} /> Delete
          </button>
        </>
      )}
    </div>
  );
}
