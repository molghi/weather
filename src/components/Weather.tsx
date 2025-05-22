import WeatherTop from "./WeatherTop";
import WeatherMiddle from "./WeatherMiddle";
import WeatherHourly from "./WeatherHourly";
import WeatherDaily from "./WeatherDaily";

const Weather = () => {
    return (
        <div>
            <div className="max-w-[1000px] mx-auto">
                <WeatherTop />
                <WeatherMiddle />
                {/* <WeatherHourly /> */}
                {/* <WeatherDaily /> */}
            </div>
        </div>
    );
};

export default Weather;
