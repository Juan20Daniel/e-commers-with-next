import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

interface Props {
    title:string;
    subTitle?:string;
    boxStyles?: string;
    minWidth?: number;
    maxWidth?:number;
    spaceTop?: number;
    btnBack?:boolean;
    urlBack?:string;
}

export const Title = ({
    title, 
    subTitle, 
    boxStyles,
    minWidth=500,
    maxWidth,
    spaceTop=30, 
    btnBack=false, 
    urlBack='/'
}:Props) => {
    return (
        <>
            <div className={`w-full h-${spaceTop}`} />
            <div className={`pt-3 ${boxStyles} sticky top-[60px] z-1 backdrop-blur-xs`}>
                <div className={`flex flex-row w-full max-w-[${minWidth}px] justify-between lg:max-w-${maxWidth ? `[${maxWidth}px]` :'6xl'}`}>
                    <div>
                        <h1 className={`${titleFont.className} antialiased text-4xl font-semibold px-5 select-none `}>
                            {title}
                        </h1>
                        {subTitle && 
                            <div className="py-3 mb-5 px-5">
                                <h3 className="text-xl select-none">{subTitle}</h3>
                            </div>
                        }
                    </div>
                    {btnBack &&
                        <Link href={urlBack} className="flex flex-row items-center gap-3 h-8 px-3 rounded hover:bg-gray-100 active:bg-gray-50">
                            <span className="text-base hidden sm:inline">Atrás</span>
                            <IoArrowForward size={20} />
                        </Link>
                    }
                </div>
            </div>
        </>
    );
}
