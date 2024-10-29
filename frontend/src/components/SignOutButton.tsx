"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";



export default function SignOutButton() {
  const { status } = useSession();
  return (
    status === "authenticated" && (
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="p-3 bg-black rounded-lg text-white"
      >
        Sign out
      </button>
    )
  );
}
