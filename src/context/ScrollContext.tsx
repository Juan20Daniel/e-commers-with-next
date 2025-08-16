'use client'
import { createContext, Dispatch, PropsWithChildren, RefObject, SetStateAction, useRef, useState } from 'react';

interface SchollContext {
    scrollRef:RefObject<HTMLDivElement|null>;
    isScrolling:boolean;
    setIsScrolling:Dispatch<SetStateAction<boolean>>
}

export const ScrollContext = createContext<SchollContext|null>(null);

export const ScrollProvider = ({children}:PropsWithChildren) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollRef = useRef<HTMLDivElement|null>(null); 

    return (
        <ScrollContext.Provider value={{scrollRef, isScrolling, setIsScrolling}}>
            {children}
        </ScrollContext.Provider>
    )
}