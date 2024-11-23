"use client";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MobileNavbarMenu() {
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && showDropdown) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showDropdown]);

  const dropdownMenuOptions = [
    { title: "What we do", link: "/" },
    { title: "Products", link: "/" },
    { title: "Resources", link: "/" },
    { title: "Pricing", link: "/" },
  ];

  return (
    <div className="lg:hidden ml-3 order-last items-center flex">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="lg:hidden"
      >
        {showDropdown ? <XIcon /> : <MenuIcon />}
      </button>
      {showDropdown && (
        <div className="flex flex-col gap-2 top-[4.3rem] p-5 left-0   bg-white w-full absolute min-h-screen">
          {dropdownMenuOptions.map((option, index) => (
            <Link
              className="rounded-lg hover:bg-gray-100 p-5"
              key={index}
              href={option.link}
            >
              {option.title}
            </Link>
          ))}
          <button className="p-2 px-4 text-white rounded-lg text-sm  font-semibold transition-all bg-[#1ab394] shadow-md shadow-[#1ab394] duration-300 hover:bg-[#00cca3]">
            Sign Up
          </button>
          <button className="flex px-2 py-1.5 h-fit rounded-lg justify-center text-gray-800 border-2 transition-all duration-300 hover:bg-[#00cca313]">
            Log In
          </button>
        </div>
      )}
    </div>
  );
}
