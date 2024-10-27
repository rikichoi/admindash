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
    <div className="text-black">
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items &&
          items.map((item, index) => (
            <button
              onClick={() => (
                setSelectedItemId(item._id),
                setModalContent("Edit Item"),
                setShowModal(true)
              )}
              className="w-fit h-full items-center justify-center mx-auto flex flex-col gap-2"
              key={index}
            >
              {item.imageUrl && (
                <img
                  width={400}
                  height={400}
                  className="w-40 h-40 object-center object-contain"
                  alt={item.name}
                  src={item.imageUrl}
                ></img>
              )}
              <p>{item.name}</p>
              <p>{item.itemImage}</p>
            </button>
          ))}
        {_id && <ItemAddButton _id={_id} />}
      </div>
    </div>
  );
}
