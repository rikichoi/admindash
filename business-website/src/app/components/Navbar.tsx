import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="z-50 font-rubik fixed text-black w-full items-center flex max-h-24 border-b bg-white">
      <div className="flex justify-between w-full mx-auto max-w-6xl p-4">
        <Link className="flex gap-2 items-center" href={"/"}>
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
            href={"/"}
          >
            What we do
          </Link>
          <div className="group relative">
            <button className="p-2 px-6 rounded-lg text-gray-800 font-semibold transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313] group inline-flex items-center">
              <span className="mr-1">Products</span>
              <svg
                className="fill-current h-4 w-4 group-hover:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>

            {/* menu list */}
            <ul className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56">
              <li className="bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer">
                Profile
              </li>
              <li className="bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer">
                Settings
              </li>
              <li className="bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
          <Link
            className="p-2 px-6 rounded-lg text-gray-800 font-semibold transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]"
            href={"/"}
          >
            Resources
          </Link>
          <Link
            className="p-2 line-through px-6 hover:cursor-not-allowed rounded-lg  font-semibold transition-all text-red-900 duration-300 bg-[#cc290013]"
            href={"/"}
          >
            Pricing
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <button className="px-2 py-1.5 h-fit rounded-lg text-sm text-gray-800 border-2 transition-all duration-300 hover:bg-[#00cca313]">
            Sign Up
          </button>
          <button className="p-2 px-4 rounded-lg text-sm text-gray-800  transition-all duration-300 hover:text-[#00cca3bb] hover:bg-[#00cca313]">
            Log In
          </button>
          <Link
            href={"/donate"}
            className="p-2 px-4 text-white rounded-lg text-sm  font-semibold transition-all bg-[#1ab394] shadow-md shadow-[#1ab394] duration-300 hover:bg-[#00cca3]"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
