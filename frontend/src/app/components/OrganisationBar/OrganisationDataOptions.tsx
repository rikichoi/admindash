"use client";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Dialog from "../Dialog";
import AddOrganisationModal from "../Modals/AddOrganisationModal";
import DeleteOrganisationModal from "../Modals/DeleteOrganisationModal";

type OrganisationDataOptionsProps = {
  name?: string;
};

export default function OrganisationDataOptions({
  name,
}: OrganisationDataOptionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Add Organisation");

  return (
    <div className="flex items-center ">
      <Dialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Add Organisation" && (
          <AddOrganisationModal setShowModal={setShowModal} />
        )}
        {modalContent == "Edit Organisation" && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            eligendi odio ipsa nostrum dolores voluptas architecto tempore nulla
            voluptatibus vel, placeat explicabo exercitationem id officia
            laborum doloremque blanditiis earum accusamus.
          </p>
        )}
        {modalContent == "Delete Organisation" && (
          <DeleteOrganisationModal name={name} setShowModal={setShowModal}/>
        )}
      </Dialog>
      <button
        onClick={() => (
          (document.body.style.overflow = "hidden"),
          setModalContent("Add Organisation"),
          setShowModal(true)
        )}
        className="flex gap-2 hover:bg-blue-700 bg-blue-600 items-center border-2 rounded-lg p-3"
      >
        <Plus size={20} /> Organisation
      </button>
      {name && (
        <>
          <button
            onClick={() => (
              setModalContent("Edit Organisation"), setShowModal(true)
            )}
            className="flex gap-2 hover:bg-orange-700 bg-orange-600 items-center border-2 rounded-lg p-3"
          >
            <Edit size={20} /> Edit
          </button>
          <button
            onClick={() => (
              setModalContent("Delete Organisation"), setShowModal(true)
            )}
            className="flex gap-2 hover:bg-red-700 bg-red-600 items-center border-2 rounded-lg p-3"
          >
            <Trash2 size={20} /> Delete
          </button>
        </>
      )}
    </div>
  );
}
