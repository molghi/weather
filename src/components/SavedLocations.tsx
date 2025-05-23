import React from "react";

const SavedLocations = () => {
    const savedOnes = [
        {
            localTime: "6:06",
            cityName: "Istanbul",
            country: "Turkey",
            temp: "18°C",
            icon: "https://molghi.github.io/weatherapp/assets/icons/horizon.a471d7d512916708b4b5.svg",
            coords: ["41.01", "28.95"],
            feelsLikeTemp: "Feels like 19°C",
            description: "Clear sky",
        },
        {
            localTime: "6:06",
            cityName: "Santiago",
            country: "Chile",
            temp: "18°C",
            icon: "https://molghi.github.io/weatherapp/assets/icons/horizon.a471d7d512916708b4b5.svg",
            coords: ["33.44", "70.65"],
            feelsLikeTemp: "Feels like 19°C",
            description: "Clear sky",
        },
        {
            localTime: "6:06",
            cityName: "Seattle",
            country: "United States",
            temp: "18°C",
            icon: "https://molghi.github.io/weatherapp/assets/icons/horizon.a471d7d512916708b4b5.svg",
            coords: ["47.60", "122.33"],
            feelsLikeTemp: "Feels like 19°C",
            description: "Clear sky",
        },
        {
            localTime: "6:06",
            cityName: "Aberdeen",
            country: "Scotland",
            temp: "18°C",
            icon: "https://molghi.github.io/weatherapp/assets/icons/horizon.a471d7d512916708b4b5.svg",
            coords: ["57.15", "2.11"],
            feelsLikeTemp: "Feels like 19°C",
            description: "Clear sky",
        },
        {
            localTime: "6:06",
            cityName: "Munich",
            country: "Germany",
            temp: "18°C",
            icon: "https://molghi.github.io/weatherapp/assets/icons/horizon.a471d7d512916708b4b5.svg",
            coords: ["48.14", "11.57"],
            feelsLikeTemp: "Feels like 19°C",
            description: "Clear sky",
        },
        {
            localTime: "6:06",
            cityName: "Arkhangelsk",
            country: "Russia",
            temp: "18°C",
            icon: "https://molghi.github.io/weatherapp/assets/icons/horizon.a471d7d512916708b4b5.svg",
            coords: ["64.54", "40.53"],
            feelsLikeTemp: "Feels like 19°C",
            description: "Clear sky",
        },
    ];

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        const target = e.target as HTMLElement; // type assertion: treat generic e.target as HTMLElement
        if (target.tagName !== "BUTTON") {
            console.log("fetch weather from this loc");
        }
    };

    return (
        <div>
            <div className="absolute top-[10px] right-[10px] max-w-[200px] w-[200px] z-[100] flex flex-col gap-y-[10px]">
                <div className="text-center opacity-70">Saved Locations:</div>
                {savedOnes.map((loc, i) => (
                    <div
                        key={i}
                        onClick={handleClick}
                        className="relative flex items-center justify-between gap-x-[10px] bg-white/10 opacity-60 transition-all duration-300 rounded-[15px] px-[15px] py-[5px] cursor-pointer hover:backdrop-blur-sm location"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        data-coords={`${loc.coords[0]},${loc.coords[1]}`}
                    >
                        <button
                            onClick={() => console.log(`remove saved location`)}
                            className="absolute top-[15px] left-[-53px] text-[14px] inline-block opacity-0 invisible p-0 pr-[10px] border-0 hover:underline"
                        >
                            Remove
                        </button>
                        <div>
                            <div className="text-[13px] mb-[2px]">{loc.localTime}</div>
                            <div
                                className="text-[13px] whitespace-nowrap max-w-[60px] overflow-hidden overflow-ellipsis"
                                title={`${loc.cityName}, ${loc.country}`}
                            >
                                {loc.cityName}
                            </div>
                        </div>
                        <div className="basis-[40px] flex-shrink-0 flex-grow-0 max-w-[40px]" title={loc.description}>
                            <img className="max-w-full" src={loc.icon} />
                        </div>
                        <div className="text-[20px]" title={loc.feelsLikeTemp}>
                            {loc.temp}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedLocations;
