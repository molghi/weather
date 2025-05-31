import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import { SavedLocationProps } from "../context/MyContext";
import fetchWeather from "../utils/fetchWeather";
import fetchTimezone from "../utils/fetchTimezone";

const SavedLocation = ({ location }: { location: SavedLocationProps }) => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { setSavedLocations, localStorageSavedLocationsKey, setWeather, setTimezone, setIsLoading, setTempUnits, timezone } =
        context; // Pull out from context

    // Fetch weather/timezone for this location
    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement; // Type assertion: treat generic e.target as HTMLElement
        if (target.tagName !== "BUTTON") {
            const coords = location.coords.map((x) => +x);
            const timezoneName: string = await fetchTimezone([coords[0], coords[1]], setTimezone, setIsLoading);
            await fetchWeather([coords[0], coords[1]], setWeather, setIsLoading, timezoneName);
            setTempUnits("C");
        }
    };

    // Remove saved location
    const handleRemove = (city: string) => {
        setSavedLocations((prev) => {
            const newSavedLocations = prev.filter((locObj) => locObj.cityName !== city);
            localStorage.setItem(localStorageSavedLocationsKey, JSON.stringify(newSavedLocations));
            return newSavedLocations;
        });
    };

    return (
        <div
            onClick={handleClick}
            className="relative flex items-center justify-between gap-x-[10px] bg-white/10 opacity-60 transition-all duration-300 rounded-[15px] px-[15px] py-[5px] cursor-pointer hover:backdrop-blur-sm location"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            data-coords={`${location.coords[0]},${location.coords[1]}`}
        >
            {/* REMOVE BTN */}
            <button
                onClick={() => handleRemove(location.cityName)}
                className="absolute top-[15px] left-[-53px] text-[14px] inline-block opacity-0 invisible p-0 pr-[10px] border-0 hover:underline"
            >
                Remove
            </button>

            <div>
                {/* TIME / DATE */}
                <div className="text-[13px] mb-[2px]" title={location.localDateTime}>
                    {location.localTime}
                </div>

                {/* LOCATION */}
                <div
                    className="text-[13px] whitespace-nowrap max-w-[60px] overflow-hidden overflow-ellipsis"
                    title={`${location.cityName}, ${location.country}`}
                >
                    {location.cityName}
                </div>
            </div>

            {/* WEATHER DESCRIPTION AND ICON */}
            <div className="basis-[40px] flex-shrink-0 flex-grow-0 max-w-[40px]" title={location.description}>
                <img className="max-w-full" src={location.icon} />
            </div>

            {/* AIR TEMPERATURE */}
            <div className="text-[20px]" title={location.feelsLikeTemp}>
                {location.temp === "200" ? "" : `${Math.round(+location.temp)}°C`}
            </div>
        </div>
    );
};

export default SavedLocation;
