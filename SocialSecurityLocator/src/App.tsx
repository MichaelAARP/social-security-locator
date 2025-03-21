// src/App.tsx
import { useEffect, useState } from "react";
import Papa from "papaparse";
import MapView from "./components/MapView";
import { OfficeRecord } from "./types";

function App() {
  const [locations, setLocations] = useState<OfficeRecord[]>([]);

  useEffect(() => {
    const loadCSV = async () => {
      const response = await fetch("/SocialSecurityLocation.csv");
      const csvText = await response.text();

      const parsed: OfficeRecord[] = [];
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        step: (results: Papa.ParseStepResult<OfficeRecord>) => {
          const record = results.data;

          if (record.Latitude && record.Longitude) {
            const lat = parseFloat(record.Latitude);
            const lng = parseFloat(record.Longitude);

            if (!isNaN(lat) && !isNaN(lng)) {
              parsed.push({ ...record, coords: { lat, lng } });
              setLocations([...parsed]);
            }
          }
        },
        complete: () => {
          console.log("✅ Parsing complete");
        },
      });
    };

    loadCSV();
  }, []);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <MapView locations={locations} />
    </div>
  );
}

export default App;
