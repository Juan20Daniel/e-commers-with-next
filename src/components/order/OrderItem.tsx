import { titleFont } from '@/config/fonts'
import { formatDate } from '@/utils/formatDate'
import { IoArrowForwardOutline, IoCardOutline } from "react-icons/io5";

export const OrderItem = () => {
  return (
    <div className='relative bg-gray-100 rounded-4xl transition-all cursor-pointer p-8 hover:shadow-2xl'>
      <div className='h-10 flex justify-center items-center mb-4'>
        <span className={`${titleFont.className} antialiased font-bold select-none`}>Teslo</span>
        <span className='select-none'> | Shop</span>
      </div>
      <p className='text-center font-semibold text-5xl pb-3 select-none'>$4,999.00</p>
      <p className='text-center select-none'>Juan Daniel Morales</p>
      <div className='w-full flex justify-center pt-5'>
        <div className='flex items-center gap-3 bg-gray-200 px-5 py-1 rounded-2xl'>
          <IoCardOutline />
          <p className=' text-sm select-none'>Pagada</p>
        </div>
      </div>
      <div className='w-full h-20' />
      <div className='w-full h-20 bottom-0 left-0 flex flex-col justify-center items-center'>
        <p className='text-[10px] select-none'>Fecha de creación</p>
        <p className='bg-black text-white px-5 py-1 text-[12px] rounded-2xl select-none'>{formatDate(new Date('2025-11-29T22:23:55.438Z'))}</p>
      </div>
      <div className='flex justify-center'>
        <div className='flex items-center gap-5'>
          Ver orden
          <IoArrowForwardOutline />
        </div>
      </div>
    </div>
  )
}
