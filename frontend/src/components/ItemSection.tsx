"use client";
import React, { useState } from "react";
import ItemAddButton from "./ItemAddButton";
import { Item } from "@/lib/types";
import ItemDialog from "./ItemDialog";
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
      <ItemDialog
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
      </ItemDialog>
      <div className="grid gap-5 w-full sm:grid-cols-2 md:grid-cols-3 bg-white rounded-xl p-4">
        {items &&
          items.map((item, index) => (
            <button
              onClick={() => (
                setSelectedItemId(item._id),
                setModalContent("Edit Item"),
                setShowModal(true)
              )}
              className="w-full font-rubik h-72 hover:border border border-transparent hover:border-black drop-shadow-md duration-300 p-4 bg-zinc-50 rounded-2xl justify-center mx-auto flex flex-col gap-2"
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
  );
}
