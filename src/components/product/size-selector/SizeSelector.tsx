'use client';
import { useEffect, useState } from 'react';
import type { ValidSizes } from '@/interfaces/product.interface';

interface Props {
    defaultSize?: ValidSizes;
    availableSizes: ValidSizes[];
    selectSize?: string;
}

interface Size {
    size:ValidSizes;
    isSelect: boolean;
}

export const SizeSelector = ({defaultSize, availableSizes=[]}:Props) => {
    const [ sizes, setSizes ] = useState<Size[]>([]);
    useEffect(() => {
        const result = availableSizes.map(size => {
            return !defaultSize 
                ? {size:size, isSelect:false}
                : {size:size, isSelect:defaultSize === size}
        });
        setSizes(result);
    },[]);

    const selectSize = (name:string) => {
        const sizes_copy = [...sizes];
        const result = sizes_copy.map(size => size.size === name 
            ? {...size, isSelect:!size.isSelect} 
            : {...size, isSelect:false});

        setSizes(result);
    }

    return (
        <>
            <p className="font-bold text-sm mb-2">Tallas disponibles</p>
            <div className='flex flex-row mb-1 gap-2'>
                {sizes.map(({size, isSelect}) => (
                    <button
                        onClick={() => selectSize(size)}
                        className='relative px-5 py-2 bg-gray-100 cursor-pointer transition-all rounded-2xl hover:bg-gray-300 active:bg-gray-200' 
                        key={size}
                    >
                        {size}
                        <div className='absolute bottom-1 left-0 w-full flex justify-center'>
                            <div className={`transition-all bg-gray-700 rounded-2xl w-[20px] h-[4px] opacity-${isSelect ? 1 : 0}`} />
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}