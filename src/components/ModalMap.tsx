import { ReactNode, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import iconUrl from "../img/marker-icon.png";

function RecenterMap({ position, coords }: { position: [number, number]; coords: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [position, coords]);

    return null;
}

const ModalMap = ({ children }: { children: ReactNode }) => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { coords, weather, timezone } = context; // Pull out from context

    const [position, setPosition] = useState<[number, number]>([coords[0], coords[1]]);
    const [markerPosition, setMarkerPosition] = useState<[number, number]>(coords);

    const myCoords: [number, number] = timezone ? [timezone.coords.lat, timezone.coords.lng] : [0, 0];

    useEffect(() => {
        setPosition([coords[0], coords[1]]);
        setMarkerPosition(myCoords);
    }, [coords, weather, timezone]);

    return (
        <div>
            <div
                className="fixed top-0 left-0 z-50 bg-black/80 w-full h-full flex items-center justify-center px-5"
                style={{ zIndex: 1000 }}
            >
                <div
                    className="relative w-[1000px] h-[650px] flex items-center justify-center bg-black px-[10px] py-[70px] text-center border border-gray-500"
                    style={{ zIndex: 1000 }}
                >
                    <MapContainer center={position} zoom={5} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
                        {/* <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        /> */}
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                        />
                        <Marker position={markerPosition} icon={L.icon({ iconUrl, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                            <Popup>Your location</Popup>
                        </Marker>
                        <RecenterMap position={position} coords={myCoords} />
                    </MapContainer>
                    {/* CHILDREN ARE THE CLOSE BTN */}
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ModalMap;
