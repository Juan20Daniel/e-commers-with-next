'use client';
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { BoxBtn } from "./components/BoxBtn";
import { NavLink } from "./components/NavLink";
import clsx from "clsx";

interface Props {
    totalPages?: number;
    currentPage?: number;
    url?:string;
}

export const Pagination = ({totalPages=1, currentPage=1, url='/'}:Props) => {
    const [ groupsPages, setGroupsPages ] = useState<Record<number, number[]>|null>(null);
    const [ maxNumPagesByGroup, setMaxNumPagesByGroup ] = useState(5);
    const [ totalNumPageGroups, setTotalNumPageGroups ] = useState(0);
    const [ currentSetPages, setCurrentSetPages ] = useState(0);
    const isLastPage = currentPage===totalPages;
    const isFirstPage = currentPage===1;
    if(totalPages === 1) return;
    useEffect(() => {
        setMaxNumPagesByGroup(window.innerWidth < 700 ? 5 : 10);
    },[]);
    useEffect(() => {
        const handleresize = () => {
            setMaxNumPagesByGroup(window.innerWidth < 700 ? 5 : 10);
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
    
    const searchKeyGroupOfCurrentPage = (nextPage:number):number => {
        const groupsPagesCopy = {...groupsPages}
        let keyGroupOfCurrentPage = null;
        if(groupsPagesCopy[currentSetPages].includes(nextPage)) return currentSetPages;
        for(let groupKey in groupsPagesCopy) {
            const result = groupsPagesCopy[groupKey].includes(nextPage) ? Number(groupKey) : null;
            if(result) {
                keyGroupOfCurrentPage = result;
                break;
            }
        }
        return keyGroupOfCurrentPage??0;
    }

    const changeNextPage = (nextPage:number) => {
        if(!groupsPages) return;
        setCurrentSetPages(searchKeyGroupOfCurrentPage(nextPage));
        redirect(`${url}?page=${nextPage}`);
    }
    return (
        <div className="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <BoxBtn
                        action={() => changeNextPage(Math.max(1, currentPage-1))}
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
                                url={url}
                            />
                        ))
                    }
                    {totalPages > maxNumPagesByGroup && 
                        <BoxBtn
                            title={`${totalPages}`}
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
                        action={() => changeNextPage(Math.min(totalPages, currentPage+1))}
                        enableBtn={isLastPage}
                    >
                        <IoChevronForwardOutline size={20} />
                    </BoxBtn>
                </ul>
            </nav>
        </div>
    );
}