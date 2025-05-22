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

function App() {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { coords, weather, setWeather, timezone, setTimezone } = context;

    useEffect(() => {
        fetchWeather(coords, setWeather);
        fetchTimezone(coords, setTimezone);
    }, []);

    // console.log(weather);
    console.log(timezone);

    return (
        <>
            <TopLeft />
            <Weather />
            <UpdatedAt />
            <BottomRight />
            {/* <SavedLocations /> */}
        </>
    );
}

export default App;
