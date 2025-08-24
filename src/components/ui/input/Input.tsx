import { HTMLInputTypeAttribute } from "react";
import { IoClose } from "react-icons/io5";
import { InputError } from "@/interfaces/form-state.interface";
import './styles.css';
interface Props {
    id:string;
    label:string;
    type:HTMLInputTypeAttribute | undefined;
    value:string;
    max?:number;
    errorMessage?: string;
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({id,label,type,value,max,errorMessage,onChange}:Props) => {
    return (
        <div className="relative h-[66px]">
            <input 
                id={id} 
                name={id}
                value={value}
                type='text'
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                    if(type!=='number') return onChange(event);
                    if(!isNaN(Number(event.target.value))) {
                        onChange(event);
                    }
                }}
                maxLength={max}
                placeholder=" " 
                className="w-full py-2 pr-10 pl-4 rounded-md border-[1px] border-gray-400 peer outline-blue-600"
            />
            <label htmlFor={id} className="absolute left-[18px] top-[-14px] transition-all bg-white cursor-text
                peer-placeholder-shown:translate-y-[23px]
                peer-focus:translate-y-0 peer-focus:text-blue-800
            ">
                {label}
            </label>
            {(value !== '') && 
                <button className="absolute top-2 right-2 flex items-center justify-center rounded-3xl cursor-pointer w-[25px] h-[25px] transition-all bg-gray-300 active:bg-gray-100">
                    <IoClose className="h-[16px] w-[16px] text-black" />
                </button>
            }
            <div className="h-[24px]">
                {errorMessage && 
                    <p>{errorMessage}</p>
                }
            </div>
        </div>
    )
}
