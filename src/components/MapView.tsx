import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

type MapViewProps = {
  showWms: boolean;
};

const MapControls: React.FC = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleResetView = () => {
    map.setView([51.5, 7], 13);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
      <button
        type="button"
        onClick={handleZoomIn}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-lg font-semibold shadow-md hover:bg-slate-800"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={handleZoomOut}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-lg font-semibold shadow-md hover:bg-slate-800"
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        type="button"
        onClick={handleResetView}
        className="mt-1 px-2 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-[10px] text-slate-200 shadow-md hover:bg-slate-800"
        aria-label="Reset view"
      >
        Reset
      </button>
    </div>
  );
};

export const MapView: React.FC<MapViewProps> = ({ showWms }) => {
  return (
    <div data-testid="map-container" className="w-full h-full relative">
      <MapContainer
        center={[51.5, 7]} // temporary center
        zoom={13}
        className="w-full h-full rounded-none"
      >
        {/* Dev base map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* WMS satellite layer, controlled by sidebar toggle */}
        {showWms && (
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

        {/* Custom map controls overlay */}
        <MapControls />
      </MapContainer>
    </div>
  );
};
