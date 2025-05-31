import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import SavedLocation from "./SavedLocation";

const SavedLocations = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { savedLocations } = context; // Pull out from context

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        // Check screen width
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let positionClasses = screenWidth >= 1200 ? "absolute top-[10px] right-[10px]" : "mx-auto mt-12";
    if (screenWidth < 1200) {
        document.querySelector("body")?.classList.remove("overflow-hidden");
    } else {
        document.querySelector("body")?.classList.add("overflow-hidden");
    }

    return (
        <div
            data-name="SavedLocations"
            className={`${positionClasses} max-w-[190px] w-[200px] z-[100] flex flex-col gap-y-[10px]`}
        >
            <div className="text-center opacity-70">Saved Locations:</div>
            {savedLocations &&
                savedLocations.length > 0 &&
                savedLocations.map((location, i) => <SavedLocation location={location} key={i} />)}
        </div>
    );
};

export default SavedLocations;
