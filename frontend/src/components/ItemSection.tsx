import React from "react";
import ItemAddButton from "./ItemAddButton";

export default function ItemSection() {
  return (
    <div className="text-black">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ItemAddButton />
      </div>
      <h1>ItemSection</h1>
    </div>
  );
}
