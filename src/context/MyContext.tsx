import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

export interface WeatherObject {
    temp: number;
    weathercode: number;
    winddirection: number;
    windspeed: number;
    elevation: number;
    fetchedAt: {
        date: string;
        fullTime: Date;
        hoursMinutes: string;
    };

    daily: any;
    daily_units: any;
    hourly: any;
    hourly_units: any;
}

export interface TimezoneObject {
    continent: string;
    country: string;
    city: string;
    flag: string;
    timezone: {
        name: string;
        now_in_dst: number;
        offset_sec: number;
        offset_string: string;
        short_name: string;
    };
    coords: {
        lat: number;
        lng: number;
    };
    fetchedAt: {
        date: string;
        fullTime: Date;
        hoursMinutes: string;
    };
    sun: {
        rise: {
            apparent: number;
            astronomical: number;
            civil: number;
            nautical: number;
        };
        set: {
            apparent: number;
            astronomical: number;
            civil: number;
            nautical: number;
        };
    };
}

export interface SavedLocationProps {
    localTime: string;
    localDateTime: string;
    cityName: string;
    country: string;
    temp: string;
    icon: string;
    coords: [string, string];
    feelsLikeTemp: string;
    description: string;
}

// Define context value type
interface MyContextType {
    coords: [number, number];
    setCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
    weather: WeatherObject | null;
    setWeather: React.Dispatch<React.SetStateAction<WeatherObject | null>>;
    timezone: TimezoneObject | null;
    setTimezone: React.Dispatch<React.SetStateAction<TimezoneObject | null>>;
    getLocationLocalTime: (offsetSeconds: number) => Date;
    toLocalISOString: (date: Date) => string;
    formatDuration: (seconds: number) => string;
    tempUnits: string;
    setTempUnits: React.Dispatch<React.SetStateAction<string>>;
    savedLocations: SavedLocationProps[] | null;
    setSavedLocations: React.Dispatch<React.SetStateAction<SavedLocationProps[]>>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mapOpen: boolean;
    setMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
    localStoragePrimaryLocationKey: string;
    localStorageSavedLocationsKey: string;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide default value to createContext
const MyContext = createContext<MyContextType | undefined>(undefined);

// Define props type for context provider
interface ContextProviderProps {
    children: ReactNode;
}

// Context
export const ContextProvider = ({ children }: ContextProviderProps) => {
    const localStoragePrimaryLocationKey: string = "weather_primary_location";
    const localStorageSavedLocationsKey: string = "weather_saved_locations";
    const savedFromLS: string | null = localStorage.getItem(localStorageSavedLocationsKey);
    const primaryFromLS: string | null = localStorage.getItem(localStoragePrimaryLocationKey);

    const seattleCoords = [47.6061255, -122.3321268];

    const [coords, setCoords] = useState<[number, number]>(primaryFromLS ? JSON.parse(primaryFromLS) : seattleCoords);
    const [weather, setWeather] = useState<WeatherObject | null>(null);
    const [timezone, setTimezone] = useState<TimezoneObject | null>(null);
    const [tempUnits, setTempUnits] = useState<string>("C"); // C for Celsius, F for Fahrenheit
    const [savedLocations, setSavedLocations] = useState<SavedLocationProps[]>(savedFromLS ? JSON.parse(savedFromLS) : []);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [mapOpen, setMapOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Get location local time
    const getLocationLocalTime = (offsetSeconds: number): Date => {
        if (!offsetSeconds) return new Date();
        const nowUTC = new Date();
        const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
        return new Date(utcMillis + offsetSeconds * 1000);
    };

    // Format to local ISO like string
    const toLocalISOString = (date: Date): string => {
        const padIt = (num: number) => num.toString().padStart(2, "0");
        const year = date.getFullYear();
        const month = padIt(date.getMonth() + 1);
        const day = padIt(date.getDate());
        const hour = padIt(date.getHours());
        const minute = padIt(date.getMinutes());
        const second = padIt(date.getSeconds());
        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    };

    // Format sunshine/daylight duration
    const formatDuration = (seconds: number): string => {
        const totalMinutes = Math.floor(seconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <MyContext.Provider
            value={{
                coords,
                setCoords,
                weather,
                setWeather,
                timezone,
                setTimezone,
                getLocationLocalTime,
                toLocalISOString,
                formatDuration,
                tempUnits,
                setTempUnits,
                savedLocations,
                setSavedLocations,
                modalOpen,
                setModalOpen,
                localStoragePrimaryLocationKey,
                localStorageSavedLocationsKey,
                mapOpen,
                setMapOpen,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
