import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import interpretWeathercode from "../utils/interpretWeathercode";
import getWeatherIcon from "../utils/getWeatherIcon";
import convertTempUnits from "../utils/tempConversion";
import { SavedLocationProps } from "../context/MyContext";

const WeatherTop = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const {
        weather,
        timezone,
        getLocationLocalTime,
        toLocalISOString,
        tempUnits,
        setTempUnits,
        savedLocations,
        setSavedLocations,
        localStorageSavedLocationsKey,
        localStoragePrimaryLocationKey,
    } = context;

    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);
    const isoLikeLocal = toLocalISOString(locationDateTimeNow);

    // Get location hours-minutes
    const time: string = `${new Date(locationDateTimeNow).getHours()}:${new Date(locationDateTimeNow)
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    // Get location date-time formatted string
    const dateTime: string = `${new Date(locationDateTimeNow).getDate()}/${(new Date(locationDateTimeNow).getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${new Date(locationDateTimeNow).getFullYear()}  ̶ ${time}`;

    const feelsLikeIndex = weather
        ? weather.hourly.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 13)))
        : -1;

    const locationHoursNow = new Date(locationDateTimeNow).getHours();
    let dayTime = ``;
    switch (locationHoursNow) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            dayTime = "Night";
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            dayTime = "Morning";
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            dayTime = "Day";
            break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            dayTime = "Evening";
            break;
    }

    const description = interpretWeathercode(weather ? weather.weathercode : -1);
    const icon = getWeatherIcon(weather ? weather.weathercode : -1, dayTime);

    const [weatherMain, setWeatherMain] = useState<string>("?°C");
    const [weatherFeelsLike, setWeatherFeelsLike] = useState<string>("Feels like ?°C");

    const changeTemp = (unitsNow: string) => {
        if (unitsNow === "C") {
            const inFahrenheitMain = parseInt(weatherMain);
            const inFahrenheitFeelsLike = parseInt(weatherFeelsLike.split(" ").slice(2).join(" "));
            setWeatherMain(`${Math.round(convertTempUnits(inFahrenheitMain, "to C"))}°C`);
            setWeatherFeelsLike(`Feels like ${Math.round(convertTempUnits(inFahrenheitFeelsLike, "to C"))}°C`);
        }
        if (unitsNow === "F") {
            const inCelsiusMain = parseInt(weatherMain);
            const inCelsiusFeelsLike = parseInt(weatherFeelsLike.split(" ").slice(2).join(" "));
            setWeatherMain(`${Math.round(convertTempUnits(inCelsiusMain, "to F"))}°F`);
            setWeatherFeelsLike(`Feels like ${Math.round(convertTempUnits(inCelsiusFeelsLike, "to F"))}°F`);
        }
    };

    const convertAirTemp = () => {
        // Convert to Celsius/Fahrenheit
        setTempUnits((prev) => {
            const unitsNow = prev === "C" ? "F" : "C";
            return unitsNow;
        });
    };

    // Add the currently shown location to your list
    const addToSaved = () => {
        const cityName = timezone?.city ?? "";

        // Compose location object
        const locationObj: SavedLocationProps = {
            localTime:
                `${new Date(locationDateTimeNow).getHours()}:${new Date(locationDateTimeNow)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}` ?? "",
            localDateTime: dateTime,
            cityName: cityName,
            country: timezone?.country ?? "",
            temp: Math.round(weather?.temp ?? 0) + "",
            icon: icon ?? "",
            coords: [String(timezone?.coords.lat ?? 0), String(timezone?.coords.lng ?? 0)],
            feelsLikeTemp: weatherFeelsLike ?? "",
            description: description ?? "",
        };

        // Check if location was already added before: if so, do not add but update
        if (savedLocations?.map((x) => x.cityName).includes(cityName)) {
            setSavedLocations((prev) => {
                const newSavedLocations = prev.map((locObj) => {
                    if (locObj.cityName === cityName) {
                        locObj.localTime = locationObj.localTime;
                        locObj.localDateTime = locationObj.localDateTime;
                        locObj.temp = locationObj.temp;
                        locObj.icon = locationObj.icon;
                        locObj.feelsLikeTemp = locationObj.feelsLikeTemp;
                        locObj.description = locationObj.description;
                    }
                    return locObj;
                });
                localStorage.setItem(localStorageSavedLocationsKey, JSON.stringify(newSavedLocations));
                return newSavedLocations;
            });
            return;
        }

        // Update state and local storage
        setSavedLocations((prev) => {
            const newSavedLocations = [...prev, locationObj];
            localStorage.setItem(localStorageSavedLocationsKey, JSON.stringify(newSavedLocations));
            return newSavedLocations;
        });
    };

    // Make the currently shown location your primary
    const makePrimary = () => {
        const coords = [timezone?.coords.lat ?? 0, timezone?.coords.lng ?? 0];
        localStorage.setItem(localStoragePrimaryLocationKey, JSON.stringify(coords));
    };

    useEffect(() => {
        if (weather) {
            setWeatherMain(`${Math.round(weather.temp)}°C`);
            setWeatherFeelsLike(`Feels like ${Math.round(weather.hourly.apparent_temperature[feelsLikeIndex])}°C`);
        }
    }, [weather]);

    useEffect(() => {
        changeTemp(tempUnits);
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
                    <span className="text-[80px] font-bold">{weatherMain}</span>
                    <span className="tracking-[1px] -mt-[3px] opacity-60">{weatherFeelsLike}</span>
                </div>

                {/* ICON */}
                <div className="w-[130px] h-[130px]">
                    <img src={icon} />
                </div>

                {/* DESCRIPTION */}
                <div className="flex-[1_1_100%] text-[22px]">{description}</div>

                {/* BTNS */}
                <div className="flex items-center gap-[10px] absolute top-0 right-[15%]">
                    <button
                        onClick={() => makePrimary()}
                        title="Make this your primary location"
                        className="w-[39px] p-[10px] opacity-20 transition-all duration-200 hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path
                                className="fill-white"
                                d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                            ></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => addToSaved()}
                        title="Add this location to your list"
                        className="w-[38px] p-[10px] opacity-20 transition-all duration-200 hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                className="fill-white"
                                d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherTop;
