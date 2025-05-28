import { useContext } from "react";
import MyContext from "../context/MyContext";
import WeatherHour from "./WeatherHour";

const WeatherHourly = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, timezone, getLocationLocalTime, toLocalISOString, setTempUnits } = context; // Pull out from context

    // Get location date-time (type: date string)
    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);

    // Get ISO like formatted string of location date-time
    const isoLikeLocal: string = toLocalISOString(locationDateTimeNow);

    // Get index of now in weather.hourly
    const nowIndexHourly: number = weather
        ? weather.hourly.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 13)))
        : -1;

    // Represents 6 upcoming hours
    const amountOfHours: number = 6;

    return (
        <div>
            <div className="mb-[30px]">
                <div className="text-[20px] mb-[10px]">Hourly</div>
                <div className="flex items-stretch justify-center gap-[30px]">
                    {/* HOUR ELEMENTS (6 UPCOMING HOURS) */}

                    {/* MAKE ARRAY, POPULATE WITH 6 ELEMENTS, EACH: THE INDEX OF THE NEXT HOUR IN hourly */}
                    {Array.from({ length: amountOfHours }, (_, i) => nowIndexHourly + 1 + i).map((x, i) => (
                        <WeatherHour key={i} index={x} indexZeroBase={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherHourly;
