'use client';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface Props {
    link?:string;
    children:React.ReactNode;
    textBtn: string;
    showBtnAction?:boolean;
    disableBtnAction?: boolean;
    action?:() => void;
}

export const BoxDetails = ({link, children, showBtnAction=true, textBtn, disableBtnAction=false, action}:Props) => {
    const router = useRouter();
    const handleClick = () => {
        if(link) return router.push(link);
        if(action) action();
    }
    return (
        <div className='sticky bottom-0 w-full bg-white shadow-[0px_-4px_8px_rgba(0,0,0,0.1)] py-4 flex justify-center 
            lg:bottom-auto lg:top-[150px] lg:mr-4 lg:shadow-[0px_1px_10px_rgba(0,0,0,0.1)] lg:rounded lg:max-w-[500px] lg:py-8
        '>
            <div className='w-full max-w-[500px] px-4 lg:px-8'>
                {children}
                {showBtnAction &&
                    <button 
                        className={clsx({
                            'btn-primary w-full': !disableBtnAction,
                            'btn-disable w-full': disableBtnAction
                        })}
                        onClick={() => handleClick()}
                    >
                        {textBtn}
                    </button>
                }
            </div>
        </div>
    );
}