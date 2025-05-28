import { useState, useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
// import fetchBgImage from "../utils/fetchBgImage";
import springGif from "../img/spring.gif";
import summerGif from "../img/summer.gif";
import autumnGif from "../img/autumn.gif";
import winterGif from "../img/winter.gif";

const Backdrop = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { weather, timezone } = context; // Pull out from context

    const [imgPath, setImgPath] = useState<string>(springGif);

    useEffect(() => {
        const timeString = timezone?.fetchedAt?.fullTime;
        const monthNow = timeString ? new Date(timeString).getMonth() + 1 : null;
        if (!monthNow) return;
        // Define background gif img
        if (monthNow >= 3 && monthNow < 6) setImgPath(springGif);
        else if (monthNow >= 6 && monthNow < 9) setImgPath(summerGif);
        else if (monthNow >= 9 && monthNow < 12) setImgPath(autumnGif);
        else setImgPath(winterGif);
    }, [weather, timezone]);

    return (
        <div data-name="Backdrop" className="relative transition-all duration-1000 fadeIn" style={{ zIndex: -100 }}>
            <img
                draggable="false"
                src={imgPath}
                className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 object-cover transition-all duration-1000 dimmed"
                // move -- css class
                style={{ zIndex: -100 }}
            />
        </div>
    );
};

export default Backdrop;

/*
// const [imgPath, setImgPath] = useState<string>(
//     `https://images.unsplash.com/photo-1521858610775-94d578214499?crop=entropy&amp;cs=srgb&amp;fm=jpg&amp;ixid=M3w2NDgwNTh8MHwxfHNlYXJjaHw5MXx8Y2xvdWR5fGVufDB8MHx8fDE3NDgwNTU1ODN8MA&amp;ixlib=rb-4.1.0&amp;q=85`
// );


// const [, setTick] = useState(0); // To make it re-render every 5 minutes
// useEffect(() => {
//     const timer = setInterval(() => setTick((x) => x + 1), 1000 * 60 * 5);
//     return () => clearInterval(timer);
// }, []);


// const weatherNow = document.title.split(" ").slice(-1).join("").toLowerCase();
// const getImage = async () => {
//     const fetched = await fetchBgImage(weatherNow);
//     setImgPath(fetched);
// };
// getImage();
*/
