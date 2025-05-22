const TopLeft = () => {
    const dayTime = `Night`;
    const dateTime = `22/05/2025  ̶ 04:50`;
    const time = `04:50`;
    const sunriseTime = `At 7:46`;
    const sunriseIn = `in 9 hours`;

    return (
        <div className="max-w-[1400px] mx-auto absolute z-10 top-[10px] left-[10px] leading-none">
            {/* TITLE */}
            <h1
                className="text-[20px] opacity-30 mb-[10px] transition-all duration-200 hover:opacity-100
"
            >
                Weather Control
            </h1>
            <div className="flex items-center gap-x-[15px] mb-[10px]">
                {/* TIME OF THE DAY */}
                <div>{dayTime}</div>

                {/* ICON */}
                <div className="w-[20px] h-[20px] max-w-[20px] max-h-[20px] move-and-rest">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="sun-horizon" className="fill-white">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M77.74854,43.58691a8.00009,8.00009,0,0,1,14.78222-6.123l7.65332,18.47754a8.00009,8.00009,0,1,1-14.78222,6.123ZM21.46387,108.53027l18.47754,7.65332a7.99964,7.99964,0,1,0,6.123-14.78125L27.58691,93.749a7.99964,7.99964,0,1,0-6.123,14.78125ZM213,116.79492a7.97082,7.97082,0,0,0,3.05859-.61133l18.47754-7.65332a7.99964,7.99964,0,1,0-6.123-14.78125l-18.47754,7.65332A8.001,8.001,0,0,0,213,116.79492ZM160.14551,66.39355a7.99266,7.99266,0,0,0,10.45263-4.3291l7.65332-18.47754a8.00009,8.00009,0,0,0-14.78222-6.123l-7.65332,18.47754A7.99929,7.99929,0,0,0,160.14551,66.39355ZM240,152H195.52319a68,68,0,1,0-135.04638,0H16a8,8,0,0,0,0,16H185.81812l.02905.00195L185.87085,168H240a8,8,0,0,0,0-16Zm-32,40H48a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16Z"></path>
                    </svg>
                </div>

                {/* TIME */}
                <div title={`Location date-time: ${dateTime}`}>
                    {time.split(":")[0]}
                    <span className="blink">:</span>
                    {time.split(":")[1]}
                </div>
            </div>

            {/* SUNRISE / SUNSET */}
            <div className="flex items-center gap-x-[5px] opacity-30 text-[14px] transition-all duration-300">
                <div>Sunrise:</div>
                <div title={sunriseTime}>{sunriseIn}</div>
            </div>
        </div>
    );
};

export default TopLeft;
