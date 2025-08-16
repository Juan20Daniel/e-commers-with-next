import { titleFont } from '@/config/fonts';

export const OrderSumary = () => {
    return (
        <div className='sticky bottom-0 w-full bg-white shadow-[0px_-4px_8px_rgba(0,0,0,0.1)] py-4 flex justify-center 
            lg:bottom-auto lg:top-[70px] lg:mr-4 lg:shadow-[0px_1px_10px_rgba(0,0,0,0.1)] lg:rounded lg:max-w-[500px] lg:py-8
        '>
            <div className='w-full max-w-[500px] px-4 lg:px-8'>
                <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Order Summary</p>
                <div className='flex flex-row justify-between pb-3'>
                    <span className='text-sm'>Shipping</span>
                    <span className='text-sm'>Gratis</span>
                </div>
                <div className='flex flex-row justify-between pb-3'>
                    <span className='text-sm'>Sales Tax</span>
                    <span className='text-sm'>Calculated at checkout</span>
                </div>
                <div className='flex flex-row justify-between pb-10'>
                    <span className='font-bold'>Subtotal</span>
                    <span className='font-bold'>$285.00</span>
                </div>
                <button className={`${titleFont.className} bg-blue-500 w-full text-white py-2 mb-12 rounded cursor-pointer active:bg-blue-300 transition-all lg:mb-0`}>
                    Pagar
                </button>
            </div>
        </div>
    );
}
