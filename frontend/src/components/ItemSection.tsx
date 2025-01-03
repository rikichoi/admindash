"use client";
import React, { useState } from "react";
import ItemAddButton from "./ItemAddButton";
import { Item } from "@/lib/types";
import ReusableDialog from "./ReusableDialog";
import EditItemModal from "./Modals/EditItemModal";

type ItemSectionProps = {
  items: Item[] | null;
  _id: string;
};

export default function ItemSection({ items, _id }: ItemSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("Edit Item");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem =
    items?.find((item) => item._id === selectedItemId) || null;

  return (
    <div className="w-full text-black">
      <ReusableDialog
        title={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent == "Edit Item" && (
          <EditItemModal
            item={selectedItem}
            _id={_id}
            setShowModal={setShowModal}
            itemId={selectedItemId}
          />
        )}
      </ReusableDialog>
      <div className="border max-h-[480px] overflow-y-scroll bg-white flex flex-col gap-3 rounded-xl p-4">
        <h1 className="font-medium text-2xl">Campaign Items</h1>
        <div className="grid gap-5 w-full sm:grid-cols-2 md:grid-cols-3">
          {items &&
            items.map((item, index) => (
              <button
                onClick={() => (
                  setSelectedItemId(item._id),
                  setModalContent("Edit Item"),
                  setShowModal(true)
                )}
                className="w-full font-rubik h-72 hover:border border border-transparent hover:border-black duration-300 p-4 bg-zinc-100 rounded-2xl justify-center mx-auto flex flex-col gap-2"
                key={index}
              >
                <h3 className="font-semibold text-xl">{item.name}</h3>
                {item.imageUrl && (
                  <img
                    key={item.imageUrl}
                    width={400}
                    height={400}
                    className="w-40 h-40 object-center mx-auto object-contain"
                    alt={item.name}
                    src={item.imageUrl}
                  ></img>
                )}

                <p>{item.summary}</p>
              </button>
            ))}
          {_id && <ItemAddButton _id={_id} />}
        </div>
      </div>
    </div>
  );
}
