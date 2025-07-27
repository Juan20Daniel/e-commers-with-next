import { titleFont } from '@/config/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PageNotFound = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center'>
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} font-bold antialiased text-6xl  md:text-9xl select-none`}>404</h2>
        <p className='font-medium text-sm select-none md:text-3xl'>Whoops! Lo sentimos mucho.</p>
        <p className='font-light md:mt-3'>
          <span className='select-none text-sm md:text-2xl'>Puedes regresar al </span>
          <Link href='/' className='text-blue-500 font-normal hover:underline transition-all text-sm md:text-2xl'>inicio</Link>
        </p>
      </div>
      <div className='px-5 mx-5'>
        <Image
          src='/imgs/starman_750x750.png'
          width={500}
          height={500}
          alt='Not found'
          className='w-[400px]'
        />
      </div>
    </div>
  )
}
