import { useContext } from "react";
import MyContext from "../context/MyContext";
import interpretWeathercode from "../utils/interpretWeathercode";
import WeatherDay from "./WeatherDay";

const WeatherDaily = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather, timezone, getLocationLocalTime, toLocalISOString } = context;

    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);
    const isoLikeLocal = toLocalISOString(locationDateTimeNow);

    const nowIndexDaily = weather
        ? weather.daily.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 10)))
        : -1;

    return (
        <div>
            <div>
                <div className="text-[20px] mb-[10px]">Daily</div>
                <div className="flex items-stretch justify-center gap-[30px]">
                    {/* DAY ELEMENTS: 3 UPCOMING DAYS */}
                    {Array.from({ length: 3 }, (_, i) => nowIndexDaily + 1 + i).map((x, i) => (
                        <WeatherDay key={i} index={i} dayIndex={x} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherDaily;
