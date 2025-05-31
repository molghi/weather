import { useContext } from "react";
import MyContext from "../context/MyContext";

const UpdatedAt = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather } = context; // Pull out from context

    const dateTime = `${weather?.fetchedAt.date} at ${weather?.fetchedAt.hoursMinutes}`; // Title attr value
    const time = `${weather?.fetchedAt.hoursMinutes}`; // Visible value

    return (
        <div
            data-name="UpdatedAt"
            style={{ zIndex: 100 }}
            className="opacity-20 text-[14px] fixed bottom-[10px] left-[10px] transition-all duration-300 hover:opacity-100"
            title={`Updated at ${dateTime} (your local time)`}
        >
            {time && time !== "undefined" && (
                <>
                    <span>Updated at</span> <span>{time}</span>
                </>
            )}
        </div>
    );
};

export default UpdatedAt;
