export default function getGeocodeApiUrl(location: string) {
  return `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}`;
}
