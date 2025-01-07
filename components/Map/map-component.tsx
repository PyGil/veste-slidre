"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import LoaderSpinner from "../loader-spinner";
import InfoError from "../info-error";
import getGeocodeApiUrl from "@/lib/utils/get-geocode-api-url";

import "leaflet/dist/leaflet.css";
import MapWrapper from "./map-wrapper";

interface OwnProps {
  location: string;
}

const ZOOM = 16;
const NOT_FOUND_ERROR = "Adressen vart ikkje funnen";
const GEOCODING_ERROR = "Feil ved geokoding av stad";

// Fixes default marker icon issue in Next.js
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map({ location }: OwnProps) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function geocodeAddress() {
      try {
        const response = await fetch(getGeocodeApiUrl(location));
        const data = await response.json();

        if (data && data.length) {
          const [{ lat, lon }] = data;
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        } else {
          setError(NOT_FOUND_ERROR);
        }
      } catch {
        setError(GEOCODING_ERROR);
      }
    }

    if (location) {
      geocodeAddress();
    }
  }, [location]);

  if (error) {
    return (
      <MapWrapper>
        <InfoError message={error} />
      </MapWrapper>
    );
  }

  if (!coordinates) {
    return (
      <MapWrapper>
        <LoaderSpinner />
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <MapContainer
        center={coordinates}
        zoom={ZOOM}
        scrollWheelZoom={false}
        className="h-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </MapWrapper>
  );
}
