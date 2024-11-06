import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="z-50 font-rubik fixed text-black w-full items-center flex max-h-24 border-b bg-white">
      <div className="flex justify-between w-full mx-auto max-w-7xl p-4">
        <Link className="flex gap-2 items-center" href={"#"}>
          <Image
            alt="NexaGrid Logo"
            className="max-w-8"
            width={300}
            height={300}
            src={logo}
          />
          <span className="uppercase font-bold tracking-wider text-2xl">
            NexaGrid
          </span>
        </Link>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Link
            className="p-2 px-6 rounded-lg text-gray-800 font-semibold transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]"
            href={"#"}
          >
            About
          </Link>
          <Link
            className="p-2 px-6 rounded-lg text-gray-800 font-semibold transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]"
            href={"#"}
          >
            Products
          </Link>
          <Link
            className="p-2 px-6 rounded-lg text-gray-800 font-semibold transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]"
            href={"#"}
          >
            Resources
          </Link>
          <Link
            className="p-2 px-6 rounded-lg text-gray-800 font-semibold transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]"
            href={"#"}
          >
            Pricing
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <button className="px-2 py-1.5 h-fit rounded-lg text-sm text-gray-800 border-2 transition-all duration-300 hover:bg-[#00cca313]">
            Talk To Sales
          </button>
          <button className="p-2 px-4 rounded-lg text-sm text-gray-800  transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]">
            Log In
          </button>
          <button className="p-2 px-4 text-white rounded-lg text-sm  font-semibold transition-all bg-[#1ab394] shadow-md shadow-[#1ab394] duration-300 hover:bg-[#00cca3]">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
