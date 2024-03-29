import * as React from "react";
import { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
/// <reference types="react-map-gl" />
import { Map, Source, Layer, ScaleControl, Popup } from "react-map-gl/maplibre";
import { MapProvider } from "react-map-gl/maplibre";
import type { FillLayer, LayerProps, LngLatLike } from "react-map-gl";
import regions from "./static/data/regions.json";
import grid100 from "./static/data/100.json";
import grid200 from "./static/data/200.json";
import wells from "./static/data/data.json";
import {
    clusterLayer,
    clusterCountLayer,
    unclusteredPointLayer,
    unclusteredLabelLayer,
} from "./layers.js";

const App = () => {
    const [showPopup, setShowPopup] = useState<boolean>(true);
    const [popupCoor, setPopupCoor] = useState<LngLatLike>({ lon: 0, lat: 0 });

    React.useEffect(() => {
        const featuresTransform = wells["features"].map((feature, index) => {
            let coor_transform = convertCoordinates(
                feature.geometry.coordinates
            );
            feature.geometry.coordinates = coor_transform;
            return feature;
        });
        wells["features"] = featuresTransform;
    });

    React.useEffect(() => {
        const featuresTransform = grid200.features.map((feature, index) => {
            let coor_transform = feature.geometry.coordinates[0][0].map(
                (coors) => {
                    return convertCoordinates(coors);
                }
            );
            feature.geometry.coordinates[0][0] = coor_transform;
            return feature;
        });
    });

    React.useEffect(() => {
        const featuresTransform = grid100.features.map((feature, index) => {
            let coor_transform = feature.geometry.coordinates[0][0].map(
                (coors) => {
                    return convertCoordinates(coors);
                }
            );
            feature.geometry.coordinates[0][0] = coor_transform;
            return feature;
        });
    });
    const convertCoordinates = (coor) => {
        let [lon3857, lat3857] = coor;
        const e = 2.7182818284;
        const X = 20037508.34;
        //converting the logitute from epsg 3857 to 4326
        const lon4326 = (lon3857 * 180) / X;

        //converting the latitude from epsg 3857 to 4326 split in multiple lines for readability

        let lat4326 = lat3857 / (X / 180);
        const exponent = (Math.PI / 180) * lat4326;

        lat4326 = Math.atan(e ** exponent);
        lat4326 = lat4326 / (Math.PI / 360);
        lat4326 = lat4326 - 90;
        return [lon4326, lat4326];
    };

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
                    maxBounds={[
                        { lng: 23.115, lat: 51.248 },
                        { lng: 32.783, lat: 56.231 },
                    ]}
                    style={{ width: 600, height: 400 }}
                    mapStyle="https://tiles.versatiles.org/styles/colorful.json"
                >
                    <ScaleControl />
                    <Source id="regions" type="geojson" data={regions}>
                        <Layer
                            id="regions_"
                            type="fill"
                            source="geoBoundaries"
                            paint={{
                                "fill-outline-color": "red",
                                "fill-color": "transparent",
                            }}
                        />
                    </Source>
                    <Source id="grid100" type="geojson" data={grid100}>
                        <Layer
                            id="grid100"
                            type="line"
                            source="ntc"
                            paint={{
                                "line-color": "red",
                            }}
                            layout={{}}
                            minzoom={7}
                        />
                        <Layer
                            id="grid100_labels"
                            type="symbol"
                            source="wells"
                            layout={{
                                "text-field": ["get", "nomenkl"],
                                "text-font": ["Noto Sans Regular"],
                                "text-size": 12,
                            }}
                            minzoom={7}
                        />
                    </Source>
                    <Source id="grid200" type="geojson" data={grid200}>
                        <Layer
                            id="grid200_"
                            type="line"
                            source="ntc"
                            paint={{
                                "line-color": "red",
                            }}
                            maxzoom={7}
                        />
                        <Layer
                            id="grid200_labels"
                            type="symbol"
                            source="wells"
                            layout={{
                                "text-field": ["get", "Nomenkl"],
                                "text-font": ["Noto Sans Regular"],
                                "text-size": 12,
                            }}
                            maxzoom={7}
                        />
                    </Source>
                    <Source id="wells" type="geojson" data={wells}>
                        <Layer
                            id="wells"
                            type="circle"
                            source="wells"
                            paint={{ "circle-color": "red" }}
                            minzoom={8}
                        />
                        <Layer
                            id="wells_labels"
                            type="symbol"
                            source="wells"
                            layout={{
                                "text-field": ["get", "num_skv"],
                                "text-font": ["Noto Sans Regular"],
                                "text-size": 12,
                                "text-offset": [1, 1],
                            }}
                            minzoom={8}
                        />
                    </Source>
                    {showPopup && (
                        <Popup
                            longitude={Number(popupCoor.lon)}
                            latitude={Number(popupCoor.lat)}
                            anchor="bottom"
                            onClose={() => setShowPopup(false)}
                        >
                            You are here
                        </Popup>
                    )}
                </Map>
            </MapProvider>
        </div>
    );
};

export default App;
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
