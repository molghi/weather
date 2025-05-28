import { TimezoneObject, SavedLocationProps } from "../context/MyContext";

const updateSavedLocations = (
    weatherMain: number,
    time: string,
    dateTime: string,
    icon: string,
    weatherFeelsLike: number,
    description: string,
    coords: [number, number],
    timezone: TimezoneObject | null,
    setSavedLocations: React.Dispatch<React.SetStateAction<SavedLocationProps[]>>,
    localStorageSavedLocationsKey: string
) => {
    if (coords && coords.length > 0) {
        setSavedLocations((prev) => {
            const newLocs = prev.map((loc) => {
                const locationInSavedList = [Number(loc.coords[0]).toFixed(2), Number(loc.coords[1]).toFixed(2)];
                const locationShown = [Number(timezone?.coords.lat).toFixed(2), Number(timezone?.coords.lng).toFixed(2)];
                if (locationInSavedList[0] === locationShown[0] && locationInSavedList[1] === locationShown[1]) {
                    return {
                        ...loc,
                        localTime: time,
                        localDateTime: dateTime,
                        temp: weatherMain.toString(),
                        icon,
                        feelsLikeTemp: weatherFeelsLike.toString(),
                        description,
                    };
                }
                return loc;
            });

            localStorage.setItem(localStorageSavedLocationsKey, JSON.stringify(newLocs));

            return newLocs;
        });
    }
};

export default updateSavedLocations;
