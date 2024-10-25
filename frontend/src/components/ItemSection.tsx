import React from "react";
import ItemAddButton from "./ItemAddButton";
import { Item } from "@/lib/types";

type ItemSectionProps = {
  items: Item[] | null;
};

export default function ItemSection({ items }: ItemSectionProps) {
  return (
    <div className="text-black">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.itemImage}</p>
              <p>{item.imageUrl}</p>
            </div>
          ))}
        <ItemAddButton />
      </div>
      <h1>ItemSection</h1>
    </div>
  );
}
