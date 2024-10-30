import React from "react";
import SignOutButton from "./SignOutButton";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";

export default async function Navbar() {
  return (
    <div className="fixed w-full justify-between bg-white border-b flex items-center p-3  max-h-20  text-black">
      <div className="flex items-center gap-3">
        <div className="flex items-center pointer-events-none">
          <Image
            alt="AdminDash Logo"
            width={300}
            height={400}
            src={logo}
            className="max-h-14 max-w-14"
          />
          <span className="text-3xl font-bold tracking-tighter ">
            AdminDash
          </span>
        </div>

        <ul className="flex gap-2 items-center text-xl font-semibold">
          <span>|</span>
          <li>
            <Link href={"/"} className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              Dashboard
            </Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/transactions"} className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              Transactions
            </Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/reports"} className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              Reports
            </Link>
          </li>
        </ul>
      </div>
      <SignOutButton />
    </div>
  );
}
