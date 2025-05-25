import { useEffect, useContext } from "react";
import MyContext from "../context/MyContext";

const WeatherMiddle = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather, timezone, getLocationLocalTime, toLocalISOString, formatDuration } = context;

    const region = `${timezone ? timezone.continent : ""}, Terra`;
    const coords = `${timezone ? timezone.coords.lat.toFixed(2) : ""}° N, ${timezone ? timezone.coords.lng.toFixed(2) : ""}° E`;

    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);
    const isoLikeLocal = toLocalISOString(locationDateTimeNow);

    const nowIndexHourly = weather
        ? weather.hourly.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 13)))
        : -1;

    const nowIndexDaily = weather
        ? weather.daily.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 10)))
        : -1;

    const getWindDirection = (degrees: number): string => {
        if (degrees === -1) return "";
        const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    return (
        <div>
            <div className="mb-[25px]">
                {/* LOCATION */}
                <div
                    className="text-[22px] text-center mb-[25px] flex gap-[17px] items-center justify-center"
                    title={timezone && !timezone.city ? "*Location name is approximate" : ""}
                >
                    <span className="opacity-50">Location:</span>
                    <span className="whitespace-nowrap">
                        {timezone && timezone.city ? timezone.city : timezone?.timezone.name.split("/").slice(-1).join("") + "*"},{" "}
                        <span className="relative">
                            {timezone && timezone.country}
                            <span className="absolute top-[-17px] right-[-20px] text-[20px] rotate-and-rest">
                                {timezone && timezone.flag}
                            </span>
                        </span>
                        , {region}
                    </span>
                    <span className="opacity-30 text-[20px] transition-all duration-300 whitespace-nowrap">({coords})</span>
                </div>

                {/* PRECIPITATION */}
                <div className="text-center mb-[20px] text-[18px]">
                    <span className="opacity-50">Precipitation: </span>
                    <span>
                        <span title="Precipitation probability">
                            {weather?.hourly.precipitation_probability[nowIndexHourly]}%
                        </span>
                    </span>
                </div>
                <div className="flex justify-center gap-[50px]">
                    <div className="weather__col">
                        {/* WIND */}
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">Wind: </span>
                            <span>{weather?.windspeed} km/h, </span>
                            <span>{getWindDirection(weather ? weather.winddirection : -1)}</span>
                        </div>

                        {/* UV INDEX */}
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">UV Index: </span>
                            <span>{weather?.daily.uv_index_max[nowIndexDaily].toFixed(1)}</span>
                        </div>

                        {/* HUMIDITY */}
                        <div className="text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">Humidity: </span>
                            <span>{weather?.hourly.relative_humidity_2m[nowIndexHourly]}%</span>
                        </div>
                    </div>
                    <div className="weather__col">
                        {/* CLOUD COVER */}
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">Cloud Cover: </span>
                            <span title="The percentage of cloud coverage">{weather?.hourly.cloud_cover[nowIndexHourly]}%</span>
                        </div>
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            {/* DAYLIGHT DURATION */}
                            <span className="opacity-50">Daylight Duration: </span>
                            <span>
                                <span title="Daylight duration">
                                    {formatDuration(weather?.daily.daylight_duration[nowIndexDaily])}
                                </span>
                            </span>
                        </div>
                        <div className="text-[18px] whitespace-nowrap text-left">
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
