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

    return (
        <MyContext.Provider value={{ coords, setCoords, weather, setWeather, timezone, setTimezone }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
