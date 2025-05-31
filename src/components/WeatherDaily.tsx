import { useContext } from "react";
import MyContext from "../context/MyContext";
import WeatherDay from "./WeatherDay";

const WeatherDaily = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, timezone, getLocationLocalTime, toLocalISOString } = context; // Pull out from context

    // Get location date-time (type: date string)
    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);

    // Get ISO like formatted string of location date-time
    const isoLikeLocal: string = toLocalISOString(locationDateTimeNow);

    // Get index of now in weather.daily
    const nowIndexDaily: number = weather
        ? weather.daily.time.findIndex((entry: string) => entry.startsWith(isoLikeLocal.slice(0, 10)))
        : -1;

    // Represents 3 upcoming days
    const amountOfDays: number = 3;

    return (
        <div>
            <div className="text-[20px] mb-[10px]">Daily</div>
            <div className="flex items-stretch justify-center gap-[30px] [@media(max-width:1030px)]:flex-col [@media(max-width:1030px)]:items-center">
                {/* DAY ELEMENTS: 3 UPCOMING DAYS */}

                {/* MAKE ARRAY, POPULATE WITH 3 ELEMENTS, EACH: THE INDEX OF THE NEXT DAY IN daily */}
                {Array.from({ length: amountOfDays }, (_, i) => nowIndexDaily + 1 + i).map((x, i) => (
                    <WeatherDay key={i} index={i} dayIndex={x} />
                ))}
            </div>
        </div>
    );
};

export default WeatherDaily;
