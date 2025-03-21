// src/utils/geocode.ts

// Nominatim no longer needed. This file now acts as a stub or fallback.

import { OfficeRecord } from "../types";

export const geocodeAddress = async (
  record: OfficeRecord
): Promise<{ lat: number; lng: number } | null> => {
  // Not used anymore since lat/lng is in the CSV
  return null;
};
