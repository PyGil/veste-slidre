declare module "leaflet-control-geocoder" {
  export namespace Geocoder {
    class Nominatim {
      geocode(
        query: string,
        callback: (results: { center: L.LatLng }[]) => void
      ): void;
    }
  }
}
