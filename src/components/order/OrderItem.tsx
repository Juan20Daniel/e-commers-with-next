import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { formatDate } from '@/utils/formatDate';
import { IoArrowForwardOutline, IoCardOutline } from "react-icons/io5";
import { Order } from '@/interfaces/order.interface';

interface Props {
  order: Order;
}

export const OrderItem = ({order}:Props) => {
  return (
    <div className='relative bg-gray-100 rounded-4xl transition-all flex flex-col items-center  py-8 hover:shadow-2xl'>
      <div className='h-10 flex justify-center items-center mb-4'>
        <span className={`${titleFont.className} antialiased font-bold select-none`}>Teslo</span>
        <span className='select-none'> | Shop</span>
      </div>
      <p className='font-semibold text-3xl pb-3 text-center w-[201px] truncate select-none xs:w-[251px] sm:w-[201px] sm2:w-[251px] lg:w-[300px] lg:text-5xl 2xl:w-[350px] 2xl:text-6xl' title="$4,999.00">$4,999.00</p>
      <p className='select-none text-sm text-center w-40'>Juan Daniel Morales Abarca</p>
      <div className='flex items-center gap-3 mt-5 mb-20 bg-gray-200 px-5 py-1 rounded-2xl'>
        <IoCardOutline />
        <p className='text-sm select-none'>Pagada</p>
      </div>
      <div className='w-full h-20 bottom-0 left-0 flex flex-col justify-center items-center'>
        <p className='text-[9px] mb-2 select-none 2xl:text-[10px]'>Fecha de creación</p>
        <p className='bg-black text-white px-5 py-1 text-[10px] rounded-2xl select-none 2xl:text-[12px]'>{formatDate(new Date('2025-11-29T22:23:55.438Z'))}</p>
      </div>
     <div className='h-[30px]'>
        <Link href='/orders/order-id' className='flex items-center text-base transition-all gap-5 active:text-gray-600 hover:text-lg'>
          Ver orden
          <IoArrowForwardOutline />
        </Link>
     </div>
    </div>
  )
}
