import { useContext } from "react";
import MyContext from "../context/MyContext";

const WeatherMiddle = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, timezone, getLocationLocalTime, toLocalISOString, formatDuration } = context; // Pull out from context

    // Define region and coords strings (for Location)
    const region: string = `${timezone ? timezone.continent : ""}, Terra`;
    const coords: string = `${timezone ? timezone.coords.lat.toFixed(2) : ""}° N, ${
        timezone ? timezone.coords.lng.toFixed(2) : ""
    }° E`;

    // Get location date-time (type: date string)
    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);

    // Get ISO like formatted string of location date-time
    const isoLikeLocal: string = toLocalISOString(locationDateTimeNow);

    // Get index of now in weather.hourly
    const nowIndexHourly: number = weather
        ? weather.hourly.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 13)))
        : -1;

    // Get index of now in weather.daily
    const nowIndexDaily: number = weather
        ? weather.daily.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 10)))
        : -1;

    // Interpret wind direction (string)
    const getWindDirection = (degrees: number): string => {
        if (degrees === -1) return "";
        const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    // ==========================================================================================

    return (
        <div>
            <div className="mb-[25px]">
                {/* LOCATION */}
                <div
                    className="text-[22px] text-center mb-[25px] flex gap-[17px] items-center justify-center hover:scale-105 transition-all duration-300"
                    // style={{ animation: "enlarge-smaller 6s linear 4s infinite" }}
                    title={timezone && !timezone.city ? "*Location name is approximate" : ""}
                >
                    <span className="opacity-50">Location:</span>
                    <span className="whitespace-nowrap">
                        {/* CITY */}
                        {timezone && timezone.city
                            ? timezone.city
                            : timezone?.timezone.name.split("/").slice(-1).join("").replaceAll("_", " ") + "*"}
                        ,{" "}
                        <span className="relative">
                            {/* COUNTRY */}
                            {timezone && timezone.country}
                            <span className="absolute top-[-17px] right-[-20px] text-[20px] rotate-and-rest">
                                {/* FLAG ICON */}
                                {timezone && timezone.flag}
                            </span>
                        </span>
                        {/* REGION */}, {region}
                    </span>
                    {/* COORDS */}
                    <span className="opacity-30 text-[20px] transition-all duration-300 whitespace-nowrap">({coords})</span>
                </div>

                {/* PRECIPITATION PROBABILITY */}
                <div
                    className="text-center mb-[20px] text-[18px] hover:scale-105 transition-all duration-300" /*style={{ animation: "enlarge-smaller 6s linear 5s infinite" }}*/
                >
                    <span className="opacity-50">Precipitation: </span>
                    <span>
                        <span title="Precipitation probability">
                            {weather?.hourly.precipitation_probability[nowIndexHourly]}%
                        </span>
                    </span>
                </div>

                <div className="flex justify-center gap-[50px] ">
                    <div className="weather__col">
                        {/* WIND SPEED & DIRECTION */}
                        <div
                            className="mb-[10px] text-[18px] whitespace-nowrap text-left hover:scale-105 transition-all duration-300"
                            // style={{ animation: "enlarge-smaller 6s linear 6s infinite" }}
                        >
                            <span className="opacity-50">Wind: </span>
                            <span>{weather?.windspeed} km/h, </span>
                            <span>{getWindDirection(weather ? weather.winddirection : -1)}</span>
                        </div>

                        {/* UV INDEX */}
                        <div
                            className="mb-[10px] text-[18px] whitespace-nowrap text-left hover:scale-105 transition-all duration-300"
                            // style={{ animation: "enlarge-smaller 6s linear 7s infinite" }}
                        >
                            <span className="opacity-50">UV Index: </span>
                            <span>{weather?.daily.uv_index_max[nowIndexDaily].toFixed(1)}</span>
                        </div>

                        {/* HUMIDITY */}
                        <div
                            className="text-[18px] whitespace-nowrap text-left hover:scale-105 transition-all duration-300"
                            // style={{ animation: "enlarge-smaller 6s linear 8s infinite" }}
                        >
                            <span className="opacity-50">Humidity: </span>
                            <span>{weather?.hourly.relative_humidity_2m[nowIndexHourly]}%</span>
                        </div>
                    </div>

                    <div className="weather__col">
                        {/* CLOUD COVER */}
                        <div
                            className="mb-[10px] text-[18px] whitespace-nowrap text-left hover:scale-105 transition-all duration-300"
                            // style={{ animation: "enlarge-smaller 6s linear 9s infinite" }}
                        >
                            <span className="opacity-50">Cloud Cover: </span>
                            <span title="The percentage of cloud coverage">{weather?.hourly.cloud_cover[nowIndexHourly]}%</span>
                        </div>

                        <div
                            className="mb-[10px] text-[18px] whitespace-nowrap text-left hover:scale-105 transition-all duration-300"
                            // style={{ animation: "enlarge-smaller 6s linear 10s infinite" }}
                        >
                            {/* DAYLIGHT DURATION */}
                            <span className="opacity-50">Daylight Duration: </span>
                            <span>
                                <span title="Daylight duration">
                                    {formatDuration(weather?.daily.daylight_duration[nowIndexDaily])}
                                </span>
                            </span>
                        </div>

                        <div
                            className="text-[18px] whitespace-nowrap text-left hover:scale-105 transition-all duration-300"
                            // style={{ animation: "enlarge-smaller 6s linear 11s infinite" }}
                        >
                            {/* SUNSHINE DURATION */}
                            <span className="opacity-50">Sunshine Duration: </span>
                            <span>
                                <span title="Sunshine duration">
                                    {formatDuration(weather?.daily.sunshine_duration[nowIndexDaily])}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherMiddle;
