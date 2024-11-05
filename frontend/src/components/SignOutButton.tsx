"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";



export default function SignOutButton() {
  const { status } = useSession();
  return (
    status === "authenticated" && (
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="p-1 px-2 font-rubik  tracking-tighter hover:border-black border-2 border-transparent duration-200 hover:bg-[#4ac5ac] bg-[#def2b1] rounded-lg text-black"
      >
        Sign out
      </button>
    )
  );
}
