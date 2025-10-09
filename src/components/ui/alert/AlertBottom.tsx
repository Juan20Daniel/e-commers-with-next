import { useAlertsStore } from "@/store/ui/alerts-store";
import clsx from "clsx";

export const AlertBottom = () => {
    const { visible, type, title, message, subMessage, confirmAction, close } = useAlertsStore(state => state);
    return (
        <>
            {(visible && type !== 'alert-message-top') && <div className="fixed top-0 left-0 z-5 w-screen h-screen bg-[#0000003a]" />}
            {(visible && type !== 'alert-message-top') && <div onClick={() => close()} className="fixed top-0 left-0 z-6 w-screen h-screen backdrop-blur-[2px]" />}
            <div
                onClick={() => close()}
                className={
                    clsx("fixed z-7 bottom-[-400px] w-full flex justify-center transition-all duration-300 transform",
                        (visible && type !== 'alert-message-top') && "translate-y-[-450px]"
                    )
                }
            >
                <div onClick={(e) => e.stopPropagation()} className="min-w-[200px] max-w-[500px] w-full mx-[10px] bg-white rounded-3xl flex flex-col p-5">
                    <span className="font-bold text-lg sm:text-2xl pb-2">{title}</span>
                    <p className={clsx("text-sm sm:text-base", subMessage ? 'pb-2' : 'pb-3')}>{message}</p>
                    {subMessage && <p className="text-sm sm:text-base pb-3 text-gray-600">{subMessage}</p>}
                    <div className="flex flex-row gap-4 justify-end">
                        {(type === 'alert-message-bottom') &&
                            <button onClick={() => close()} className="bg-blue-500 px-6 py-1 rounded-3xl cursor-pointer text-white active:bg-blue-400 transition-all">
                                Ok
                            </button>
                        }
                         {(type === 'alert-confirm') &&
                            <>
                                <button onClick={() => close()} className="bg-white px-6 py-1 rounded-3xl cursor-pointer shadow-xl text-black active:bg-gray-200 transition-all">
                                    No
                                </button>
                                <button onClick={() => {
                                    confirmAction && confirmAction()
                                }} className="bg-red-900 px-6 py-1 rounded-3xl cursor-pointer shadow-xl text-white active:bg-red-500 transition-all">
                                    Si
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}