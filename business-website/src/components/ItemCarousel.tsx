"use client";

import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Item } from "@/lib/types";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { abbreviateNumber } from "@/lib/utils";
// import Image from "next/image";
// import { Button } from "@/components/ui/button"

interface ItemCarouselProps {
  items?: Item[];
  backgroundColor?: string;
}

export function ItemCarousel({ items, backgroundColor }: ItemCarouselProps) {
  const [imageLoading, setImageLoading] = useState(true);
  function calculateRemaining(
    donationGoal: number,
    totalDonationsValue: number,
  ) {
    const remaining = donationGoal - totalDonationsValue;
    if (remaining <= 0) {
      return 0;
    }
    return remaining / 100;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        active: items && items.length > 0,
      }}
      className="mx-auto w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
      // setApi={(api) => {
      //   if (api) {
      //     api.on("select", () => {
      //       setCurrentIndex(api.selectedScrollSnap())
      //     })
      //   }
      // }}
    >
      <CarouselContent className="border-none shadow-none">
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <CarouselItem
              key={index}
              className="gap-3 border-none shadow-none sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="relative mx-auto flex flex-col justify-center justify-items-center border-none px-0 shadow-none">
                <Card className="mx-auto h-full min-h-96 w-full border-none bg-transparent px-0 shadow-none">
                  <CardContent
                    className={`${backgroundColor ? backgroundColor : "bg-slate-50"} absolute bottom-0 left-0 right-0 top-32 z-10 mx-auto my-auto flex h-fit w-5/6 flex-col justify-center gap-3 rounded-lg border p-4 text-white`}
                  >
                    <p className="w-full text-sm font-semibold tracking-tighter text-[#49a27d]">
                      {item.orgId.name}
                    </p>
                    <span className="text-lg font-semibold tracking-tighter text-stone-950">
                      {item.name}
                    </span>
                    <div>
                      <ProgressBar
                        donationGoalValue={item.donationGoalValue}
                        totalDonationValue={item.totalDonationValue}
                      />
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Goal</p>
                        <p className="text-stone-950">
                          ${Math.floor(item.donationGoalValue / 100)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Collected
                        </p>
                        <p className="text-stone-950">
                          $
                          {abbreviateNumber(
                            Math.floor(item.totalDonationValue / 100),
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Remaining
                        </p>
                        <p className="text-stone-950">
                          $
                          {calculateRemaining(
                            item.donationGoalValue,
                            item.totalDonationValue,
                          )}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/donate/${item.orgId._id}?itemId=${item._id}`}
                      className="group relative mx-auto flex w-fit items-center gap-2 overflow-hidden rounded-lg bg-[#1ab394] px-6 py-2 text-lg text-white transition-all duration-300 ease-in-out hover:bg-[#00cca3]"
                    >
                      <span className="duration 300 flex items-center gap-2 transition-transform ease-in-out group-hover:translate-x-2">
                        Donate <ArrowRight />
                      </span>
                    </Link>
                  </CardContent>
                  <Image
                    width={400}
                    height={400}
                    src={item.imageUrl}
                    alt="Item Image"
                    onLoad={() => setImageLoading(false)}
                    className={`${imageLoading && "animate-pulse bg-slate-200"} absolute left-0 right-0 top-0 h-full max-h-36 w-full rounded-xl object-none`}
                  ></Image>
                </Card>
              </div>
            </CarouselItem>
          ))}
        {!items ||
          (items && items.length < 1 && (
            <div className="h-32 w-full text-center text-lg text-muted-foreground">
              Currently no Donation Campaigns
            </div>
          ))}
      </CarouselContent>
      {items && items.length > 0 && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      )}
    </Carousel>
  );
}
