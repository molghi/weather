import { ReactNode, useState, useContext } from "react";
import MyContext from "../context/MyContext";
import ReactDOM from "react-dom";
import fetchWeatherByCityName from "../utils/fetchWeatherByCityName";
import fetchWeather from "../utils/fetchWeather";
import fetchTimezone from "../utils/fetchTimezone";
import spinnerGif from "../img/spin2.png";

const ModalWindow = ({ children }: { children: ReactNode }) => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { setWeather, timezone, setTimezone, setModalOpen, setIsLoading } = context; // Pull out from context

    const [isLoadingSmall, setIsLoadingSmall] = useState<boolean>(false); // Small loading spinner

    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null;

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<{ [key: string]: any }[]>([]); // type: array of objects

    // On form submit
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingSmall(true);
        const results = await fetchWeatherByCityName(searchTerm);
        setIsLoadingSmall(false);
        setSearchResults(results.results);
    };

    // Fetch weather/timezone for a place
    const fetchForPlace = async (lat: number, lng: number) => {
        setModalOpen(false);
        const timezoneName: string = await fetchTimezone([lat, lng], setTimezone, setIsLoading);
        await fetchWeather([lat, lng], setWeather, setIsLoading, timezoneName);
    };

    return ReactDOM.createPortal(
        <div
            className="fixed top-0 left-0 z-50 bg-black/80 w-full h-full flex items-center justify-center"
            style={{ zIndex: 1000 }}
        >
            <div className="bg-black max-w-[750px] h-[500px] px-[10px] py-[70px] w-full text-center border border-gray-500 relative z-[100] [@media(max-width:800px)]:max-w-[93%]">
                <div className="text-white text-[34px] mb-[25px] [@media(max-width:450px)]:text-[25px]">Search By City Name:</div>
                {/* FORM */}
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
                        {/* SMALL LOADING SPINNER */}
                        {isLoadingSmall && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4">
                                <img src={spinnerGif} className="w-[200px]" style={{ animation: "spin 0.5s linear infinite" }} />
                            </div>
                        )}

                        {/* RESULTS */}
                        {searchResults &&
                            searchResults.length > 0 &&
                            searchResults.map((result, i) => (
                                <div
                                    key={i}
                                    className="text-left whitespace-nowrap overflow-hidden w-full text-ellipsis px-[10px] py-[5px] cursor-pointer hover:bg-[rgba(128,128,128,0.35)]"
                                    data-lat={result.latitude}
                                    data-lng={result.longitude}
                                    data-timezone={result.timezone}
                                    title={`${result.name}, ${result.admin1 ? result.admin1 + ", " : ""}${result.country}`}
                                    onClick={() => fetchForPlace(result.latitude, result.longitude)}
                                >
                                    {result.name}, {result.admin1 ? result.admin1 + ", " : ""}
                                    {result.country}
                                </div>
                            ))}
                    </div>
                </form>

                {/* CHILDREN ARE THE CLOSE BTN */}
                <div>{children}</div>
            </div>
        </div>,
        modalRoot
    );
};

export default ModalWindow;
