import { ReactNode, useState, useContext } from "react";
import MyContext from "../context/MyContext";
import ReactDOM from "react-dom";
import fetchWeatherByCityName from "../utils/fetchWeatherByCityName";
import fetchWeather from "../utils/fetchWeather";
import fetchTimezone from "../utils/fetchTimezone";

const ModalWindow = ({ children }: { children: ReactNode }) => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { setWeather, setTimezone, setModalOpen } = context;

    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null;

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setsearchResults] = useState<{ [key: string]: any }[]>([]); // type: array of objects

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(searchTerm);
        const results = await fetchWeatherByCityName(searchTerm);
        // console.log(results.results);
        setsearchResults(results.results);
    };

    // Fetch weather/timezone for a place
    const fetchForPlace = async (lat: number, lng: number) => {
        setModalOpen(false);
        await fetchWeather([lat, lng], setWeather);
        await fetchTimezone([lat, lng], setTimezone);
    };

    return ReactDOM.createPortal(
        <div
            className="absolute top-0 left-0 z-50 bg-black/80 w-full h-full flex items-center justify-center"
            style={{ zIndex: 1000 }}
        >
            <div className="bg-black max-w-[750px] h-[500px] px-[10px] py-[70px] w-full text-center border border-gray-500 relative z-[100]">
                <div className="text-white text-[34px] mb-[25px]">Search By City Name:</div>
                <form onSubmit={formSubmit} className="max-w-[400px] mx-auto relative">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        className="w-full text-[20px] p-[10px] cursor-pointer bg-transparent text-inherit font-inherit border border-white outline-none transition-shadow duration-300 focus:[box-shadow:0_0_10px_white]"
                        autoFocus
                    />
                    {/* RESULTS BOX BELOW */}
                    <div className="mt-[18px] w-full">
                        {searchResults.length > 0 &&
                            searchResults.map((result, i) => (
                                <div
                                    key={i}
                                    className="text-left whitespace-nowrap overflow-hidden w-full text-ellipsis px-[10px] py-[5px] cursor-pointer hover:bg-[rgba(128,128,128,0.35)]"
                                    data-lat={result.latitude}
                                    data-lng={result.longitude}
                                    data-timezone={result.timezone}
                                    title={`${result.name}, ${result.admin1}, ${result.country}`}
                                    onClick={() => fetchForPlace(result.latitude, result.longitude)}
                                >
                                    {result.name}, {result.admin1}, {result.country}
                                </div>
                            ))}
                    </div>
                </form>
                <div>{children}</div>
            </div>
        </div>,
        modalRoot
    );
};

export default ModalWindow;
