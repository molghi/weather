import { ReactNode } from "react";

const ModalMap = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div
                className="absolute top-0 left-0 z-50 bg-black/80 w-full h-full flex items-center justify-center px-5"
                style={{ zIndex: 1000 }}
            >
                <div
                    className="relative w-[1000px] h-[650px] flex items-center justify-center bg-black px-[10px] py-[70px] text-center border border-gray-500"
                    style={{ zIndex: 1000 }}
                >
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ModalMap;
