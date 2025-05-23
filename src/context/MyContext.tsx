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
}

// Provide default value to createContext
const MyContext = createContext<MyContextType | undefined>(undefined);

// Define props type for context provider
interface ContextProviderProps {
    children: ReactNode;
}

// Context
export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [coords, setCoords] = useState<[number, number]>([41.0082, 28.9784]);
    const [weather, setWeather] = useState<WeatherObject | null>(null);
    const [timezone, setTimezone] = useState<TimezoneObject | null>(null);

    const getLocationLocalTime = (offsetSeconds: number): Date => {
        if (!offsetSeconds) return new Date();
        const nowUTC = new Date();
        const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
        return new Date(utcMillis + offsetSeconds * 1000);
    };

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
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
