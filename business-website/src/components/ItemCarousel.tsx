"use client";

import * as React from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Image from "next/image";
// import { Button } from "@/components/ui/button"

interface ItemCarouselProps {
  items: string[];
}

export function ItemCarousel({ items }: ItemCarouselProps) {
  // const [currentIndex, setCurrentIndex] = React.useState(0)
  // const totalItems = items.length

  // const handlePrevious = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalItems - 1))
  // }

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex < totalItems - 1 ? prevIndex + 1 : 0))
  // }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
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
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="gap-3 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
          >
            <div className="relative mx-auto flex flex-col justify-center justify-items-center px-0">
              <Card className="mx-auto h-full min-h-64 w-full border-2 px-0">
                <CardContent className="absolute bottom-0 left-0 right-0 top-32 z-10 mx-auto my-auto flex aspect-square w-4/5 flex-col items-center justify-center bg-green-400 text-white">
                  <p className="w-full">Organisation name</p>
                  <span className="font-semibold">{item} name</span>
                  <div>
                    <span>Total donation value progress bar</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <p>Goal</p>
                    <p>Collected</p>
                    <p>Remaining</p>
                  </div>
                </CardContent>
                <div className="absolute left-0 right-0 top-0 h-full max-h-36 w-full bg-black">
                  <div className=""></div>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-center space-x-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
