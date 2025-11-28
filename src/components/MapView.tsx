import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapViewProps = {
  showWms: boolean;
};

export const MapView: React.FC<MapViewProps> = ({ showWms }) => {
  return (
    <div data-testid="map-container" className="w-full h-full">
      <MapContainer
        center={[50.9375, 6.9603]} // Cologne
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base OSM layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* WMS satellite layer */}
        {showWms && (
          // @ts-ignore allow WMS params
          <TileLayer
            url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
            attribution="&copy; Geobasis NRW"
            params={{
              service: "WMS",
              request: "GetMap",
              version: "1.3.0",
              layers: "nw_dop_rgb",
              styles: "",
              format: "image/png",
              transparent: false,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};
