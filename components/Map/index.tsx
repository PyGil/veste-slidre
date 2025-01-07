import dynamic from "next/dynamic";
import SpinnerLoader from "../loader-spinner";
import MapWrapper from "./map-wrapper";

const Map = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <MapWrapper>
      <SpinnerLoader />
    </MapWrapper>
  ),
});

export default Map;
