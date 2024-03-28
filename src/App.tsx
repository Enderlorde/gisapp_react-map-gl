import * as React from "react";
import ReactDOM from "react-dom/client";
/// <reference types="react-map-gl" />
import { Map } from "react-map-gl/maplibre";

const App = () => {
    return (
        <div className="app">
            <Map
                initialViewState={{
                    longitude: 27.865442319094427,
                    latitude: 53.87226539312766,
                    zoom: 5,
                    bounds: [
                        { lng: 32.783, lat: 56.231 },
                        { lng: 23.115, lat: 51.248 },
                    ],
                    fitBoundsOptions: {
                        minZoom: 5,
                        padding: 20,
                    },
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="https://tiles.versatiles.org/styles/colorful.json"
            />
        </div>
    );
};

export default App;
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
