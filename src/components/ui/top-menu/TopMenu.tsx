'use client'
import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import { useUiStore } from '@/store';
import { CategoryOption } from './CategoryOption';
import { useContext } from 'react';
import { ScrollContext } from '@/context/ScrollContext';

export const TopMenu = () => {
  const opemSideMenu = useUiStore(state => state.openSideMenu);
  const isScrolling = useContext(ScrollContext)?.isScrolling;
  return (
    <nav className={`${isScrolling ? "border-gray-200" : "border-white"} border-b-1 flex px-5 pt-2 justify-between h-[60px] items-center w-full sticky top-0 bg-white z-2`}>
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className='hidden sm:block'>
        <CategoryOption text='Hombres' category='men' />
        <CategoryOption text='Mujeres' category='women' />
        <CategoryOption text='Niños' category='kid' />
      </div>
      <div className='flex items-center'>
        <Link href="/search" className='ml-2 mr-2 p-2 transition-all hover:bg-gray-100 active:bg-gray-300 rounded-md'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link href="/cart" className='ml-2 mr-2 p-2 transition-all hover:bg-gray-100 active:bg-gray-300 rounded-md'>
          <div className='relative'>
          <div className='w-5 h-5 absolute -top-3 -right-3 bg-blue-500 flex justify-center items-center rounded-full'>
            <span className='block text-white text-xs text-center'>3</span>
          </div>
            <IoCartOutline className='w-5 h-5'/>
          </div>
        </Link>
        <button onClick={opemSideMenu} className='ml-2 p-2 transition-all rounded-md hover:bg-gray-100 active:bg-gray-300 cursor-pointer'>
          <IoMenuOutline className='w-5 h-5' />
        </button>
      </div>
    </nav>
  )
}
