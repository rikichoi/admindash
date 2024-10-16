import { getServerSession } from "next-auth";
import React from "react";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const session = (await getServerSession()) || undefined;
  return (
    <div className="flex items-center p-3 justify-end bg-white text-black">
      <SignOutButton session={session} />
    </div>
  );
}
