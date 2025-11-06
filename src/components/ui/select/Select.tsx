'use client'
import { Option } from '@/interfaces/select-option.interface';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface Props {
    state: string;
    options: Option[];
    label: string;
    defaultOption?:string;
    isRequired: boolean;
    setState: Dispatch<SetStateAction<string>>;
}

export const Select = ({
    state, 
    options:initialState,
    label,
    isRequired=false,
    defaultOption='',
    setState
}:Props) => {
    const [ options, setOptions ] = useState(initialState);
    const [ showOptions, setShowOptions ] = useState(false);
    const elementRef = useRef<HTMLDivElement|null>(null);
    useEffect(() => {
        document.addEventListener('mousedown', hideOptions);
        return () => {
            document.removeEventListener('mousedown', hideOptions);
        }
    },[]);
    useEffect(() => {
        setOptions(options.sort((a,b) => {
            if(a.isSelected < b.isSelected) {
                return 1
            } 
            if(a.isSelected > b.isSelected) {
                return -1;
            } 
            return 0
        }))
    },[options]);
    useEffect(() => {
        if(defaultOption !== '') {
            setState(defaultOption);
            selectedOption(defaultOption);
        }
    },[]);
    const hideOptions = (ev:MouseEvent) => {
        if(elementRef.current && !elementRef.current.contains(ev.target as Node)) {
            setShowOptions(false);
        }
    }
    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }
    const selectedOption = (optionSelected:string) => {
        setState(optionSelected);
        const result = options.map(option => {
            return option.value===optionSelected
                ? {...option, isSelected:true}
                : {...option, isSelected:false}
        });
        setOptions(result);
    }
    return (
        <div ref={elementRef} className='relative w-full h-[66px] rounded-md'>
            <button
                type='button'
                onClick={handleShowOptions} 
                className={`w-full h-[42px] py-2 flex outline-blue-600 border items-center justify-between text-start px-4 rounded-md cursor-pointer
                    ${showOptions 
                        ? 'outline border-blue-600'
                        : isRequired 
                            ?   'border-red-700'
                            :   'border-gray-400'
                    }
                `}
            >
                <span className={`absolute left-4 top-[-15px] bg-white transition-all
                    ${(!showOptions && state === '') && 'translate-y-6'}
                    ${showOptions 
                        ?   'text-blue-800'
                        :   isRequired
                            ?   'text-red-700'
                            :   'text-gray-700'
                    } 
                `}>
                    {label}
                </span>
                {state !== '' && <span>{state}</span>}
                <IoChevronDown className='absolute right-3 top-[11px] w-[30px]' size={20} />
            </button>
           {showOptions &&
                <ul className='absolute w-full max-h-[242px] top-[calc(100%+8px)] bg-white border border-gray-400 rounded-md z-1 overflow-y-auto'>
                    {options.map((option,index) => (
                        <li 
                            key={option.id} 
                            className={`${option.isSelected && 'bg-gray-200'} cursor-pointer ${index===0 && 'rounded-tl-md rounded-tr-md'} ${index === options.length-1 && 'rounded-bl-md rounded-br-md'}  hover:bg-gray-100`}
                        >
                            <button 
                                type='button' 
                                onClick={() => {
                                    selectedOption(option.value)
                                    handleShowOptions();
                                }}
                                className='cursor-pointer px-4 text-start py-2 w-full'
                            >
                                {option.value}
                            </button>
                        </li>
                    ))}
                </ul>
            }
            {isRequired && 
                <div className="h-6">
                    <p className='text-red-700'>Este campo es requerido</p>
                </div>
            }
        </div>
    );
}