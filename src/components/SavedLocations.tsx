import { useContext } from "react";
import MyContext from "../context/MyContext";
import SavedLocation from "./SavedLocation";

const SavedLocations = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { savedLocations } = context; // Pull out from context

    return (
        <div
            data-name="SavedLocations"
            className="absolute top-[10px] right-[10px] max-w-[190px] w-[200px] z-[100] flex flex-col gap-y-[10px]"
        >
            <div className="text-center opacity-70">Saved Locations:</div>
            {savedLocations &&
                savedLocations.length > 0 &&
                savedLocations.map((location, i) => <SavedLocation location={location} key={i} />)}
        </div>
    );
};

export default SavedLocations;
