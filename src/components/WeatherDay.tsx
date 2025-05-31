import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import interpretWeathercode from "../utils/interpretWeathercode";
import convertTempUnits from "../utils/tempConversion";
import { precipitationIcon, daylightIcon, sunshineIcon, sunriseIcon, sunsetIcon } from "../utils/icons";
import { DateTime } from "luxon";

interface WeatherDayProps {
    index: number;
    dayIndex: number;
}

const WeatherDay = ({ index, dayIndex }: WeatherDayProps) => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, timezone, formatDuration, tempUnits, setTempUnits } = context; // Pull out from context

    const [weatherMainMin, setWeatherMainMin] = useState<number>(200);
    const [weatherMainMax, setWeatherMainMax] = useState<number>(200);
    const [weatherFeelsLikeMin, setWeatherFeelsLikeMin] = useState<number>(200);
    const [weatherFeelsLikeMax, setWeatherFeelsLikeMax] = useState<number>(200);
    const [tempSign, setTempSign] = useState<string>("°C");

    // Convert to C/F (on tempUnits change)
    const changeTemp = (unitsNow: string) => {
        if (unitsNow === "C") {
            setWeatherMainMin(Math.round(convertTempUnits(weatherMainMin, "to C")));
            setWeatherMainMax(Math.round(convertTempUnits(weatherMainMax, "to C")));
            setWeatherFeelsLikeMin(Math.round(convertTempUnits(weatherFeelsLikeMin, "to C")));
            setWeatherFeelsLikeMax(Math.round(convertTempUnits(weatherFeelsLikeMax, "to C")));
            setTempSign("°C");
        }
        if (unitsNow === "F") {
            setWeatherMainMin(Math.round(convertTempUnits(weatherMainMin, "to F")));
            setWeatherMainMax(Math.round(convertTempUnits(weatherMainMax, "to F")));
            setWeatherFeelsLikeMin(Math.round(convertTempUnits(weatherFeelsLikeMin, "to F")));
            setWeatherFeelsLikeMax(Math.round(convertTempUnits(weatherFeelsLikeMax, "to F")));
            setTempSign("°F");
        }
    };

    // Happens on click: switch temp units, Celsius/Fahrenheit
    const convertAirTemp = () => setTempUnits((prev) => (prev === "C" ? "F" : "C"));

    // Set air temperature
    useEffect(() => {
        if (weather) {
            if (weather?.daily.temperature_2m_min[dayIndex])
                setWeatherMainMin(Math.round(weather?.daily.temperature_2m_min[dayIndex]));
            if (weather?.daily.temperature_2m_max[dayIndex])
                setWeatherMainMax(Math.round(weather?.daily.temperature_2m_max[dayIndex]));
            if (weather?.daily.apparent_temperature_min[dayIndex])
                setWeatherFeelsLikeMin(Math.round(weather?.daily.apparent_temperature_min[dayIndex]));
            if (weather?.daily.apparent_temperature_max[dayIndex])
                setWeatherFeelsLikeMax(Math.round(weather?.daily.apparent_temperature_max[dayIndex]));
        }
    }, [weather]);

    useEffect(() => {
        if (weatherMainMin !== 200) changeTemp(tempUnits);
    }, [tempUnits]);

    const dayNames = ["Tomorrow", "The Day After Tomorrow", "In 3 Days"];

    // Define sunrise and sunset times
    const rawTimeSunrise = weather?.daily.sunrise[dayIndex]; // Original local ISO time string (no timezone)
    const dtSunrise = DateTime.fromISO(rawTimeSunrise); //.setZone(timezone?.timezone.name); // Parse as if it were local to a specific timezone
    const sunriseTime = dtSunrise.toFormat("HH:mm"); // Format as needed

    const rawTimeSunset = weather?.daily.sunset[dayIndex]; // Original local ISO time string (no timezone)
    const dtSunset = DateTime.fromISO(rawTimeSunset); //.setZone(timezone?.timezone.name); // Parse as if it were local to a specific timezone
    const sunsetTime = dtSunset.toFormat("HH:mm"); // Format as needed

    // const sunriseTimestamp = timezone ? timezone.sun.rise.apparent * 1000 : 0;
    // const dt: any = DateTime.fromMillis(sunriseTimestamp, { zone: timezone?.timezone.name });
    // const sunsetTimestamp = timezone ? timezone.sun.set.apparent * 1000 : 0;
    // const dt2: any = DateTime.fromMillis(sunsetTimestamp, { zone: timezone?.timezone.name });
    // const sunriseTime = dt.c.hour + ":" + dt.c.minute.toString().padStart(2, "0");
    // const sunsetTime = dt2.c.hour + ":" + dt2.c.minute.toString().padStart(2, "0");

    // ==============================================================================================

    return (
        <div
            className="flex flex-col flex-[1_1_33.3333333333%] transition-all duration-300 p-[10px] rounded-[10px] leading-[1] shadow-[inset_0_0_1px_white] hover:bg-white/10 hover:scale-110 transition-transform hover:backdrop-blur-sm [@media(max-width:1030px)]:min-w-[315px]"
            // style={{ animation: `enlarge-smaller 5s linear ${index + 2}s infinite` }}
        >
            {/* DAY IT WILL BE */}
            <div className="mb-[5px] opacity-50">
                {dayNames[index]} ({new Date(weather?.daily.time[dayIndex]).getDate()}/
                {new Date(weather?.daily.time[dayIndex]).getMonth() + 1}/
                {new Date(weather?.daily.time[dayIndex]).getFullYear().toString().slice(2)})
            </div>

            {/* AIR TEMP */}
            <div
                className="mb-[5px] cursor-pointer"
                title="Click to convert to Celsius/Fahrenheit"
                onClick={() => convertAirTemp()}
            >
                {weatherMainMin === 200 ? "?" : weatherMainMin} - {weatherMainMax === 200 ? "?" : weatherMainMax}
                {tempSign} &nbsp;
                <span className="opacity-50" title="Feels like">
                    ({weatherFeelsLikeMin === 200 ? "?" : weatherFeelsLikeMin} -{" "}
                    {weatherFeelsLikeMax === 200 ? "?" : weatherFeelsLikeMax}
                    {tempSign})
                </span>
            </div>

            {/* DESCRIPTION */}
            <div
                className="mb-[5px] italic text-[12px] h-[28px] overflow-hidden text-ellipsis 
       [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                title={interpretWeathercode(weather?.daily.weather_code[dayIndex])}
            >
                {interpretWeathercode(weather?.daily.weather_code[dayIndex])}
            </div>

            <div className="flex items-center gap-[30px] mb-[5px] translate-x-[17px]">
                {/* UV INDEX */}
                <div className="flex items-center gap-[10px] leading-[1]" title="UV index">
                    <span className="uv-index"></span>
                    {weather?.daily.uv_index_max[dayIndex].toFixed(1)}
                </div>

                {/* DAYLIGHT DURATION */}
                <span className="whitespace-nowrap flex items-center gap-[10px]" title="Daylight duration">
                    <span className="max-w-[15px] w-[15px]">{daylightIcon}</span>{" "}
                    {formatDuration(weather?.daily.daylight_duration[dayIndex])}
                </span>

                {/* SUNSHINE DURATION */}
                <span className="whitespace-nowrap flex items-center gap-[10px]" title="Sunshine duration">
                    <span className="max-w-[20px] w-[20px]">{sunshineIcon}</span>{" "}
                    {formatDuration(weather?.daily.sunshine_duration[dayIndex])}
                </span>
            </div>

            <div className="mb-[5px] flex items-center gap-[30px]">
                {/* SUNRISE */}
                <span className="whitespace-nowrap flex items-center gap-[10px]" title="Sunrise">
                    <span className="max-w-[19px] w-[19px]">{sunriseIcon}</span>
                    {sunriseTime}
                </span>

                {/* SUNSET */}
                <span className="whitespace-nowrap flex items-center gap-[10px]" title="Sunset">
                    <span className="max-w-[19px] w-[19px]">{sunsetIcon}</span>
                    {sunsetTime}
                </span>
            </div>

            {/* PRECIPITATION */}
            <div className="flex items-center justify-start gap-[10px] flex-initial" title="Precipitation probability">
                <span className="max-w-[19px] w-[19px]">{precipitationIcon}</span>
                {weather?.daily.precipitation_probability_max[dayIndex]}%
            </div>
        </div>
    );
};

export default WeatherDay;
