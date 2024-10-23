"use client";
import React, { useState } from "react";
import ItemDialog from "./ItemDialog";
import AddItemModal from "./Modals/AddItemModal";

export default function AddItemButton() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Add Organisation");
  return (
    <div>
      <ItemDialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Add Organisation" && (
          <AddItemModal setShowModal={setShowModal} />
        )}
      </ItemDialog>
      <button onClick={() => setShowModal(true)}>Add Item</button>
    </div>
  );
}
