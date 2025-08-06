'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Categories } from '@/interfaces/product.interface';

export interface Props {
    text: string;
    category: Categories,
}

const getCategoryByPath = (pathname:string):Categories => {
  const category:Categories = (pathname.split('/').pop()??'men') as Categories;
  return category;
}

export const CategoryOption = ({text, category}:Props) => {
    const pathname = usePathname();
    return (
        <Link 
            className={`
                ml-2 
                mr-2 
                p-2 
                rounded-md 
                transition-all 
                ${category === getCategoryByPath(pathname)
                    ? "bg-blue-500 text-white hover:bg-blue-500" 
                    : "hover:bg-gray-100"} 
            `} 
            href={`/category/${category}`}
        >
            {text}
        </Link>
    )
}
