import { useState, useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
import fetchBgImage from "../utils/fetchBgImage";

const Backdrop = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { weather } = context;

    const [imgPath, setImgPath] = useState<string>(
        `https://images.unsplash.com/photo-1521858610775-94d578214499?crop=entropy&amp;cs=srgb&amp;fm=jpg&amp;ixid=M3w2NDgwNTh8MHwxfHNlYXJjaHw5MXx8Y2xvdWR5fGVufDB8MHx8fDE3NDgwNTU1ODN8MA&amp;ixlib=rb-4.1.0&amp;q=85`
    );

    const [, setTick] = useState(0); // To make it re-render every 5 minutes
    useEffect(() => {
        const timer = setInterval(() => setTick((x) => x + 1), 1000 * 60 * 5);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const weatherNow = document.title.split(" ").slice(-1).join("").toLowerCase();
        const getImage = async () => {
            const fetched = await fetchBgImage(weatherNow);
            setImgPath(fetched);
        };
        getImage();
    }, [weather]);

    return (
        <div data-name="Backdrop" className="relative transition-all duration-1000 fadeIn" style={{ zIndex: -100 }}>
            <img
                draggable="false"
                src={imgPath}
                className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 object-cover transition-all duration-1000 move"
                style={{ zIndex: -100 }}
            />
        </div>
    );
};

export default Backdrop;
