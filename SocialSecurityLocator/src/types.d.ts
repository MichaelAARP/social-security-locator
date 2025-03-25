// src/types.d.ts

export interface OfficeRecord {
    "OFFICE CODE": string;
    "OFFICE NAME": string;
    "ADDRESS LINE 1": string;
    "ADDRESS LINE 2"?: string;
    "ADDRESS LINE 3"?: string;
    CITY: string;
    STATE: string;
    "ZIP CODE": string;
    PHONE: string;
    FAX: string;
    "MONDAY OPEN TIME"?: string;
    "MONDAY CLOSE TIME"?: string;
    "TUESDAY OPEN TIME"?: string;
    "TUESDAY CLOSE TIME"?: string;
    "WEDNESDAY OPEN TIME"?: string;
    "WEDNESDAY CLOSE TIME"?: string;
    "THURSDAY OPEN TIME"?: string;
    "THURSDAY CLOSE TIME"?: string;
    "FRIDAY OPEN TIME"?: string;
    "FRIDAY CLOSE TIME"?: string;
    Latitude: string;
    Longitude: string;
    CLOSED?: string;
    CLOSING?: string;
    coords?: {
      lat: number;
      lng: number;
    };
  }