import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import interpretWeathercode from "../utils/interpretWeathercode";
import convertTempUnits from "../utils/tempConversion";

interface WeatherHourProps {
    index: number;
}

const WeatherHour = ({ index }: WeatherHourProps) => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather, tempUnits, setTempUnits } = context;

    const [weatherMain, setWeatherMain] = useState<string>("?°C");
    const [weatherFeelsLike, setWeatherFeelsLike] = useState<string>("?°C");

    const changeTemp = (unitsNow: string) => {
        if (unitsNow === "C") {
            const inFahrenheitMain = parseInt(weatherMain);
            const inFahrenheitFeelsLike = parseInt(weatherFeelsLike);
            setWeatherMain(`${Math.round(convertTempUnits(inFahrenheitMain, "to C"))}°C`);
            setWeatherFeelsLike(`${Math.round(convertTempUnits(inFahrenheitFeelsLike, "to C"))}°C`);
        }
        if (unitsNow === "F") {
            const inCelsiusMain = parseInt(weatherMain);
            const inCelsiusFeelsLike = parseInt(weatherFeelsLike);
            setWeatherMain(`${Math.round(convertTempUnits(inCelsiusMain, "to F"))}°F`);
            setWeatherFeelsLike(`${Math.round(convertTempUnits(inCelsiusFeelsLike, "to F"))}°F`);
        }
    };

    const convertAirTemp = () => {
        // Convert to Celsius/Fahrenheit
        setTempUnits((prev) => {
            const unitsNow = prev === "C" ? "F" : "C";
            return unitsNow;
        });
    };

    useEffect(() => {
        if (weather) {
            setWeatherMain(`${Math.round(weather?.hourly.temperature_2m[index])}°C`);
            setWeatherFeelsLike(`${Math.round(weather?.hourly.apparent_temperature[index])}°C`);
        }
    }, [weather]);

    useEffect(() => {
        changeTemp(tempUnits);
    }, [tempUnits]);

    // =========================================================================================================

    return (
        <>
            <div className="flex flex-col flex-[1_1_16.666667%] transition-all duration-300 p-[10px] rounded-[10px] leading-[1] shadow-[inset_0_0_1px_white] hover:bg-white/10 hover:scale-110 transition-transform hover:backdrop-blur-sm">
                <div className="flex items-center gap-[10px] mb-[5px] leading-[1]">
                    {/* HOUR ICON */}
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="max-w-[16px] w-full fill-white">
                            &lt;
                            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                        </svg>
                    </span>

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
                    {weatherMain}
                    <span title="Feels like" className="opacity-50">
                        ({weatherFeelsLike})
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

                {/* PRECIPITATION */}
                <div className="mt-auto max-h-[20px] flex items-center gap-[10px] mb-[5px]" title="Precipitation">
                    <span className="max-w-[17px] w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white">
                            <path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96L96 320zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z"></path>
                        </svg>
                    </span>{" "}
                    <span title="Precipitation probability">{weather?.hourly.precipitation_probability[index]}%</span>
                </div>

                <div className="flex items-center gap-[15px]">
                    {/* HUMIDITY */}
                    <div className="flex items-center gap-[10px]" title="Humidity">
                        <span className="w-[14px] max-w-[14px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="fill-white">
                                <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path>
                            </svg>
                        </span>{" "}
                        {weather?.hourly.relative_humidity_2m[index]}%
                    </div>

                    {/* CLOUD COVER */}
                    <div className="flex items-center gap-[10px]" title="Cloud cover">
                        <span className="w-[17px] max-w-[17px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="fill-white">
                                <path d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path>
                            </svg>
                        </span>{" "}
                        {weather?.hourly.cloud_cover[index]}%
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherHour;
