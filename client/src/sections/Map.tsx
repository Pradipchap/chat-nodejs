import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "../components/RoutingMachine";
import useGeoLocation from "../../customHooks/useCurrentPostion";
import { useEffect, useState } from "react";

export default function Map() {
  const [position, setPostion] = useState(null);
  const { location } = useGeoLocation(setPostion);
  console.log("position",position);

  const waypoints = [
    position,
    {
      latitude: 51.467,
      longitude: -0.458,
    },
  ];

  return position&&(
    <MapContainer
      className="h-96 w-full"
      center={[position.latitude, position.longitude]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { waypoints? <RoutingMachine waypoints={waypoints} /> : ""}
    </MapContainer>
  );
}
