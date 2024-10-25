import React from "react";
import ItemAddButton from "./ItemAddButton";
import { Item } from "@/lib/types";

type ItemSectionProps = {
  items: Item[] | null;
  _id: string;
};

export default function ItemSection({ items, _id }: ItemSectionProps) {
  return (
    <div className="text-black">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items &&
          items.map((item, index) => (
            <div className="w-fit" key={index}>
              {item.imageUrl && (
                <img
                  width={400}
                  height={400}
                  className="max-w-40 max-h-40 object-center object-cover"
                  alt={item.name}
                  src={item.imageUrl}
                ></img>
              )}
              <p>{item.name}</p>
              <p>{item.itemImage}</p>
            </div>
          ))}
        {_id && <ItemAddButton _id={_id}/>}
      </div>
    </div>
  );
}
