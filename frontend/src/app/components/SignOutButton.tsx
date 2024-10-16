"use client";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React from "react";

type SignOutButtonProps = {
  session?: Session;
};

export default function SignOutButton({ session }: SignOutButtonProps) {
  const { data, status } = useSession();
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
