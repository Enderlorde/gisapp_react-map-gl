import * as React from "react";
import { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Map, Source, Layer, ScaleControl, Popup } from "react-map-gl/maplibre";
import { MapProvider } from "react-map-gl/maplibre";

const App = () => {
  return (
    <div className="app">
      <MapProvider>
        <Map
          initialViewState={{
            longitude: 27.865442319094427,
            latitude: 53.87226539312766,
            zoom: 5,
            bounds: [
              { lng: 23.115, lat: 51.248 },
              { lng: 32.783, lat: 56.231 },
            ],
            fitBoundsOptions: {
              padding: 20,
              minZoom: 5,
            },
          }}
          style={{ width: 600, height: 400 }}
          mapStyle={{
            version: 8,
            name: "osm_map",
            layers: [
              {
                id: "baselayer",
                type: "raster",
                source: "osmRaster",
              },
            ],
            glyphs:
              "https://tiles.versatiles.org/assets/fonts/{fontstack}/{range}.pbf",
            sources: {
              osmRaster: {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              },
            },
          }}
          maxBounds={[23.027, 51.161, 32.981, 56.292]}
        >
          <Source
            id="quaternary_deposits"
            type="vector"
            tiles={["http://localhost:5173/static/{z}/{x}/{y}.pbf"]}
            scheme="xyz"
          >
            <Layer
              id="quaterniary_deposits_layer"
              type="fill"
              source="quaterniary_deposits"
              source-layer="grunt_3857"
              paint={{
                "fill-color": "green",
                "fill-opacity": 0.3,
                "fill-outline-color": "green",
              }}
            ></Layer>
          </Source>
          <ScaleControl />
        </Map>
      </MapProvider>
    </div>
  );
};

export default App;
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
