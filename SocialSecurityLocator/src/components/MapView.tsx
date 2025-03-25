// src/components/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { OfficeRecord } from "../types";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";




// Marker icons
const greenIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [18, 30],
  iconAnchor: [9, 30],
  popupAnchor: [1, -30],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [30, 30],
  shadowAnchor: [9, 30],
});

const yellowIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  iconSize: [18, 30],
  iconAnchor: [9, 30],
  popupAnchor: [1, -30],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [30, 30],
  shadowAnchor: [9, 30],
});

const redIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [18, 30],
  iconAnchor: [9, 30],
  popupAnchor: [1, -30],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [30, 30],
  shadowAnchor: [9, 30],
});

interface Props {
  locations: OfficeRecord[];
}


const MapView: React.FC<Props> = ({ locations }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
          .leaflet-control-attribution {
            display: none !important;
          }
        `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const center: LatLngExpression = [39.5, -98.35];

  console.log("🗺️ Rendering", locations.length, "pins");

  const getIcon = (record: OfficeRecord) => {
    if (record["CLOSED"]?.toUpperCase() === "TRUE") return redIcon;
    if (record["CLOSING"]?.toUpperCase() === "TRUE") return yellowIcon;
    return greenIcon;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {(locations.some((loc) => loc["CLOSED"]?.toUpperCase() === "TRUE") ||
        locations.some((loc) => loc["CLOSING"]?.toUpperCase() === "TRUE")) && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "80px",
            backgroundColor: "rgba(249, 249, 249, 0.6)",
            color: "black",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          <strong>Legend:</strong>
          <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0" }}>
            <li>
              <span
                style={{
                  color: "#2ECC40",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                ●
              </span>{" "}
              Open
            </li>
            {locations.some(
              (loc) => loc["CLOSING"]?.toUpperCase() === "TRUE"
            ) && (
              <li>
                <span
                  style={{
                    color: "#FFD700",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  ●
                </span>{" "}
                Scheduled for Closure
              </li>
            )}
            {locations.some(
              (loc) => loc["CLOSED"]?.toUpperCase() === "TRUE"
            ) && (
              <li>
                <span
                  style={{
                    color: "#EE2722",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  ●
                </span>{" "}
                Closed
              </li>
            )}
          </ul>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "80px",
          backgroundColor: "rgba(249, 249, 249, 0.6)",
          borderRadius: "8px",
          color: "black",
          padding: "12px 20px",
          display: "inline-block",
          zIndex: 1000,
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>
          U.S. Social Security Offices
        </div>
        <div style={{ fontSize: "16px", color: "#EE2722" }}>
          Created by the AgeTech Collaborative&trade; from AARP
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
            <Marker
              key={idx}
              position={[loc.coords!.lat, loc.coords!.lng]}
              icon={getIcon(loc)}
            >
              <Popup>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      textAlign: "center",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "4px",
                    }}
                  >
                    {loc["OFFICE NAME"]}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {loc["ADDRESS LINE 1"]}
                      {loc["ADDRESS LINE 3"] && (
                        <>
                          <br />
                          {loc["ADDRESS LINE 3"]}
                        </>
                      )}
                      <br />
                      {loc.CITY}, {loc.STATE} {loc["ZIP CODE"]}
                      <br />
                      📞 {loc.PHONE}
                    </div>
                    <div>
                      <strong>Hours:</strong>
                      <div
                        style={{
                          fontFamily: "monospace",
                          whiteSpace: "pre",
                          fontSize: "13px",
                          marginTop: "4px",
                        }}
                      >
                        Mon: {loc["MONDAY OPEN TIME"] || "Closed"} -{" "}
                        {loc["MONDAY CLOSE TIME"] || "Closed"}
                        {"\n"}
                        Tue: {loc["TUESDAY OPEN TIME"] || "Closed"} -{" "}
                        {loc["TUESDAY CLOSE TIME"] || "Closed"}
                        {"\n"}
                        Wed: {loc["WEDNESDAY OPEN TIME"] || "Closed"} -{" "}
                        {loc["WEDNESDAY CLOSE TIME"] || "Closed"}
                        {"\n"}
                        Thu: {loc["THURSDAY OPEN TIME"] || "Closed"} -{" "}
                        {loc["THURSDAY CLOSE TIME"] || "Closed"}
                        {"\n"}
                        Fri: {loc["FRIDAY OPEN TIME"] || "Closed"} -{" "}
                        {loc["FRIDAY CLOSE TIME"] || "Closed"}
                      </div>
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
