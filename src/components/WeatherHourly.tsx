import { useContext } from "react";
import MyContext from "../context/MyContext";
import WeatherHour from "./WeatherHour";

const WeatherHourly = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather, timezone, getLocationLocalTime, toLocalISOString, setTempUnits } = context;

    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);
    const isoLikeLocal = toLocalISOString(locationDateTimeNow);

    const nowIndexHourly = weather
        ? weather.hourly.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 13)))
        : -1;

    return (
        <div>
            <div className="mb-[30px]">
                <div className="text-[20px] mb-[10px]">Hourly</div>
                <div className="flex items-stretch justify-center gap-[30px]">
                    {/* HOUR ELEMENTS (6 UPCOMING HOURS) */}

                    {Array.from({ length: 6 }, (_, i) => nowIndexHourly + 1 + i).map((x, i) => (
                        <WeatherHour key={i} index={x} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherHourly;
