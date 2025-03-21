// src/components/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { OfficeRecord } from "../types";
import "leaflet/dist/leaflet.css";

// Custom blue marker icon (smaller size)
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [15, 24],
  iconAnchor: [7, 24],
  popupAnchor: [0, -24],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [24, 24],
  shadowAnchor: [7, 24],
});

interface Props {
  locations: OfficeRecord[];
}

const MapView: React.FC<Props> = ({ locations }) => {
  const center: LatLngExpression = [39.5, -98.35];

  console.log("🗺️ Rendering", locations.length, "pins");

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "60px",
          backgroundColor: "rgba(249, 249, 249, 0.85)",
          color: "black",
          padding: "12px 20px",
          display: "inline-block",
          zIndex: 1000,
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontSize: "50px", fontWeight: "bold" }}>Social Security Office Nationwide</div>
        <div style={{ fontSize: "36px", color: "#EE2722" }}>
          Brought to you by the AgeTech Collaborative from AARP
        </div>
      </div>

      <div style={{ position: "absolute", inset: 0 }}>
        <MapContainer
          key={locations.length}
          center={center}
          zoom={4}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {locations.map((loc, idx) => (
            <Marker key={idx} position={[loc.coords!.lat, loc.coords!.lng]} icon={customIcon}>
              <Popup>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "14px", textAlign: "center", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
                    {loc["OFFICE NAME"]}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      {loc["ADDRESS LINE 1"]}
                      {loc["ADDRESS LINE 3"] && <><br />{loc["ADDRESS LINE 3"]}</>}
                      <br />
                      {loc.CITY}, {loc.STATE} {loc["ZIP CODE"]}
                      <br />
                      📞 {loc.PHONE}
                    </div>
                    <div>
                      <strong>Hours:</strong>
                      <br />
                      Mon: {loc["MONDAY OPEN TIME"] || "Closed"} - {loc["MONDAY CLOSE TIME"] || "Closed"}
                      <br />
                      Tue: {loc["TUESDAY OPEN TIME"] || "Closed"} - {loc["TUESDAY CLOSE TIME"] || "Closed"}
                      <br />
                      Wed: {loc["WEDNESDAY OPEN TIME"] || "Closed"} - {loc["WEDNESDAY CLOSE TIME"] || "Closed"}
                      <br />
                      Thu: {loc["THURSDAY OPEN TIME"] || "Closed"} - {loc["THURSDAY CLOSE TIME"] || "Closed"}
                      <br />
                      Fri: {loc["FRIDAY OPEN TIME"] || "Closed"} - {loc["FRIDAY CLOSE TIME"] || "Closed"}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;