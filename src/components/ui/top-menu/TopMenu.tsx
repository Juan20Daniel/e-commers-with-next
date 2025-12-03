'use client'
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import { useSideMenuStore } from '@/store';
import { GenderOption } from './CategoryOption';
import { ScrollContext } from '@/context/ScrollContext';
import { useCartStore } from '@/store/cart/cart-store';

export const TopMenu = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const opemSideMenu = useSideMenuStore(state => state.openSideMenu);
  const { getTotalProductsInCart } = useCartStore();
  const isScrolling = useContext(ScrollContext)?.isScrolling;
  useEffect(() => {
    setIsLoading(false);
  },[])
  return (
    <nav className={`${isScrolling ? "border-gray-200" : "border-white"} border-b flex px-5 pt-2 justify-between h-[60px] items-center w-full sticky top-0 bg-white z-2`}>
    
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span> | Shop</span>
      </Link>
      
      <div className='hidden sm:block'>
        <GenderOption text='Hombres' gender='men' />
        <GenderOption text='Mujeres' gender='women' />
        <GenderOption text='Niños' gender='kid' />
      </div>
      <div className='flex items-center'>
        <Link href="/search" className='ml-2 mr-2 p-2 transition-all hover:bg-gray-100 active:bg-gray-300 rounded-md'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link href="/cart" className='ml-2 mr-2 p-2 transition-all hover:bg-gray-100 active:bg-gray-300 rounded-md'>
          <div className='relative'>
          {(!isLoading && getTotalProductsInCart() > 0) &&
            <div className='w-5 h-5 absolute -top-3 -right-3 bg-blue-500 flex justify-center items-center fade-in rounded-full'>
              <span className='block text-white text-xs text-center'>{getTotalProductsInCart()}</span>
            </div>
          }
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
