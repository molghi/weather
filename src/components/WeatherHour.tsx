import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import { precipitationIcon, humidityIcon, cloudCoverIcon, hourIcon } from "../utils/icons";
import interpretWeathercode from "../utils/interpretWeathercode";
import convertTempUnits from "../utils/tempConversion";

interface WeatherHourProps {
    index: number;
    indexZeroBase: number;
}

const WeatherHour = ({ index, indexZeroBase }: WeatherHourProps) => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, tempUnits, setTempUnits } = context; // Pull out from context

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

    useEffect(() => {
        // Set air temperature
        if (weather) {
            if (weather && weather.hourly.temperature_2m[index] && !isNaN(weather.hourly.temperature_2m[index]))
                setWeatherMain(weather?.hourly.temperature_2m[index]);
            if (weather && weather.hourly.apparent_temperature[index] && !isNaN(weather.hourly.apparent_temperature[index]))
                setWeatherFeelsLike(weather?.hourly.apparent_temperature[index]);
        }
    }, [weather]);

    useEffect(() => {
        if (weatherMain !== 200) changeTemp(tempUnits);
    }, [tempUnits]);

    // =========================================================================================================

    return (
        <>
            <div
                className="flex flex-col flex-[1_1_16.666667%] transition-all duration-300 p-[10px] rounded-[10px] leading-[1] shadow-[inset_0_0_1px_white] hover:bg-white/10 hover:scale-110 transition-transform hover:backdrop-blur-sm"
                // style={{ animation: `enlarge 6s linear ${indexZeroBase + 1}s infinite` }}
            >
                <div className="flex items-center gap-[10px] mb-[5px] leading-[1]">
                    {/* HOUR ICON */}
                    <span>{hourIcon}</span>

                    {/* TIME */}
                    {new Date(weather?.hourly.time[index]).getHours() +
                        ":" +
                        new Date(weather?.hourly.time[index]).getMinutes().toString().padStart(2, "0")}
                </div>

                {/* AIR TEMPERATURE */}
                <div
                    className="flex items-center gap-[10px] mb-[5px] cursor-pointer"
                    title="Click to convert to Celsius/Fahrenheit"
                    onClick={() => convertAirTemp()}
                >
                    {weatherMain === 200 ? "?" : Math.round(weatherMain) + "°" + tempUnits}
                    <span title="Feels like" className="opacity-50">
                        ({weatherFeelsLike === 200 ? "?" : Math.round(weatherFeelsLike) + "°" + tempUnits})
                    </span>
                </div>

                {/* DESCRIPTION */}
                <div
                    className="italic text-[12px] mb-[5px] max-h-[28px] overflow-hidden text-ellipsis 
       [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                    title={interpretWeathercode(weather?.hourly.weather_code[index])}
                >
                    {interpretWeathercode(weather?.hourly.weather_code[index])}
                </div>

                {/* PRECIPITATION PROBABILITY */}
                <div className="mt-auto max-h-[20px] flex items-center gap-[10px] mb-[5px]" title="Precipitation">
                    <span className="max-w-[17px] w-full">{precipitationIcon}</span>{" "}
                    <span title="Precipitation probability">{weather?.hourly.precipitation_probability[index]}%</span>
                </div>

                <div className="flex items-center gap-[15px]">
                    {/* HUMIDITY */}
                    <div className="flex items-center gap-[10px]" title="Humidity">
                        <span className="w-[14px] max-w-[14px]">{humidityIcon}</span>{" "}
                        {weather?.hourly.relative_humidity_2m[index]}%
                    </div>

                    {/* CLOUD COVER */}
                    <div className="flex items-center gap-[10px]" title="Cloud cover">
                        <span className="w-[17px] max-w-[17px]">{cloudCoverIcon}</span> {weather?.hourly.cloud_cover[index]}%
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherHour;
