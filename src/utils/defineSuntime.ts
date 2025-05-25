import { DateTime } from "luxon";

function defineSuntime(toLocalISOString: any, locationDateTimeNow: any, weather: any, timezone: any): [string, string, string] {
    try {
        // Convert location date-time to ISO like string
        const localISOString = toLocalISOString(locationDateTimeNow);

        // console.log(timezone, weather);
        // console.clear();

        if (!timezone && !weather) return ["", "", ""];

        // Get the index of now in weather.daily
        const indexNowInDaily = weather
            ? weather.daily.time.findIndex((timeStr: string) => timeStr.startsWith(localISOString.slice(0, 10)))
            : -1;

        let sunword: string = "";
        let sunTime: string = "";
        let sunIn: string = "";

        let nowTimestamp: number = Date.now() + timezone?.timezone.offset_sec * 1000;
        nowTimestamp -= 1000 * 60 * 60 * 3; // Subtract my offset

        let sunriseTimestamp: number = DateTime.fromISO(weather.daily.sunrise[indexNowInDaily], {
            zone: timezone.timezone.name,
        }).toMillis();

        // console.log(sunriseTimestamp);
        // console.log(new Date(sunriseTimestamp));

        let sunsetTimestamp: number = DateTime.fromISO(weather.daily.sunset[indexNowInDaily], {
            zone: timezone.timezone.name,
        }).toMillis();

        if (sunriseTimestamp - nowTimestamp > 0) {
            // Show Sunrise
            sunword = "Sunrise";
            // let sunriseDateString: Date = new Date(weather ? new Date(weather.daily.sunrise[indexNowInDaily]) : -1);
            let sunriseDateString: Date = new Date(sunriseTimestamp);
            let hoursTillSunrise: number = Math.trunc((sunriseTimestamp - nowTimestamp) / 1000 / 60 / 60);
            sunTime = `At ${sunriseDateString.getHours()}:${sunriseDateString.getMinutes().toString().padStart(2, "0")}`; // Title attr value
            sunIn = `in ${hoursTillSunrise} ${hoursTillSunrise === 1 ? "hour" : "hours"}`; // Visible value

            // Case: there are minutes till sunrise (less than an hour)
            if (hoursTillSunrise === 0) {
                let minutesTillSunrise: number = Math.trunc((sunriseTimestamp - nowTimestamp) / 1000 / 60);
                sunIn = `in ${minutesTillSunrise} ${minutesTillSunrise === 1 ? "minute" : "minutes"}`;
            }
        } else {
            // Show Sunset
            sunword = "Sunset";
            // let sunsetDateString: Date = new Date(timezone ? timezone.sun.set.apparent * 1000 : -1);
            let sunsetDateString: Date = new Date(sunsetTimestamp);
            // let sunsetTimestamp: number = timezone ? timezone.sun.set.apparent * 1000 : -1;
            // console.log(sunsetTimestamp - nowTimestamp);
            let hoursTillSunset: number = Math.trunc((sunsetTimestamp - nowTimestamp) / 1000 / 60 / 60);
            sunTime = `At ${sunsetDateString.getHours()}:${sunsetDateString.getMinutes().toString().padStart(2, "0")}`;
            sunIn = `in ${hoursTillSunset} ${hoursTillSunset === 1 ? "hour" : "hours"}`;

            // Case: there are minutes till sunset (less than an hour)
            if (hoursTillSunset === 0) {
                let minutesTillSunset: number = Math.trunc((sunsetTimestamp - nowTimestamp) / 1000 / 60);
                sunIn = `in ${minutesTillSunset} ${minutesTillSunset === 1 ? "minute" : "minutes"}`;
            }
        }

        return [sunword, sunTime, sunIn];
    } catch (error) {
        console.error(error);
        return ["", "", ""];
    }
}

export default defineSuntime;
