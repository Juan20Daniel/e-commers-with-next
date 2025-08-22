'use client'
import { Option } from '@/interfaces/select-option.interface';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface Props {
    state: Option;
    options: Option[];
    label: string;
    defaultOption?:Option;
    setState: Dispatch<SetStateAction<Option>>;
}

export const Select = ({state, options:initialState,label,setState}:Props) => {
    const [ options, setOptions ] = useState(initialState)
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
    const hideOptions = (ev:MouseEvent) => {
        if(elementRef.current && !elementRef.current.contains(ev.target as Node)) {
            setShowOptions(false);
        }
    }
    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }
    const getOptionSelected = (optionSelected:Option) => {
        setState({...optionSelected, value:optionSelected.value});
        const result = options.map(option => {
            return option.id===optionSelected.id
                ? {...option, isSelected:true}
                : {...option, isSelected:false}
        });
        setOptions(result);
        handleShowOptions();
    }
    return (
        <div ref={elementRef} className='relative w-full h-[42px] mt-[24px] rounded-md'>
            <button
                onClick={handleShowOptions} 
                className={`w-full h-full flex outline-blue-600 border-[1px] ${showOptions ? 'outline border-blue-600': 'border-gray-400'} items-center justify-between text-start px-4 rounded-md cursor-pointer`}
            >
                <span className={`absolute left-4 top-[-15px] bg-white transition-all ${showOptions && 'text-blue-800'} ${(!showOptions && state.value === '') && 'translate-y-[24px]'}`}>{label}</span>
                {state.value !== '' && <span>{state.value}</span>}
                <IoChevronDown className='absolute right-3 top-[11px] w-[30px]' size={20} />
            </button>
           {showOptions &&
                <ul className='absolute w-full max-h-[242px] top-[calc(100%+8px)] bg-white border-[1px] border-gray-400 rounded-md z-1 overflow-y-auto'>
                    {options.map((option,index) => (
                        <li 
                            key={option.id} 
                            className={`${option.isSelected && 'bg-gray-200'} cursor-pointer ${index===0 && 'rounded-tl-md rounded-tr-md'} ${index === options.length-1 && 'rounded-bl-md rounded-br-md'}  hover:bg-gray-100`}
                        >
                            <button onClick={() => getOptionSelected(option)} className='cursor-pointer px-4 text-start py-2 w-full'>
                                {option.value}
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}