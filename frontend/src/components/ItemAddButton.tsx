"use client";
import React, { useState } from "react";
import ItemDialog from "./ItemDialog";
import AddItemModal from "./Modals/AddItemModal";
import { Plus } from "lucide-react";

type ItemAddButtonProps = {
  _id: string;
};

export default function ItemAddButton({ _id }: ItemAddButtonProps) {
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
          <AddItemModal _id={_id} setShowModal={setShowModal} />
        )}
        {/* {modalContent == "Edit Item" && (
          <AddItemModal setShowModal={setShowModal} />
        )} */}
      </ItemDialog>
      <button
        className="text-white flex flex-col duration-200 h-40 justify-center gap-5 hover:bg-blue-700 bg-blue-600 items-center rounded-lg p-5"
        onClick={() => (setModalContent("Add Item"), setShowModal(true))}
      >
        <Plus size={20} /> Add Item
      </button>
    </div>
  );
}
