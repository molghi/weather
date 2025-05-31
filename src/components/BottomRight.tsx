import { useContext } from "react";
import ModalWindow from "./ModalWindow";
import ModalMap from "./ModalMap";
import MyContext from "../context/MyContext";

const BottomRight = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("MyContext must be used within a ContextProvider"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undef
    const { modalOpen, setModalOpen, mapOpen, setMapOpen } = context; // Pull out from context

    return (
        <div data-name="BottomRight">
            {/* CHANGE LOCATION */}
            <button
                className="fixed bottom-[10px] right-[10px] border border-white p-[10px] opacity-20 transition-all duration-300 hover:bg-white hover:opacity-100 hover:text-black hover:shadow-[0_0_7px_white]"
                style={{ zIndex: 100 }}
                onClick={() => setModalOpen(true)}
            >
                Change Location
            </button>

            {/* SEE WORLD MAP */}
            <button
                className="fixed bottom-[18px] right-[180px] p-0 m-0 border-none opacity-20 w-[20px] transition-all duration-300 hover:opacity-100"
                title="Show world map"
                style={{ zIndex: 100 }}
                onClick={() => setMapOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white">
                    <path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"></path>
                </svg>
            </button>

            {/* MODAL WINDOW WITH CITY SEARCH */}
            {modalOpen && (
                <ModalWindow>
                    <div>
                        <div
                            onClick={() => setModalOpen(false)}
                            className="absolute flex justify-center items-center top-[7px] right-[7px] max-w-[26px] w-full bg-white cursor-pointer transition-all duration-300 hover:opacity-70"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="max-w-[20px]">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                            </svg>
                        </div>
                    </div>
                </ModalWindow>
            )}

            {/* MODAL WINDOW WITH WORLD MAP */}
            {mapOpen && (
                <ModalMap>
                    <div>
                        <div
                            onClick={() => setMapOpen(false)}
                            className="absolute flex justify-center items-center top-[7px] right-[7px] max-w-[26px] w-full bg-white cursor-pointer transition-all duration-300 hover:opacity-70"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="max-w-[20px]">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                            </svg>
                        </div>
                    </div>
                </ModalMap>
            )}
        </div>
    );
};

export default BottomRight;
