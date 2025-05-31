import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import interpretWeathercode from "../utils/interpretWeathercode";
import getWeatherIcon from "../utils/getWeatherIcon";
import convertTempUnits from "../utils/tempConversion";
import addToSaved from "../utils/addToSaved";
import { primaryIcon, addIcon } from "../utils/icons";
import updateSavedLocations from "../utils/updateSavedLocations";

const WeatherTop = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const {
        weather,
        timezone,
        getLocationLocalTime,
        toLocalISOString,
        tempUnits,
        setTempUnits,
        localStoragePrimaryLocationKey,
        coords,
        setSavedLocations,
        localStorageSavedLocationsKey,
        savedLocations,
    } = context; // Pull out from context

    // Check screen width
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    let positionClasses = screenWidth >= 1330 ? "" : "right-[20%]";
    if (screenWidth < 860) positionClasses = "right-[15%] top-[-10%]";
    if (screenWidth < 500) positionClasses += " right-[0%] top-[-15%]";

    // Get location date-time (type: date string)
    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);

    // Get ISO like formatted string of location date-time
    const isoLikeLocal: string = toLocalISOString(locationDateTimeNow);

    // Get location hours-minutes string
    const time: string = `${new Date(locationDateTimeNow).getHours()}:${new Date(locationDateTimeNow)
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    // Get location date-time formatted string
    const dateTime: string = `${new Date(locationDateTimeNow).getDate()}/${(new Date(locationDateTimeNow).getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${new Date(locationDateTimeNow).getFullYear()}  ̶ ${time}`;

    // Get index of now in weather.hourly.time
    const feelsLikeIndex: number = weather
        ? weather.hourly.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 13)))
        : -1;

    // Get hours in shown location
    const locationHoursNow: number = new Date(locationDateTimeNow).getHours();

    // Define time of the day (word)
    let dayTime: string = "";
    if (locationHoursNow >= 0 && locationHoursNow <= 5) dayTime = "Night";
    if (locationHoursNow >= 6 && locationHoursNow <= 11) dayTime = "Morning";
    if (locationHoursNow >= 12 && locationHoursNow <= 17) dayTime = "Day";
    if (locationHoursNow >= 18 && locationHoursNow <= 23) dayTime = "Evening";

    // Get description string
    const description: string = interpretWeathercode(weather ? weather.weathercode : -1);

    // Get weather icon file path
    const icon: string = getWeatherIcon(weather ? weather.weathercode : -1, dayTime);

    const [weatherMain, setWeatherMain] = useState<number>(200);
    const [weatherFeelsLike, setWeatherFeelsLike] = useState<number>(200);

    // Convert to C/F (on tempUnits change)
    const changeTemp = (unitsNow: string) => {
        if (unitsNow === "C") {
            setWeatherMain(convertTempUnits(weatherMain, "to C"));
            setWeatherFeelsLike(convertTempUnits(weatherFeelsLike, "to C"));
        }
        if (unitsNow === "F") {
            setWeatherMain(convertTempUnits(weatherMain, "to F"));
            setWeatherFeelsLike(convertTempUnits(weatherFeelsLike, "to F"));
        }
    };

    // Happens on click: switch temp units, Celsius/Fahrenheit
    const convertAirTemp = () => setTempUnits((prev) => (prev === "C" ? "F" : "C"));

    // Make currently shown location your primary (means it will be shown on the next app start)
    const makePrimary = () => {
        const coords = [timezone?.coords.lat ?? 0, timezone?.coords.lng ?? 0];
        localStorage.setItem(localStoragePrimaryLocationKey, JSON.stringify(coords));
    };

    useEffect(() => {
        // Set air temperature
        if (weather?.temp !== null) {
            const tempMain = Number(weather?.temp);
            const tempFeelsLike = Number(weather?.hourly.apparent_temperature[feelsLikeIndex]);
            if (!isNaN(tempMain)) setWeatherMain(tempMain);
            else setWeatherMain(0);
            if (!isNaN(tempFeelsLike)) setWeatherFeelsLike(tempFeelsLike);
            else setWeatherFeelsLike(0);
        }

        // Update Saved Location
        updateSavedLocations(
            weatherMain,
            time,
            dateTime,
            icon,
            weatherFeelsLike,
            description,
            coords,
            timezone,
            setSavedLocations,
            localStorageSavedLocationsKey
        );
    }, [weather, timezone]);

    useEffect(() => {
        if (weatherMain !== 200) changeTemp(tempUnits);
    }, [tempUnits]);

    // ==============================================================================================

    return (
        <div>
            <div className="flex items-center flex-wrap justify-center text-center gap-x-[40px] mb-[30px] relative">
                {/* MAIN TEMP & FEELS LIKE */}
                <div
                    className="flex flex-col leading-none cursor-pointer"
                    title="Click to convert to Celsius/Fahrenheit"
                    onClick={() => convertAirTemp()}
                >
                    <span
                        className="text-[80px] font-bold hover:scale-105 transition-all duration-300" /*style={{ animation: "enlarge 6s linear infinite" }}*/
                    >
                        {weatherMain === 200 ? (
                            "?"
                        ) : (
                            <span>
                                {Math.round(weatherMain)}°{tempUnits}
                            </span>
                        )}
                    </span>
                    <span
                        className="tracking-[1px] -mt-[3px] opacity-60 hover:scale-105 transition-all duration-300" /*style={{ animation: "enlarge 6s linear 1s infinite" }}*/
                    >
                        {weatherFeelsLike === 200 ? (
                            "?"
                        ) : (
                            <span>
                                Feels like {Math.round(weatherFeelsLike)}°{tempUnits}
                            </span>
                        )}
                    </span>
                </div>

                {/* ICON */}
                <div
                    className="w-[130px] h-[130px] hover:scale-105 transition-all duration-300" /*style={{ animation: "enlarge 6s linear 2s infinite" }}*/
                >
                    <img src={icon} />
                </div>

                {/* DESCRIPTION */}
                <div
                    className="flex-[1_1_100%] text-[22px] hover:scale-105 transition-all duration-300" /*style={{ animation: "enlarge-smaller 6s linear 3s infinite" }}*/
                >
                    {description}
                </div>

                {/* BTNS */}
                <div className={`flex items-center gap-[10px] absolute top-0 right-[15%] ${positionClasses}`}>
                    {/* MAKE PRIMARY BTN */}
                    <button
                        onClick={() => makePrimary()}
                        title="Make this your primary location"
                        className="w-[39px] p-[10px] opacity-20 transition-all duration-200 hover:opacity-100"
                    >
                        {primaryIcon}
                    </button>

                    {/* ADD TO SAVED BTN */}
                    <button
                        onClick={() =>
                            addToSaved(
                                locationDateTimeNow,
                                dateTime,
                                icon,
                                weatherFeelsLike,
                                description,
                                weather,
                                timezone,
                                savedLocations,
                                setSavedLocations,
                                localStorageSavedLocationsKey
                            )
                        }
                        title="Add this location to your list"
                        className="w-[38px] p-[10px] opacity-20 transition-all duration-200 hover:opacity-100"
                    >
                        {addIcon}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherTop;
