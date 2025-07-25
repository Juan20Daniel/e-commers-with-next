import { titleFont } from '@/config/fonts';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import Link from 'next/link';

export const TopMenu = () => {
  return (
    <nav className='flex px-5 pt-2 justify-between items-center w-full'>
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className='hidden sm:block'>
        <Link className='ml-2 mr-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/men">Hombres</Link>
        <Link className='ml-2 mr-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/women">Mujeres</Link>
        <Link className='ml-2 mr-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/kids">Niños</Link>
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
        <button className='ml-2 mr-2 p-2 transition-all rounded-md hover:bg-gray-100 active:bg-gray-300 cursor-pointer'>
          <IoMenuOutline className='w-5 h-5' />
        </button>
      </div>
    </nav>
  )
}
