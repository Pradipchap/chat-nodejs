import { MapContainer, TileLayer } from "react-leaflet";
import useGeoLocation from "../../customHooks/useCurrentPostion";
import { useEffect, useRef, useState } from "react";
import Hello from "./Hello";

export default function Map() {
  const [position, setPostion] = useState(null);
  const { location } = useGeoLocation(setPostion);

  return (
    position && (
      <MapContainer
        className="h-screen w-full"
        center={[position.latitude, position.longitude]}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Hello />
      </MapContainer>
    )
  );
}
