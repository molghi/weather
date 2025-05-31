import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import defineSuntime from "../utils/defineSuntime";
import { eveningIcon, nightIcon, morningIcon, dayIcon } from "../utils/icons";

const TopLeft = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, timezone, getLocationLocalTime, toLocalISOString } = context; // Pull out from context

    // To make it re-render every minute (tick time)
    const [, setTick] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setTick((x) => x + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    // Check screen width
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    let positionClasses = screenWidth >= 950 ? "absolute z-10 top-[10px] left-[10px]" : "pt-4 text-center mx-auto";
    let positionClassesTimeBox = screenWidth >= 950 ? "" : "justify-center";
    if (screenWidth < 500) positionClasses += " mb-10";

    // Get location date-time now (type: date string)
    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);

    // Get just location hours
    const locationHoursNow: number = new Date(locationDateTimeNow).getHours();

    // Define time of the day (word and icon)
    let dayTime: string = "";
    let icon;
    if (locationHoursNow >= 0 && locationHoursNow <= 5) {
        dayTime = "Night";
        icon = nightIcon;
    }
    if (locationHoursNow >= 6 && locationHoursNow <= 11) {
        dayTime = "Morning";
        icon = morningIcon;
    }
    if (locationHoursNow >= 12 && locationHoursNow <= 17) {
        dayTime = "Day";
        icon = dayIcon;
    }
    if (locationHoursNow >= 18 && locationHoursNow <= 23) {
        dayTime = "Evening";
        icon = eveningIcon;
    }

    // Get location hours-minutes string
    const time: string = `${new Date(locationDateTimeNow).getHours()}:${new Date(locationDateTimeNow)
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    // Get location date-time formatted string
    const dateTime: string = `${new Date(locationDateTimeNow).getDate()}/${
        new Date(locationDateTimeNow).getMonth() + 1
    }/${new Date(locationDateTimeNow).getFullYear().toString().slice(-2)}  ̶ ${time}`;

    // Define sunrise/sunset block
    const [sunword, sunTime, sunIn]: [string, string, string] = defineSuntime(
        toLocalISOString,
        locationDateTimeNow,
        weather,
        timezone
    );

    // Change time of the day and icon if it's past sunrise (from Night to Morning)
    if (sunword === "Sunset" && dayTime === "Night") {
        dayTime = "Morning";
        icon = morningIcon;
    }

    // ============================================================================================================

    return (
        <div data-name="TopLeft" className={`max-w-[1400px] mx-auto leading-none ${positionClasses}`}>
            {/* TITLE */}
            <h1 className="text-[20px] opacity-30 mb-[10px] transition-all duration-200 hover:opacity-100">Weather Control</h1>
            <div className={`flex items-center gap-x-[15px] mb-[10px] ${positionClassesTimeBox}`}>
                {/* TIME OF THE DAY */}
                <div title={`Good ${dayTime}, ${timezone?.country}!`}>{dayTime}</div>

                {/* ICON */}
                <div className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] move-and-rest">{icon}</div>

                {/* LOCATION TIME */}
                <div title={`Location date-time: ${dateTime}`}>
                    {time.split(":")[0]}
                    <span className="blink">:</span>
                    {time.split(":")[1]}
                </div>
            </div>

            {/* SUNRISE / SUNSET TIME */}
            <div className="flex items-center gap-x-[5px] opacity-30 text-[14px] transition-all duration-300 hover:opacity-100">
                <div>{sunword}:</div>
                <div title={sunTime}>{sunIn}</div>
            </div>
        </div>
    );
};

export default TopLeft;
