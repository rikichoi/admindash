"use client";
import React, { useMemo, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "@/app/styles/mapbox-styles.css";

export default function Mapbox() {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const popup = useMemo(() => {
    return new mapboxgl.Popup().setText("NexaGrid Main Office Address");
  }, []);

  return (
    <div className="h-full hidden lg:inline-block w-full items-center justify-center py-14 rounded-l-full overflow-auto object-contain bg-contain">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={{
          longitude: 144.9631,
          latitude: -37.8136,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          longitude={144.9631}
          latitude={-37.8136}
          anchor="center"
          popup={popup}
          ref={markerRef}
        >
          <MapPin size={40} fill={"#1ab394"} className="text-gray-800" />
        </Marker>
      </Map>
    </div>
  );
}
