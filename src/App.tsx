import "./index.css"; // Tailwind
import TopLeft from "./components/TopLeft";
import Weather from "./components/Weather";
import BottomRight from "./components/BottomRight";
import UpdatedAt from "./components/UpdatedAt";
import SavedLocations from "./components/SavedLocations";
import { useEffect, useContext } from "react";
import MyContext from "./context/MyContext";
import fetchWeather from "./utils/fetchWeather";
import fetchTimezone from "./utils/fetchTimezone";
import giveShortDescription from "./utils/getShortDescription";
import Backdrop from "./components/Backdrop";
import "leaflet/dist/leaflet.css";
import spinnerGif from "./img/spin2.png";

function App() {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const {
        coords,
        weather,
        setWeather,
        savedLocations,
        timezone,
        setTimezone,
        localStoragePrimaryLocationKey,
        isLoading,
        setIsLoading,
    } = context; // Pull out from context

    useEffect(() => {
        // Fetch weather and timezone
        const fetchIt = () => {
            fetchWeather(coords, setWeather, setIsLoading);
            fetchTimezone(coords, setTimezone, setIsLoading);
            const primaryFromLS = localStorage.getItem(localStoragePrimaryLocationKey);
            if (!primaryFromLS) localStorage.setItem(localStoragePrimaryLocationKey, JSON.stringify(coords));
        };
        fetchIt();

        // Fetch it every hour
        const timer = setInterval(() => fetchIt(), 1000 * 60 * 60);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Change document title
        if (weather) {
            document.title = `${
                timezone && timezone.city
                    ? timezone.city
                    : timezone?.timezone.name.split("/").slice(-1).join("").replaceAll("_", " ") + "*"
            } ${timezone?.flag} | ${Math.round(weather.temp)}°C, ${giveShortDescription(weather.weathercode)}`;
        }
    }, [weather, timezone]);

    return (
        <>
            <Backdrop />
            <TopLeft />
            {weather && <Weather />}
            <UpdatedAt />
            <BottomRight />
            {savedLocations && savedLocations.length > 0 && <SavedLocations />}

            {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={spinnerGif} className="w-[580px] opacity-70" style={{ animation: "spin 1s linear infinite" }} />
                </div>
            )}
        </>
    );
}

export default App;
