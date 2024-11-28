"use client";
import React, { useState } from "react";
import ReusableDialog from "./ReusableDialog";
import AddItemModal from "./Modals/AddItemModal";
import { Plus } from "lucide-react";

type ItemAddButtonProps = {
  _id: string;
};

export default function ItemAddButton({ _id }: ItemAddButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Add Item");
  return (
    <div className="flex flex-col h-72 w-full justify-center">
      <ReusableDialog
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
      </ReusableDialog>
      <button
        className="text-black w-full font-semibold flex tracking-tight flex-col hover:border border border-transparent hover:border-black shadow duration-300 h-full justify-center gap-5 hover:bg-[#4ac5ac] bg-[#75ddc8] items-center rounded-xl p-5"
        onClick={() => (setModalContent("Add Item"), setShowModal(true))}
      >
        <Plus size={20} /> Add Item
      </button>
    </div>
  );
}
