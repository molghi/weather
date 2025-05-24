import { useContext } from "react";
import MyContext from "../context/MyContext";

const UpdatedAt = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather } = context;

    const dateTime = `${weather?.fetchedAt.date} at ${weather?.fetchedAt.hoursMinutes}`;
    const time = `${weather?.fetchedAt.hoursMinutes}`;

    return (
        <div
            data-name="UpdatedAt"
            style={{ zIndex: 100 }}
            className="opacity-20 text-[14px] absolute bottom-[10px] left-[10px]"
            title={`Updated at ${dateTime} (your local time)`}
        >
            <span>Updated at</span> <span>{time}</span>
        </div>
    );
};

export default UpdatedAt;
