import type { Feature, MapLayerMouseEvent } from "maplibre-gl";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    Map,
    Source,
    Layer,
    ScaleControl,
    Popup,
    MapInstance,
    MapEvent,
    FullscreenControl,
} from "react-map-gl/maplibre";
import { MapProvider } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

const App = () => {
    const mapRef = useRef();
    const popupRef = useRef();

    const mapMouseMoveHandler = (evt: MapLayerMouseEvent): void => {
        const map: MapInstance = mapRef.current;
        const popup = popupRef.current;
        const features: Feature[] = map.queryRenderedFeatures(evt.point);
        console.log(features);

        let info = "";
        features.forEach((val, i) => {
            info += `ID_ind: ${val.properties["ID_ind"]}
             Goriz: ${val.properties["goriz"]}
              index: ${val.properties["index"]}
               otd: ${val.properties["otd"]}`;
        });
        evt.originalEvent.stopPropagation();

        popup.setLngLat(evt.lngLat);
        popup.setHTML(info);
    };

    const layers = Array.from({ length: 52 }, (_, i) => i + 1);

    const chooseColor = (layerID) => {
        switch (layerID) {
            case 1:
                return "rgb(162, 158, 171)";
                break;
            case 2:
                return "rgb(255, 240, 110, 1)";
                break;
            case 3:
                return "rgb(174, 146, 38, 1)";
                break;
            case 4:
                return "rgba(115, 205, 255, 1)";
                break;
            case 5:
                return "rgba(195, 250, 200, 1)";
                break;
            case 6:
                return "rgba(177, 238, 182, 1)";
                break;
            case 7:
                return "rgba(250, 232, 105, 1)";
                break;
            case 8:
                return "rgba(170, 230, 178, 1)";
                break;
            case 9:
                return "rgba(255, 222, 170, 1)";
                break;

            case 12:
                return "rgba(165, 225, 175, 1)";
                break;
            case 13:
                return "rgba(165, 125, 175, 1)";
                break;
            case 14:
                return "rgba(117, 216, 169, 1)";
                break;
            case 17:
                return "rgba(145, 215, 160, 1)";
                break;
            case 18:
                return "rgba(215, 172, 134, 1)";
                break;
            case 19:
                return "rgba(215, 85, 134, 1)";
                break;
            case 20:
                return "rgba(173, 171, 105, 1)";
                break;
            case 21:
                return "rgba(173, 171, 105, 1)";
                break;
            case 22:
                return "rgba(173, 171, 105, 1)";
                break;
            case 23:
                return "rgba(158, 240, 230, 1)";
                break;
            case 24:
                return "rgba(210, 162, 130, 1)";
                break;
            case 25:
                return "rgba(210, 162, 130, 1)";
                break;
            case 26:
                return "rgba(165, 165, 95, 1)";
                break;
            case 27:
                return "rgba(165, 165, 95, 1)";
                break;
            case 28:
                return "rgba(165, 165, 95, 1)";
                break;
            case 29:
                return "rgba(142, 238, 223, 1)";
                break;
            case 30:
                return "rgba(158, 143, 97, 1)";
                break;
            case 31:
                return "rgba(105, 190, 250, 1)";
                break;
            case 32:
                return "rgba(200, 223, 189, 1)";
                break;
            case 33:
                return "rgba(230, 205, 140, 1)";
                break;
            case 34:
                return "rgba(195, 136, 108, 1)";
                break;
            case 35:
                return "rgba(195, 136, 108, 1)";
                break;
            case 36:
                return "rgba(140, 148, 77, 1)";
                break;
            case 37:
                return "rgba(140, 148, 77, 1)";
                break;
            case 38:
                return "rgba(140, 148, 77, 1)";
                break;
            case 39:
                return "rgba(135, 224, 214, 1)";
                break;
            case 40:
                return "rgba(180, 210, 155, 1)";
                break;
            case 41:
                return "rgba(179, 110, 85, 1)";
                break;
            case 42:
                return "rgba(179, 110, 85, 1)";
                break;
            case 43:
                return "rgba(124, 139, 74, 1)";
                break;
            case 44:
                return "rgba(124, 139, 74, 1)";
                break;
            case 47:
                return "rgba(95, 180, 245, 1)";
                break;
            case 48:
                return "rgba(156, 197, 135, 1)";
                break;
            case 49:
                return "rgba(164, 84, 62, 1)";
                break;
            case 50:
                return "rgba(112, 120, 69, 1)";
                break;
            case 51:
                return "rgba(85, 160, 239, 1)";
                break;
            case 52:
                return "rgba(112, 48, 160, 1)";
                break;
            default:
                return "rgb(0, 0, 0)";
        }
    };

    const multipLayers = React.useMemo(
        () =>
            layers.map((val, i) => {
                return (
                    <Layer
                        id={`quaterniary_deposits_layer_${val}`}
                        key={i}
                        type="fill"
                        source="quaterniary_deposits"
                        source-layer="grunt_3857"
                        filter={["==", "ID_ind", `${val}`]}
                        paint={{
                            "fill-color": chooseColor(val),
                            /* "fill-opacity": 0.9, */
                            "fill-outline-color": "green",
                        }}
                    />
                );
            }),
        []
    );

    return (
        <div className="app">
            <MapProvider>
                <Map
                    id="map"
                    ref={mapRef}
                    onClick={(e) => mapMouseMoveHandler(e)}
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
                        glyphs: "https://tiles.versatiles.org/assets/fonts/{fontstack}/{range}.pbf",
                        sources: {
                            osmRaster: {
                                type: "raster",
                                tiles: [
                                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                                ],
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
                        tiles={[
                            `${window.location.origin}/static/{z}/{x}/{y}.pbf`,
                        ]}
                        scheme="xyz"
                        maxzoom={13}
                        minzoom={8}
                    >
                        {multipLayers}
                    </Source>

                    <Popup
                        ref={popupRef}
                        anchor="bottom"
                        longitude={27.865442319094427}
                        latitude={53.87226539312766}
                        closeOnClick={false}
                    >
                        Test
                    </Popup>

                    <FullscreenControl />
                    <ScaleControl />
                </Map>
            </MapProvider>
        </div>
    );
};

export default App;
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
