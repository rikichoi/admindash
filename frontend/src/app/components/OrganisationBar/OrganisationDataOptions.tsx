"use client";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Dialog from "../Dialog";
import AddOrganisationModal from "../Modals/AddOrganisationModal";

export default function OrganisationDataOptions() {
  const [showModal, setShowModal] = useState(true);
  const [modalContent, setModalContent] = useState("Add Organisation");

  return (
    <div className="flex items-center ">
      <Dialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Add Organisation" && (
          <AddOrganisationModal
            setShowModal={setShowModal}
          />
        )}
        {modalContent == "" && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            eligendi odio ipsa nostrum dolores voluptas architecto tempore nulla
            voluptatibus vel, placeat explicabo exercitationem id officia
            laborum doloremque blanditiis earum accusamus.
          </p>
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
      <button
        onClick={() => (setModalContent(""), setShowModal(true))}
        className="flex gap-2 hover:bg-orange-700 bg-orange-600 items-center border-2 rounded-lg p-3"
      >
        <Edit size={20} /> Edit
      </button>
      <button className="flex gap-2 hover:bg-red-700 bg-red-600 items-center border-2 rounded-lg p-3">
        <Trash2 size={20} /> Delete
      </button>
    </div>
  );
}
