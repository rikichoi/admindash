"use client";
import React, { useState } from "react";
import { Organisation } from "../lib/types";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { abbreviateNumber } from "../lib/utils";

type OrganisationListItemProps = {
  organisation: Organisation;
};

export default function OrganisationListItem({
  organisation,
}: OrganisationListItemProps) {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <article className="group relative flex max-h-96 flex-col rounded-lg border p-6 text-black transition-all duration-300 ease-in-out after:transition-all after:duration-1000 hover:-translate-y-1 hover:border-[#00cca3] hover:bg-[#00cca31f] lg:hover:-translate-x-3 lg:hover:-translate-y-2">
      <div className="flex w-full flex-col gap-3 border-b object-contain p-3 lg:flex-row">
        <div className="flex flex-1 gap-3">
          <div className="">
            {organisation.imageUrls &&
              organisation.imageUrls
                .slice(0, 1)
                .map((img, index) => (
                  <Image
                    key={index}
                    alt="Organisation Image"
                    src={img}
                    height={400}
                    width={400}
                    onLoad={() => setImageLoading(false)}
                    className={`${imageLoading && "animate-pulse bg-slate-200"} max-h-16 max-w-16 rounded-lg object-cover`}
                  />
                ))}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="truncate text-ellipsis text-xl font-medium tracking-wide">
              {organisation.name}
            </h2>
            <p className="text-gray-600">{organisation.summary}</p>
          </div>
        </div>
        <div className="flex h-fit w-full max-w-32 flex-col rounded-xl bg-gray-100 p-3 group-hover:bg-white">
          <p className="text-xs uppercase tracking-widest text-gray-600">
            Total raised
          </p>
          <p className="truncate text-ellipsis text-center text-xl font-medium tracking-wide">
            ${abbreviateNumber(organisation.totalDonationsValue / 100) || 0}
            <span className="text-xs font-normal">/AUD</span>
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-3 object-contain p-3 lg:flex-row lg:gap-0">
        <div className="flex-1 text-sm text-gray-800">
          <p>{organisation.description}</p>
        </div>
        <Link
          href={`/donate/${organisation._id}`}
          className="group/donate relative mx-auto flex w-fit items-center gap-2 overflow-hidden rounded-lg bg-[#1ab394] px-6 py-3 text-lg text-white transition-all duration-300 ease-in-out hover:bg-[#00cca3]"
        >
          <span className="duration 300 flex items-center gap-2 transition-transform ease-in-out group-hover/donate:translate-x-2">
            Donate <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  );
}
