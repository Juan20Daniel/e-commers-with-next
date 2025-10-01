'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Gender } from '@/interfaces/product.interface';

export interface Props {
    text: string;
    gender: Gender,
}

const getGenderByPath = (pathname:string):Gender => {
  const category:Gender = (pathname.split('/').pop()??'men') as Gender;
  return category;
}

export const GenderOption = ({text, gender}:Props) => {
    const pathname = usePathname();
    return (
        <Link 
            className={`ml-2 mr-2 p-2 rounded-md transition-all 
                ${gender === getGenderByPath(pathname)
                    ? "bg-blue-500 text-white hover:bg-blue-500" 
                    : "hover:bg-gray-100"} 
            `} 
            href={`/gender/${gender}`}
        >
            {text}
        </Link>
    )
}
