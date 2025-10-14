'use client';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';

interface Props {
    link:string;
    children:React.ReactNode;
    textBtn: string;
    showBtnAction?:boolean;
}

export const BoxDetails = ({link, children, showBtnAction=true, textBtn}:Props) => {
    return (
        <div className='sticky bottom-0 w-full bg-white shadow-[0px_-4px_8px_rgba(0,0,0,0.1)] py-4 flex justify-center 
            lg:bottom-auto lg:top-[70px] lg:mr-4 lg:shadow-[0px_1px_10px_rgba(0,0,0,0.1)] lg:rounded lg:max-w-[500px] lg:py-8
        '>
            <div className='w-full max-w-[500px] px-4 lg:px-8'>
                {children}
                {showBtnAction &&
                    <Link href={link} className={`${titleFont.className} flex justify-center btn-primary w-full text-white py-2 mb-12 rounded cursor-pointer active:bg-blue-300 transition-all lg:mb-0`}>
                        {textBtn}
                    </Link>
                }
            </div>
        </div>
    );
}