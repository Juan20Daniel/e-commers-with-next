import clsx from "clsx";

interface Props {
    children:React.ReactNode;
    enableBtn:boolean;
    action:() => void;
}
export const BoxBtn = ({children, enableBtn, action}:Props) => {
    return (
        <li className="page-item flex items-center">
            <button
                type="button"
                onClick={() => action()} 
                className={
                    clsx("px-2 h-[28px] flex justify-center items-center rounded bg-transparent cursor-pointer transition-all duration-300 hover:text-gray-800 focus:shadow-none",
                        "sm:px-3",
                        enableBtn ? "text-gray-500 pointer-events-none" : "text-gray-800 hover:bg-gray-200"
                    )
                } 
            >
                {children}
            </button>
        </li>
    );
}