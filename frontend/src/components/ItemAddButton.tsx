"use client";
import React, { useState } from "react";
import ItemDialog from "./ItemDialog";
import AddItemModal from "./Modals/AddItemModal";
import { Plus } from "lucide-react";

export default function ItemAddButton() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Add Item");
  return (
    <div className="flex flex-col">
      <ItemDialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Add Item" && (
          <AddItemModal setShowModal={setShowModal} />
        )}
      </ItemDialog>
      <button
        className="text-white flex flex-col duration-200 h-full justify-center gap-5 hover:bg-blue-700 bg-blue-600 items-center rounded-lg p-5"
        onClick={() => (setModalContent("Add Item"), setShowModal(true))}
      >
        <Plus size={20} /> Add Item
      </button>
    </div>
  );
}
