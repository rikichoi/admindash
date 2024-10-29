"use client";
import { Loader2Icon } from "lucide-react";
import React from "react";

type FormSubmitButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormSubmitButton({
  isLoading,
  children,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`${
        props.className
      } ${" justify-center gap-1 p-2 border-2  text-white rounded-lg flex flex-row items-center "} ${
        isLoading ? " hover:cursor-not-allowed bg-slate-600 " : "  "
      }`}
    >
      {children}{" "}
      {isLoading && (
        <span>
          <Loader2Icon className="animate-spin" size={16} />
        </span>
      )}
    </button>
  );
}
