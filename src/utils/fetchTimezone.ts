import { Dispatch, SetStateAction } from "react";
import { TimezoneObject } from "../context/MyContext";

async function fetchTimezone(
    coordsArr: [number, number],
    setTimezone: Dispatch<SetStateAction<TimezoneObject | null>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
) {
    try {
        const [lat, lng] = coordsArr;

        const API_KEY = import.meta.env.VITE_TIMEZONE_API_KEY;

        const API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`;

        // Set loading spinner to true (show)
        setIsLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
            console.error("💥💥💥 Timezone fetch response not OK:", response.status, response.statusText);
            throw new Error("💥💥💥 Failed to fetch the timezone");
        }

        const data = await response.json();

        // Compose result object
        const myObj = {
            continent: data.results[0].components.continent,
            country: data.results[0].components.country,
            city: data.results[0].components.city,
            flag: data.results[0].annotations.flag,
            sun: data.results[0].annotations.sun,
            timezone: data.results[0].annotations.timezone,
            coords: data.results[0].geometry,
            fetchedAt: {
                fullTime: new Date(),
                hoursMinutes: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, "0")}`,
                date: `${new Date().getDate().toString().padStart(2, "0")}/${(new Date().getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${new Date().getFullYear()}`,
            },
        };

        // Update state
        setTimezone(myObj);

        return myObj.timezone.name;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default fetchTimezone;
