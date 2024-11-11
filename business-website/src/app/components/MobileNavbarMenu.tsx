"use client";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function MobileNavbarMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownMenuOptions = [
    { title: "What we do", link: "/" },
    { title: "Products", link: "/" },
    { title: "Resources", link: "/" },
    { title: "Pricing", link: "/" },
  ];
  
  return (
    <div className="lg:hidden items-center flex">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="lg:hidden"
      >
        {showDropdown ? <XIcon /> : <MenuIcon />}
      </button>
      {showDropdown && (
        <div className="flex flex-col gap-2 top-[4.05rem]  left-0   bg-white w-full absolute min-h-screen">
          {dropdownMenuOptions.map((option, index) => (
            <Link key={index} href={option.link}>
              {option.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
