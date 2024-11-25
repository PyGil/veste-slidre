"use client";

import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ZOOM_LEVEL = 16;

interface LatLng {
  lat: number;
  lng: number;
}

interface OwnProps {
  location: string;
}

interface MapUpdaterProps {
  position?: LatLng;
}

function MapUpdater({ position }: MapUpdaterProps) {
  const map = useMap();

  if (position) {
    map.setView(position, ZOOM_LEVEL);
  }

  return null;
}

const getPosition = async (location: string): Promise<LatLng | undefined> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length) {
      const { lat, lon } = data[0];

      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
  } catch {}
};

const DefaultIcon = L.icon({
  iconUrl: "/images/leaflet/marker-icon.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // Size of the shadow
});

export default function Map({ location }: OwnProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [position, setPosition] = useState<LatLng>();

  useEffect(() => {
    getPosition(location).then(setPosition);
  }, [location]);

  return (
    <MapContainer
      ref={mapRef}
      center={position}
      zoom={ZOOM_LEVEL}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <MapUpdater position={position} />
      {position && (
        <Marker position={position} icon={DefaultIcon}>
          <Popup>The location is: {location}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
