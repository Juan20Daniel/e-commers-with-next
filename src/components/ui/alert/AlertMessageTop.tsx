'use client';
import { useAlertsStore } from "@/store/ui/alerts-store";
import clsx from "clsx";
import { useEffect } from "react";

export const AlertMessageTop = () => {
    const { visible, type, message, close } = useAlertsStore(state => state);
    useEffect(() => {
        if(type === 'alert-message-top') {
            setTimeout(() => {
                close();
            }, 3000);
        }
    },[type]);
    return (
        <div
            className={
                clsx("fixed z-7 top-[60px] w-full px-[10px] flex justify-center transition-all duration-300 translate-y-[-300px] transform",
                    (visible && type === 'alert-message-top') && "translate-y-[0px]"
                )
            }
        >
            <div className="min-w-[200px] max-w-[500px] w-full bg-green-700 rounded-2xl flex flex-row shadow-2xl justify-between items-center p-3">
                <p className={clsx("text-sm text-white sm:text-base")}>{message}</p>
                <button onClick={() => close()} className="cursor-pointer py-1 px-3 rounded-2xl bg-green-800 text-white outline-0 active:bg-green-700 transition-all ml-1">
                    Cerrar
                </button>
            </div>
        </div>
    );
}