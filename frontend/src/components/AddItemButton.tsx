"use client";
import React, { useState } from "react";
import ItemDialog from "./ItemDialog";
import AddItemModal from "./Modals/AddItemModal";

export default function AddItemButton() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Add Item");
  return (
    <div>
      <ItemDialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Add Item" && (
          <AddItemModal setShowModal={setShowModal} />
        )}
      </ItemDialog>
      <button onClick={() => (setModalContent("Add Item"), setShowModal(true))}>
        Add Item
      </button>
    </div>
  );
}
