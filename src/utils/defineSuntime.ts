import { DateTime } from "luxon";

function defineSuntime(toLocalISOString: any, locationDateTimeNow: any, weather: any, timezone: any): [string, string, string] {
    try {
        if (!timezone && !weather) return ["", "", ""];

        // Convert location date-time to ISO like string
        const localISOString: string = toLocalISOString(locationDateTimeNow);

        // Get the index of now in weather.daily
        const indexNowInDaily: number = weather
            ? weather.daily.time.findIndex((timeStr: string) => timeStr.startsWith(localISOString.slice(0, 10)))
            : -1;

        let sunword: string = ""; // sunset or sunrise
        let sunTime: string = ""; // title attr
        let sunIn: string = ""; // visible value

        // Get now timestamp
        // const nowTimestamp = DateTime.now().setZone(timezone.timezone.name).ts;
        const oneDayInMs: number = 86400000;
        const nowTimestamp = DateTime.now().setZone(timezone.timezone.name).toMillis();
        const dt3: any = DateTime.fromMillis(nowTimestamp, { zone: timezone.timezone.name });
        // console.log("now in", timezone.timezone.name, dt3.toFormat("yyyy-MM-dd HH:mm ZZZZ")); // formatted local time in that zone; output: now 2025-05-28 03:15 GMT+3

        const sunriseTimestamp = timezone.sun.rise.apparent * 1000;
        const dt: any = DateTime.fromMillis(sunriseTimestamp, { zone: timezone.timezone.name });
        // console.log("sunrise", dt.toFormat("yyyy-MM-dd HH:mm ZZZZ")); // formatted local time in that zone; output: sunrise 2025-05-28 05:38 GMT+3

        const sunsetTimestamp = timezone.sun.set.apparent * 1000;
        const dt2: any = DateTime.fromMillis(sunsetTimestamp, { zone: timezone.timezone.name });
        // console.log("sunset", dt2.toFormat("yyyy-MM-dd HH:mm ZZZZ")); // formatted local time in that zone; output: sunset 2025-05-28 20:26 GMT+3

        const showSunset = () => {
            sunword = "Sunset";
            let sunsetDateString: Date = new Date(sunsetTimestamp);
            let hoursTillSunset: number = Math.trunc((sunsetTimestamp - nowTimestamp) / 1000 / 60 / 60);
            let minutesTillSunset: number = Math.floor(
                (sunsetTimestamp - nowTimestamp - hoursTillSunset * 1000 * 60 * 60) / 1000 / 60
            );
            // sunTime = `in ${hoursTillSunset}h ${minutesTillSunset}m  ̶ at ${sunsetDateString.getHours()}:${sunsetDateString
            //     .getMinutes()
            //     .toString()
            //     .padStart(2, "0")}`; // Title attr value
            sunTime = `in ${hoursTillSunset}h ${minutesTillSunset}m${
                dt2.c ? `  ̶ at ${dt2.c.hour}:${dt2.c.minute.toString().padStart(2, "0")}` : ""
            }`;
            sunIn = `in ${hoursTillSunset} ${hoursTillSunset === 1 ? "hour" : "hours"}`; // Visible value

            // Case: there are minutes till sunset (less than an hour)
            if (hoursTillSunset === 0) {
                let minutesTillSunset: number = Math.trunc((sunsetTimestamp - nowTimestamp) / 1000 / 60);
                sunIn = `in ${minutesTillSunset} ${minutesTillSunset === 1 ? "minute" : "minutes"}`;
            }
        };

        const showSunrise = () => {
            sunword = "Sunrise";
            let sunriseDateString: Date = new Date(sunriseTimestamp);
            let hoursTillSunrise: number = Math.trunc((sunriseTimestamp - nowTimestamp) / 1000 / 60 / 60);
            let minutesTillSunrise: number = Math.floor(
                (sunriseTimestamp - nowTimestamp - hoursTillSunrise * 1000 * 60 * 60) / 1000 / 60
            );
            // sunTime = `in ${hoursTillSunrise}h ${minutesTillSunrise}m  ̶ at ${sunriseDateString.getHours()}:${sunriseDateString
            //     .getMinutes()
            //     .toString()
            //     .padStart(2, "0")}`; // Title attr value
            sunTime = `in ${hoursTillSunrise}h ${minutesTillSunrise}m${
                dt.c ? `  ̶ at ${dt.c.hour}:${dt.c.minute.toString().padStart(2, "0")}` : ""
            }`;
            sunIn = `in ${hoursTillSunrise} ${hoursTillSunrise === 1 ? "hour" : "hours"}`; // Visible value

            // Case: there are minutes till sunrise (less than an hour)
            if (hoursTillSunrise === 0) {
                let minutesTillSunrise: number = Math.trunc((sunriseTimestamp - nowTimestamp) / 1000 / 60);
                sunIn = `in ${minutesTillSunrise} ${minutesTillSunrise === 1 ? "minute" : "minutes"}`;
            }
        };

        const nextEvent = sunriseTimestamp < sunsetTimestamp ? sunriseTimestamp : sunsetTimestamp;

        // if ((nowTimestamp < sunriseTimestamp && sunriseTimestamp < sunsetTimestamp) || (sunsetTimestamp < nowTimestamp && sunriseTimestamp < sunsetTimestamp)) {
        //     showSunrise();
        // } else {
        //     showSunset();
        // }

        if (nowTimestamp < nextEvent) {
            if (sunriseTimestamp < sunsetTimestamp) {
                showSunrise();
            } else {
                showSunset();
            }
        } else {
            if (sunriseTimestamp > sunsetTimestamp) {
                showSunrise();
            } else {
                showSunset();
            }
        }

        return [sunword, sunTime, sunIn];
    } catch (error) {
        console.error(error);
        return ["", "", ""];
    }
}

export default defineSuntime;
