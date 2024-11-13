import React from "react";
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
  return (
    <article className="flex group relative p-6 hover:border-[#00cca3] after:transition-all after:duration-1000 hover:bg-[#00cca31f] hover:-translate-y-1  lg:hover:-translate-y-2 lg:hover:-translate-x-3 duration-300 ease-in-out transition-all max-h-96 flex-col border rounded-lg text-black">
      <div className="flex flex-col lg:flex-row gap-3 object-contain border-b w-full p-3">
        <div className="flex gap-3 flex-1">
          <div className="">
            {organisation.imageUrls ? (
              organisation.imageUrls
                .slice(0, 1)
                .map((img, index) => (
                  <Image
                    key={index}
                    alt="Organisation Image"
                    src={img}
                    height={400}
                    width={400}
                    className="max-w-16 object-cover rounded-lg"
                  />
                ))
            ) : (
              <Image
                alt="Organisation Image"
                src={""}
                height={400}
                width={400}
                className="max-w-20"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-xl font-medium tracking-wide truncate text-ellipsis">
              {organisation.name}
            </h2>
            <p className=" text-gray-600">{organisation.summary}</p>
          </div>
        </div>
        <div className="flex flex-col max-w-32 w-full h-fit bg-gray-100 group-hover:bg-white p-3 rounded-xl">
          <p className="uppercase text-xs tracking-widest text-gray-600">
            Total raised
          </p>
          <p className="text-center text-xl tracking-wide font-medium truncate text-ellipsis">
            ${abbreviateNumber(organisation.totalDonationsValue / 100) || 0}
            <span className="text-xs font-normal">/AUD</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 object-contain w-full items-center p-3">
        <div className="flex-1 truncate text-ellipsis text-sm text-gray-800">
          <p>{organisation.description}</p>
        </div>
        <Link
          href={`/donate/${organisation._id}`}
          className="flex gap-2 relative overflow-hidden transition-all ease-in-out duration-300 items-center mx-auto w-fit py-3 px-6 text-lg  text-white rounded-lg bg-[#1ab394] hover:bg-[#00cca3]"
        >
          <span className="flex gap-2 items-center transition-transform duration 300 ease-in-out hover:translate-x-2">
            Donate <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  );
}
