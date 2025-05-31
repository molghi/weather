import WeatherTop from "./WeatherTop";
import WeatherMiddle from "./WeatherMiddle";
import WeatherHourly from "./WeatherHourly";
import WeatherDaily from "./WeatherDaily";
import { useState, useEffect } from "react";

const Weather = () => {
    const [, setTick] = useState(0); // To make it re-render every 10 minutes
    useEffect(() => {
        const timer = setInterval(() => setTick((x) => x + 1), 1000 * 60 * 10);
        return () => clearInterval(timer);
    }, []);

    return (
        <div data-name="Weather" className="max-w-[1000px] mx-auto [@media(max-width:1020px)]:px-6">
            <WeatherTop />
            <WeatherMiddle />
            <WeatherHourly />
            <WeatherDaily />
        </div>
    );
};

export default Weather;
