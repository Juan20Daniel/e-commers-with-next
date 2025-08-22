'use client';
import { useState } from "react";

interface Props {

    defaultCant?: number;
}

export const QuantitySelector = ({defaultCant}:Props) => {
    const [ counter, setCounter ] = useState(defaultCant??1);

    const imcrement = () => {
        setCounter(counter+1);
    }
    const decrement = () => {
        setCounter(Math.max(1, counter-1));
    }
    return (
        
        <div className="flex flex-row gap-1 h-full">
            <button onClick={decrement} className="w-[30px] h-auto flex items-center justify-center bg-gray-100 rounded cursor-pointer transition-all active:bg-gray-200">
                -
            </button>
            <div className="w-[60px] h-full bg-gray-100 flex justify-center items-center rounded select-none">
                <p className='font-bold'>{counter}</p>
            </div>
            <button onClick={imcrement} className="w-[30px] h-full flex items-center justify-center bg-gray-100 rounded cursor-pointer transition-all active:bg-gray-200">
                +
            </button>
        </div>
    )
}
