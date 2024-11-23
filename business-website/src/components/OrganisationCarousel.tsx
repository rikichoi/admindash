"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Organisation } from "../lib/types";
import OrganisationListItem from "./OrganisationListItem";

type OrganisationCarouselProps = {
  organisations: Organisation[] | undefined;
};

export default function OrganisationCarousel({
  organisations,
}: OrganisationCarouselProps) {
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
    <div className="relative max-w-6xl w-full mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {organisations &&
            Array.from({ length: Math.ceil(organisations.length / 4) }).map(
              (_, gridIndex) => (
                <div key={gridIndex} className="flex-[0_0_100%] min-w-0">
                  <div className="grid lg:grid-cols-2 gap-8 p-4">
                    {organisations
                      .filter(
                        (organisation) => organisation.activeStatus == true
                      )
                      .slice(gridIndex * 4, gridIndex * 4 + 4)
                      .map((organisation, index) => (
                        <OrganisationListItem
                          key={index}
                          organisation={organisation}
                        />
                      ))}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <button
        className={`${
          !prevBtnEnabled ? "bg-white" : "bg-gray-100 hover:bg-gray-200"
        } absolute lg:-left-2 lg:top-1/2 left-1/3 transform rounded-lg lg:-translate-y-1/2 border-2 p-3`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft
          size={30}
          className={!prevBtnEnabled ? "text-gray-200" : " text-black"}
        />
        <span className="sr-only">Previous items</span>
      </button>
      <button
        className={`${
          !nextBtnEnabled ? "bg-white" : "bg-gray-100 hover:bg-gray-200"
        } absolute lg:-right-2 lg:top-1/2 right-1/3 transform rounded-lg lg:-translate-y-1/2 border-2 p-3`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight
          size={30}
          className={!nextBtnEnabled ? "text-gray-200" : " text-black"}
        />
        <span className="sr-only">Next items</span>
      </button>
    </div>
  );
}
