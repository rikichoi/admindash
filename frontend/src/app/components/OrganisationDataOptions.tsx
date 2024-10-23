"use client";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Dialog from "./OrganisationDialog";
import AddOrganisationModal from "./Modals/AddOrganisationModal";
import DeleteOrganisationModal from "./Modals/DeleteOrganisationModal";
import EditOrganisationModal from "./Modals/EditOrganisationModal";
import { Organisation } from "@/app/lib/types";

type OrganisationDataOptionsProps = {
  name?: string;
  organisations: Organisation[] | null;
};

export default function OrganisationDataOptions({
  name,
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
        return org.name == name;
      }
    )[0];
    setSelectedOrganisation(selectedOrg);
  }, [name]);

  return (
    <div className="flex items-center gap-2">
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
          <DeleteOrganisationModal name={name} setShowModal={setShowModal} />
        )}
      </Dialog>
      <button
        onClick={() => (
          (document.body.style.overflow = "hidden"),
          setModalContent("Add Organisation"),
          setShowModal(true)
        )}
        className="flex gap-2 hover:bg-blue-700 bg-blue-600 items-center rounded-lg p-3"
      >
        <Plus size={20} /> Organisation
      </button>
      {name && (
        <>
          <button
            onClick={() => (
              setModalContent("Edit Organisation"), setShowModal(true)
            )}
            className="flex gap-2 hover:bg-orange-700 bg-orange-600 items-center rounded-lg p-3"
          >
            <Edit size={20} /> Edit
          </button>
          <button
            onClick={() => (
              setModalContent("Delete Organisation"), setShowModal(true)
            )}
            className="flex gap-2 hover:bg-red-700 bg-red-600 items-center rounded-lg p-3"
          >
            <Trash2 size={20} /> Delete
          </button>
        </>
      )}
    </div>
  );
}
