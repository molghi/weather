import { useEffect, useContext } from "react";
import MyContext from "../context/MyContext";

const WeatherMiddle = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { timezone } = context;

    const region = `${timezone ? timezone.continent : ""}, Terra`;
    const coords = `${timezone ? timezone.coords.lat.toFixed(2) : ""}° N, ${timezone ? timezone.coords.lng.toFixed(2) : ""}° E`;

    return (
        <div>
            <div className="mb-[25px]">
                {/* LOCATION */}
                <div className="text-[22px] text-center mb-[25px] flex gap-[17px] items-center justify-center">
                    <span className="opacity-50">Location:</span>
                    <span className="whitespace-nowrap">
                        {timezone && timezone.city},{" "}
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
                    <span className="opacity-50">Precipitation:</span>
                    <span>
                        <span title="Precipitation probability">0%</span>
                    </span>
                </div>
                <div className="flex justify-center gap-[50px]">
                    <div className="weather__col">
                        {/* WIND */}
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">Wind:</span>
                            <span>4.4 km/h,</span>
                            <span>Southeast</span>
                        </div>

                        {/* UV INDEX */}
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">UV Index:</span>
                            <span>3.9</span>
                        </div>

                        {/* HUMIDITY */}
                        <div className="text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">Humidity:</span>
                            <span>53%</span>
                        </div>
                    </div>
                    <div className="weather__col">
                        {/* CLOUD COVER */}
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            <span className="opacity-50">Cloud cover:</span>
                            <span title="The percentage of cloud coverage">16%</span>
                        </div>
                        <div className="mb-[10px] text-[18px] whitespace-nowrap text-left">
                            {/* DAYLIGHT DURATION */}
                            <span className="opacity-50">Daylight Duration:</span>
                            <span>
                                <span title="Daylight duration">10h 10m</span>
                            </span>
                        </div>
                        <div className="text-[18px] whitespace-nowrap text-left">
                            {/* SUNSHINE DURATION */}
                            <span className="opacity-50">Sunshine Duration:</span>
                            <span>
                                <span title="Sunshine duration">8h 43m</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherMiddle;
