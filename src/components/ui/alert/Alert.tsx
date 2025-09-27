import { useAlertsStore } from "@/store/ui/alerts-store";
import clsx from "clsx";

export const Alert = () => {
    const { visible, title, message, subMessage, close } = useAlertsStore(state => state);
    return (
        <>
            {visible && <div className="fixed top-0 left-0 z-5 w-screen h-screen bg-[#0000003a]" />}
            {visible && <div onClick={() => close()} className="fixed top-0 left-0 z-6 w-screen h-screen backdrop-blur-[2px]" />}
            <div 
                onClick={() => close()}
                className={
                    clsx("fixed z-7 bottom-10 w-full flex justify-center transition-all duration-300 transform ",
                        !visible && "translate-y-[500px]"
                    )
                }
            >
                <div onClick={(e) => e.stopPropagation()} className="min-w-[200px] max-w-[500px] w-full mx-[10px] bg-white rounded-3xl flex flex-col p-5">
                    <span className="font-bold text-lg sm:text-2xl pb-2">{title}</span>
                    <p className={clsx("text-sm sm:text-base", subMessage ? 'pb-2' : 'pb-3')}>{message}</p>
                    {subMessage && <p className="text-sm sm:text-base pb-3 text-gray-600">{subMessage}</p>}
                    <div className="flex flex-row justify-end">
                        <button onClick={() => close()} className="bg-blue-500 px-6 py-1 rounded-3xl cursor-pointer text-white active:bg-blue-400 transition-all">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}