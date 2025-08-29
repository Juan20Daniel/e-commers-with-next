'use client';
import { titleFont } from '@/config/fonts';
import { BoxDetails } from '../box-details/BoxDetails';

export const OrderSumary = () => {
   
    return (
        <BoxDetails>
            <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Order Summary</p>
            <div className='flex flex-row justify-between pb-3'>
                <span className='text-sm'>Nu. Productos</span>
                <span className='text-sm'>3 artículos</span>
            </div>
            <div className='flex flex-row justify-between pb-3'>
                <span className='text-sm'>Subtotal</span>
                <span className='text-sm'>$285.00</span>
            </div>
            <div className='flex flex-row justify-between pb-3'>
                <span className='text-sm'>Impuestos(15%)</span>
                <span className='text-sm'>Calculated at checkout</span>
            </div>
            <div className='flex flex-row justify-between pb-3'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>$485.00</span>
            </div>
        </BoxDetails>
    );
}



// export const OrderSumary = () => {
//     const [ showDetails, setShowDetails ] = useState(true);
//     return (
//         <div className='sticky bottom-0 w-full bg-white shadow-[0px_-4px_8px_rgba(0,0,0,0.1)] py-4 flex justify-center 
//             lg:bottom-auto lg:top-[70px] lg:mr-4 lg:shadow-[0px_1px_10px_rgba(0,0,0,0.1)] lg:rounded lg:max-w-[500px] lg:py-8
//         '>
//             <div className='w-full max-w-[500px] px-4 lg:px-8'>
//                 {/* 192 */}
//                 <div className={`transition-all duration-500 ease-in-out overflow-hidden
//                     ${showDetails ? 'h-[192px]' : 'h-[32px]'}
//                 `}>
//                     <div className='flex flex-row justify-between items-center'>
//                         <span className={`${titleFont.className} font-bold text-base lg:text-2xl`}>Dirección de entrega</span>
//                         <button className='cursor-pointer w-[30px] h-[30px]' onClick={() => setShowDetails(!showDetails)}>
//                             <IoChevronDownOutline className={`${showDetails ? 'rotate-[0deg]' : 'rotate-[180deg]'} transition-all duration-500`} size={30} />
//                         </button>
//                     </div>
//                     <div className='flex-row justify-between pb-3 flex transition-all duration-500 ease-in-out'>
//                         <span className='text-sm'>Nombre</span>
//                         <span className='text-sm'>Juan Daniel Morales Abarca</span>
//                     </div>
//                     <div className='flex flex-row justify-between pb-3'>
//                         <span className='text-sm'>Calle</span>
//                         <span className='text-sm'>Av. Siempre viva 123</span>
//                     </div>
//                     <div className='flex flex-row justify-between pb-3'>
//                         <span className='text-sm'>Alcaldia</span>
//                         <span className='text-sm'>Morelos y pavon</span>
//                     </div>
//                     <div className='flex flex-row justify-between pb-3'>
//                         <span className='text-sm'>Ciudad</span>
//                         <span className='text-sm'>México</span>
//                     </div>
//                     <div className='flex flex-row justify-between pb-3'>
//                         <span className='text-sm'>Teléfono</span>
//                         <span className='text-sm'>3141023884</span>
//                     </div>
//                 </div>
//                 <div className='w-full h-[1px] bg-gray-400 my-3' />
//                 <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Order Summary</p>
//                 <div className='flex flex-row justify-between pb-3'>
//                     <span className='text-sm'>Nu. Productos</span>
//                     <span className='text-sm'>3 artículos</span>
//                 </div>
//                 <div className='flex flex-row justify-between pb-3'>
//                     <span className='text-sm'>Subtotal</span>
//                     <span className='text-sm'>$285.00</span>
//                 </div>
//                 <div className='flex flex-row justify-between pb-3'>
//                     <span className='text-sm'>Impuestos(15%)</span>
//                     <span className='text-sm'>Calculated at checkout</span>
//                 </div>
//                 <div className='flex flex-row justify-between pb-3'>
//                     <span className='font-bold'>Total</span>
//                     <span className='font-bold'>$485.00</span>
//                 </div>
//                 <Link href='/checkout/address' className={`${titleFont.className} flex justify-center btn-primary w-full text-white py-2 mb-12 rounded cursor-pointer active:bg-blue-300 transition-all lg:mb-0`}>
//                     Pagar
//                 </Link>
//             </div>
//         </div>
//     );
// }