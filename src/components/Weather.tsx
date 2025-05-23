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
        <div>
            <div className="max-w-[1000px] mx-auto">
                <WeatherTop />
                <WeatherMiddle />
                <WeatherHourly />
                <WeatherDaily />
            </div>
        </div>
    );
};

export default Weather;
