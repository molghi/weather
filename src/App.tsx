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

function App() {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { coords, weather, setWeather, savedLocations, setTimezone, localStoragePrimaryLocationKey } = context;

    useEffect(() => {
        fetchWeather(coords, setWeather);
        fetchTimezone(coords, setTimezone);
        const primaryFromLS = localStorage.getItem(localStoragePrimaryLocationKey);
        if (!primaryFromLS) localStorage.setItem(localStoragePrimaryLocationKey, JSON.stringify(coords));
    }, []);

    useEffect(() => {
        if (weather) {
            document.title = `Weather Control: ${Math.round(weather.temp)}°C, ${giveShortDescription(weather.weathercode)}`;
        }
    }, [weather]);

    // console.clear();
    // console.log("weather", weather);
    // console.log("timezone", timezone);

    return (
        <>
            {/* <Backdrop /> */}
            <TopLeft />
            {weather && <Weather />}
            <UpdatedAt />
            <BottomRight />
            {savedLocations && savedLocations.length > 0 && <SavedLocations />}
        </>
    );
}

export default App;
