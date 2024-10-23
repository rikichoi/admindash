import React from "react";
import AddItemButton from "./AddItemButton";

export default function ItemSection() {
  return (
    <div className="text-black">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>Rendered Item from Database</div>
        <div>Rendered Item from Database</div>
        <div>Rendered Item from Database</div>
        <div>Rendered Item from Database</div>
        <div>Rendered Item from Database</div>
        <div>Rendered Item from Database</div>
        <AddItemButton />
      </div>
      <h1>ItemSection</h1>
    </div>
  );
}
