// src/components/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { OfficeRecord } from "../types";
import "leaflet/dist/leaflet.css";

// Fix for missing marker icons in Leaflet
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  locations: OfficeRecord[];
}

const MapView: React.FC<Props> = ({ locations }) => {
  const center: LatLngExpression = [39.5, -98.35]; // Center of US

  console.log("🗺️ Rendering", locations.length, "pins");

  return (
    <MapContainer
      key={locations.length}
      center={center}
      zoom={4}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.coords!.lat, loc.coords!.lng]}>
          <Popup>
            <strong>{loc["OFFICE NAME"]}</strong>
            <br />
            {loc["ADDRESS LINE 1"]}
            {loc["ADDRESS LINE 3"] && <><br />{loc["ADDRESS LINE 3"]}</>}
            <br />
            {loc.CITY}, {loc.STATE} {loc["ZIP CODE"]}
            <br />
            📞 {loc.PHONE}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;