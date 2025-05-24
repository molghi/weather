import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";

const eveningIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        id="sun-horizon"
        className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] fill-white"
    >
        <rect width="256" height="256" fill="none"></rect>
        <path d="M77.74854,43.58691a8.00009,8.00009,0,0,1,14.78222-6.123l7.65332,18.47754a8.00009,8.00009,0,1,1-14.78222,6.123ZM21.46387,108.53027l18.47754,7.65332a7.99964,7.99964,0,1,0,6.123-14.78125L27.58691,93.749a7.99964,7.99964,0,1,0-6.123,14.78125ZM213,116.79492a7.97082,7.97082,0,0,0,3.05859-.61133l18.47754-7.65332a7.99964,7.99964,0,1,0-6.123-14.78125l-18.47754,7.65332A8.001,8.001,0,0,0,213,116.79492ZM160.14551,66.39355a7.99266,7.99266,0,0,0,10.45263-4.3291l7.65332-18.47754a8.00009,8.00009,0,0,0-14.78222-6.123l-7.65332,18.47754A7.99929,7.99929,0,0,0,160.14551,66.39355ZM240,152H195.52319a68,68,0,1,0-135.04638,0H16a8,8,0,0,0,0,16H185.81812l.02905.00195L185.87085,168H240a8,8,0,0,0,0-16Zm-32,40H48a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16Z"></path>
    </svg>
);

const nightIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] fill-white"
    >
        <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
    </svg>
);

const morningIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        id="sun-horizon"
        className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] fill-white"
    >
        <rect width="256" height="256" fill="none"></rect>
        <path d="M77.74854,43.58691a8.00009,8.00009,0,0,1,14.78222-6.123l7.65332,18.47754a8.00009,8.00009,0,1,1-14.78222,6.123ZM21.46387,108.53027l18.47754,7.65332a7.99964,7.99964,0,1,0,6.123-14.78125L27.58691,93.749a7.99964,7.99964,0,1,0-6.123,14.78125ZM213,116.79492a7.97082,7.97082,0,0,0,3.05859-.61133l18.47754-7.65332a7.99964,7.99964,0,1,0-6.123-14.78125l-18.47754,7.65332A8.001,8.001,0,0,0,213,116.79492ZM160.14551,66.39355a7.99266,7.99266,0,0,0,10.45263-4.3291l7.65332-18.47754a8.00009,8.00009,0,0,0-14.78222-6.123l-7.65332,18.47754A7.99929,7.99929,0,0,0,160.14551,66.39355ZM240,152H195.52319a68,68,0,1,0-135.04638,0H16a8,8,0,0,0,0,16H185.81812l.02905.00195L185.87085,168H240a8,8,0,0,0,0-16Zm-32,40H48a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16Z"></path>
    </svg>
);

const dayIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] fill-white"
    >
        <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
    </svg>
);

/*
TO DO HERE:

- MAKE SUNRISE/SUNSET TIME DYNAMIC
*/

const TopLeft = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather, timezone, getLocationLocalTime, toLocalISOString } = context;

    const [, setTick] = useState(0); // To make it re-render every minute
    useEffect(() => {
        const timer = setInterval(() => setTick((x) => x + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    // Get location date-time now (date string)
    const locationDateTimeNow: Date = getLocationLocalTime(timezone ? timezone.timezone.offset_sec : 0);

    // Get just location hours
    const locationHoursNow: number = new Date(locationDateTimeNow).getHours();
    // Define time of the day
    let dayTime: string = "";
    switch (locationHoursNow) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            dayTime = "Night";
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            dayTime = "Morning";
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            dayTime = "Day";
            break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            dayTime = "Evening";
            break;
    }

    // Get location hours-minutes
    const time: string = `${new Date(locationDateTimeNow).getHours()}:${new Date(locationDateTimeNow)
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    // Get location date-time formatted string
    const dateTime: string = `${new Date(locationDateTimeNow).getDate()}/${(new Date(locationDateTimeNow).getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${new Date(locationDateTimeNow).getFullYear()}  ̶ ${time}`;

    // Define sunrise
    const localISOString = toLocalISOString(locationDateTimeNow);
    const indexNowInDaily = weather
        ? weather.daily.time.findIndex((timeStr: string) => timeStr.startsWith(localISOString.slice(0, 10)))
        : -1;
    let sunword = "Sunrise";
    // let sunriseDateString: Date = new Date(timezone ? timezone.sun.rise.apparent * 1000 : -1);
    let sunriseDateString: Date = new Date(weather ? new Date(weather.daily.sunrise[indexNowInDaily]) : -1);
    // let sunriseTimestamp: number = timezone ? timezone.sun.rise.apparent * 1000 : -1;
    let sunriseTimestamp: number = weather ? new Date(weather.daily.sunrise[indexNowInDaily]).getTime() : -1;
    let nowTimestamp: number = Date.now();
    let hoursTillSunrise: number = Math.trunc((sunriseTimestamp - nowTimestamp) / 1000 / 60 / 60);
    let sunTime: string = `At ${sunriseDateString.getHours()}:${sunriseDateString.getMinutes().toString().padStart(2, "0")}`; // Title attr value
    let sunIn: string = `in ${hoursTillSunrise} ${hoursTillSunrise === 1 ? "hour" : "hours"}`; // Visible value

    // FIX THAT:
    if (hoursTillSunrise === 0) sunIn = "in less than an hour";

    // If it is past sunrise, change to sunset
    if (sunriseTimestamp - nowTimestamp < 0) {
        sunword = "Sunset";
        let sunsetDateString: Date = new Date(timezone ? timezone.sun.set.apparent * 1000 : -1);
        let sunsetTimestamp: number = timezone ? timezone.sun.set.apparent * 1000 : -1;
        let hoursTillSunset: number = Math.trunc((sunsetTimestamp - nowTimestamp) / 1000 / 60 / 60);
        sunTime = `At ${sunsetDateString.getHours()}:${sunsetDateString.getMinutes()}`;
        sunIn = `in ${hoursTillSunset} ${hoursTillSunset === 1 ? "hour" : "hours"}`;

        // FIX THAT:
        if (hoursTillSunset === 0) sunIn = "in less than an hour";
    }

    // Define time of the day icon
    let icon;
    if ((locationHoursNow >= 0 && locationHoursNow < 6) || locationHoursNow === 24) icon = nightIcon;
    if (locationHoursNow >= 6 && locationHoursNow < 12) icon = morningIcon;
    if (locationHoursNow >= 12 && locationHoursNow < 18) icon = dayIcon;
    if (locationHoursNow >= 18 && locationHoursNow <= 23) icon = eveningIcon;

    return (
        <div data-name="TopLeft" className="max-w-[1400px] mx-auto absolute z-10 top-[10px] left-[10px] leading-none">
            {/* TITLE */}
            <h1
                className="text-[20px] opacity-30 mb-[10px] transition-all duration-200 hover:opacity-100
"
            >
                Weather Control
            </h1>
            <div className="flex items-center gap-x-[15px] mb-[10px]">
                {/* TIME OF THE DAY */}
                <div>{dayTime}</div>

                {/* ICON */}
                <div className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] move-and-rest">{icon}</div>

                {/* TIME */}
                <div title={`Location date-time: ${dateTime}`}>
                    {time.split(":")[0]}
                    <span className="blink">:</span>
                    {time.split(":")[1]}
                </div>
            </div>

            {/* SUNRISE / SUNSET */}
            <div className="flex items-center gap-x-[5px] opacity-30 text-[14px] transition-all duration-300">
                <div>{sunword}:</div>
                <div title={sunTime}>{sunIn}</div>
            </div>
        </div>
    );
};

export default TopLeft;
