// src/components/MapMarker.tsx
import React from "react";
import { LOCATION_COORDS } from "@/constants/mapLocations";

interface MapMarkerProps {
  location: string;
  color?: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ location, color = "red" }) => {
  const coords = LOCATION_COORDS[location];

  if (!coords) return null;

  return (
    <div
      className={`absolute w-4 h-4 rounded-full z-10`}
      style={{
        backgroundColor: color,
        top: coords.top,
        left: coords.left,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default MapMarker;