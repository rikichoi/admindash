"use client";
import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { XIcon } from "lucide-react";

type ItemDialogProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
};

export default function ItemDialog({
  showModal,
  setShowModal,
  title,
  children,
}: ItemDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal == true) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showModal]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50"
    >
      <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
        <div className="flex items-center flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
          <h1 className="text-2xl">{title}</h1>
          <button
            onClick={() => (
              (document.body.style.overflow = "unset"), setShowModal(false)
            )}
            className="mb-2 p-2 cursor-pointer rounded border-none font-bold bg-red-600 text-white"
          >
            <XIcon size={18} />
          </button>
        </div>
        <div className="px-5 pb-6">{children}</div>
      </div>
    </dialog>
  );
}
