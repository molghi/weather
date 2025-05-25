import { Dispatch, SetStateAction } from "react";
import { WeatherObject } from "../context/MyContext";

async function fetchWeather(
    coordsArr: [number, number],
    setWeather: Dispatch<SetStateAction<WeatherObject | null>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
) {
    try {
        const hourlyParams = `temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,cloud_cover,visibility,wind_gusts_10m`;
        const dailyParams = `weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`;
        const timezoneParams = `Europe%2FIstanbul`;

        const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${coordsArr[0]}&longitude=${coordsArr[1]}&hourly=${hourlyParams}&daily=${dailyParams}&current_weather=true&past_days=7&timezone=${timezoneParams}`;

        setIsLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
            console.error("💥💥💥 Weather fetch response not OK:", response.status, response.statusText);
            throw new Error("💥💥💥 Failed to fetch the weather");
        }

        const data = await response.json();

        const myObj = {
            temp: data.current_weather.temperature,
            weathercode: data.current_weather.weathercode,
            winddirection: data.current_weather.winddirection,
            windspeed: data.current_weather.windspeed,
            daily: data.daily,
            daily_units: data.daily_units,
            elevation: data.elevation,
            hourly: data.hourly,
            hourly_units: data.hourly_units,
            fetchedAt: {
                fullTime: new Date(),
                hoursMinutes: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, "0")}`,
                date: `${new Date().getDate().toString().padStart(2, "0")}/${(new Date().getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${new Date().getFullYear()}`,
            },
        };

        setWeather(myObj);
        // return myObj;
    } catch (error) {
        console.error(error);
        throw error; // rethrowing the error to catch further up the chain
    }
}

export default fetchWeather;
