'use client';
import clsx from "clsx";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { BoxBtn } from "./components/BoxBtn";
import { NavLink } from "./components/NavLink";

interface Props {
    totalPages?: number;
    currentPage?: number;
}

export const Pagination = ({totalPages=1, currentPage=1}:Props) => {
    const [ maxNumPagesByGroup, setMaxNumPagesByGroup ] = useState(window.innerWidth < 650 ? 5 : 10);
    const [ groupsPages, setGroupsPages ] = useState<Record<number, number[]>|null>(null);
    const [ totalNumPageGroups, setTotalNumPageGroups ] = useState(0);
    const [ currentSetPages, setCurrentSetPages ] = useState(0);
    const isLastPage = currentPage===totalPages;
    const isFirstPage = currentPage===1;
    if(totalPages === 1) return;
    useLayoutEffect(() => {
        const handleresize = () => {
            setMaxNumPagesByGroup(window.innerWidth < 650 ? 5 : 10);
        }
        window.addEventListener('resize', () => handleresize());
        return () => {
            removeEventListener('resize', handleresize);
        }
    },[]);
    useEffect(() => {
        createPageGroup(totalPages);
    },[maxNumPagesByGroup]);
    const createPageGroup = (totalPages:number) => {
        if(totalPages <= maxNumPagesByGroup) {
            return setGroupsPages({0:Array.from({length:totalPages}, (_,i) => i+1)});
        }
        const groupPagesMap = new Map();
        for(let i=0;i<=totalPages-1; i++) {
            let groupIndex = Math.floor(i/maxNumPagesByGroup);
            if(groupPagesMap.has(groupIndex)) {
                const copyPageGroup = [...groupPagesMap.get(groupIndex), i+1];
                groupPagesMap.set(groupIndex, copyPageGroup);
            } else {
                groupPagesMap.set(groupIndex, [i+1]);
            }
        }
        setTotalNumPageGroups(groupPagesMap.size-1);
        const resultPageGroups:Record<number, number[]> = {};
        for (const [clave, valor] of groupPagesMap) {
            resultPageGroups[clave] = valor;
        }
        setGroupsPages(resultPageGroups);
    }
    
    const changeNextPage = (url:string) => {
        if(!groupsPages) return;
        if(groupsPages[currentSetPages][groupsPages[currentSetPages].length-1] === currentPage) {
            setCurrentSetPages(Math.min(totalNumPageGroups, currentSetPages+1));
        }
        redirect(url);
    }
    const backLastPage = (url:string) => {
        if(!groupsPages) return;
        if(groupsPages[currentSetPages][0] === currentPage) {
            setCurrentSetPages(Math.max(0, currentSetPages-1));
        }
        redirect(url);
    }
    return (
        <div className="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <BoxBtn
                        action={() => backLastPage(`/?page=${Math.max(1, currentPage-1)}`)}
                        enableBtn={isFirstPage}
                    >
                        <IoChevronBackOutline size={20} />
                    </BoxBtn>
                    {totalPages > maxNumPagesByGroup &&
                        <BoxBtn 
                            action={() => setCurrentSetPages(Math.max(0, currentSetPages-1))}
                            enableBtn={currentSetPages===0}
                        >
                            <div className="flex flex-row gap-[2px] h-[24px] items-center">
                                <div className={clsx("w-[3px] h-[3px] rounded-2xl", currentSetPages===0 ? "bg-gray-500" : "bg-gray-700")} />
                                <div className={clsx("w-[3px] h-[3px] rounded-2xl", currentSetPages===0 ? "bg-gray-500" : "bg-gray-700")} />
                                <div className={clsx("w-[3px] h-[3px] rounded-2xl", currentSetPages===0 ? "bg-gray-500" : "bg-gray-700")} />
                            </div>
                        </BoxBtn>
                    }
                    {groupsPages &&
                        groupsPages[currentSetPages].map((numPage) => (
                            <NavLink  
                                key={numPage} 
                                numberPage={numPage} 
                                currentPage={currentPage} 
                            />
                        ))
                    }
                    {totalPages > maxNumPagesByGroup && 
                        <BoxBtn
                            action={() => setCurrentSetPages(Math.min(totalNumPageGroups, currentSetPages+1))}
                            enableBtn={currentSetPages === totalNumPageGroups}
                        >
                            <div className="flex flex-row gap-[2px] h-[24px] items-center">
                                <div className={clsx("w-[3px] h-[3px] rounded-2xl", currentSetPages === totalNumPageGroups ? "bg-gray-500" : "bg-gray-700")} />
                                <div className={clsx("w-[3px] h-[3px] rounded-2xl", currentSetPages === totalNumPageGroups ? "bg-gray-500" : "bg-gray-700")} />
                                <div className={clsx("w-[3px] h-[3px] rounded-2xl", currentSetPages === totalNumPageGroups ? "bg-gray-500" : "bg-gray-700")} />
                            </div>
                        </BoxBtn>
                    }
                    <BoxBtn 
                        action={() => changeNextPage(`/?page=${Math.min(totalPages, currentPage+1)}`)}
                        enableBtn={isLastPage}
                    >
                        <IoChevronForwardOutline size={20} />
                    </BoxBtn>
                </ul>
            </nav>
        </div>
    );
}