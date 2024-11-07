"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Organisation } from "../lib/types";
import OrganisationListItem from "./OrganisationListItem";

type GridCarouselProps = {
  organisations: Organisation[] | undefined;
};

export default function GridCarousel({ organisations }: GridCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {[0, 1].map((gridIndex) => (
            <div key={gridIndex} className="flex-[0_0_100%] min-w-0">
              <div className="grid grid-cols-2 gap-4 p-4">
                {organisations &&
                  organisations
                    .slice(gridIndex * 4, gridIndex * 4 + 4)
                    .map((organisation, index) => (
                      <OrganisationListItem
                        key={index}
                        organisation={organisation}
                      />
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${
          !prevBtnEnabled ? "bg-white" : "bg-gray-300"
        } absolute -left-12 top-1/2 transform rounded-lg -translate-y-1/2 border-2 p-3`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft
          size={30}
          className={!prevBtnEnabled ? "text-gray-200" : "animate-pulse text-black"}
        />
        <span className="sr-only">Previous items</span>
      </button>
      <button
        className={`${
          !nextBtnEnabled ? "bg-white" : "bg-gray-100"
        } absolute -right-12 top-1/2 transform rounded-lg -translate-y-1/2 border-2 p-3`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight
          size={30}
          className={!nextBtnEnabled ? "text-gray-200" : "animate-pulse text-black"}
        />
        <span className="sr-only">Next items</span>
      </button>
    </div>
  );
}
