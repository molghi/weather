import { SavedLocationProps } from "../context/MyContext";

// Add currently shown location to your list
const addToSaved = (
    locationDateTimeNow: Date,
    dateTime: string,
    icon: string,
    weatherFeelsLike: number,
    description: string,
    weather: any,
    timezone: any,
    savedLocations: SavedLocationProps[] | null,
    setSavedLocations: React.Dispatch<React.SetStateAction<SavedLocationProps[]>>,
    localStorageSavedLocationsKey: string
) => {
    // Get city name
    const cityName: string = timezone?.city ?? "";

    // Compose location object
    const locationObj: SavedLocationProps = {
        localTime:
            `${new Date(locationDateTimeNow).getHours()}:${new Date(locationDateTimeNow)
                .getMinutes()
                .toString()
                .padStart(2, "0")}` ?? "",
        localDateTime: dateTime,
        cityName: cityName,
        country: timezone?.country ?? "",
        temp: Math.round(weather?.temp ?? 0) + "",
        icon: icon ?? "",
        coords: [String(timezone?.coords.lat ?? 0), String(timezone?.coords.lng ?? 0)],
        feelsLikeTemp: weatherFeelsLike.toString() ?? "",
        description: description ?? "",
    };

    // Check if location was already added before: if so, do not add but update
    if (savedLocations?.map((x) => x.cityName).includes(cityName)) {
        setSavedLocations((prev) => {
            const newSavedLocations = prev.map((locObj) => {
                if (locObj.cityName === cityName) {
                    locObj.localTime = locationObj.localTime;
                    locObj.localDateTime = locationObj.localDateTime;
                    locObj.temp = locationObj.temp;
                    locObj.icon = locationObj.icon;
                    locObj.feelsLikeTemp = locationObj.feelsLikeTemp;
                    locObj.description = locationObj.description;
                }
                return locObj;
            });
            localStorage.setItem(localStorageSavedLocationsKey, JSON.stringify(newSavedLocations));
            return newSavedLocations;
        });
        return;
    }

    // User cannot have more than 12 saved locations
    if (savedLocations && savedLocations.length === 12)
        return window.alert("You cannot have more than 12 saved locations.\nRemove one to add another.");

    // Add location: Update state and local storage
    setSavedLocations((prev) => {
        const newSavedLocations = [...prev, locationObj];
        localStorage.setItem(localStorageSavedLocationsKey, JSON.stringify(newSavedLocations));
        return newSavedLocations;
    });
};

export default addToSaved;
