import React from "react";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  return (
    <div className="fixed w-full flex items-center p-3 justify-end  max-h-20  text-black">
      <SignOutButton />
    </div>
  );
}
