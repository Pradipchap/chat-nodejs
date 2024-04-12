import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ waypoints }) => {
  const instance = L.Routing.control({
    waypoints: waypoints.map(({ latitude, longitude }, index) => {
      return L.latLng(latitude, longitude);
    }),
    lineOptions: {
      styles: [{ color: "blue", opacity: 1, weight: 5 }],
    },
    draggableWaypoints: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
