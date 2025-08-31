'use client';
import { titleFont } from '@/config/fonts';
import { BoxDetails } from '../box-details/BoxDetails';
import { OrderItem } from '../order-item/OrderItem';

export const OrderSumary = () => {
   
    return (
        <BoxDetails link='/checkout/address'>
            <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Order Summary</p>
            <div className='flex flex-row justify-between pb-3'>
                <span className='text-sm'>Nu. Productos</span>
                <span className='text-sm'>3 artículos</span>
            </div>
            <OrderItem title='Subtotal' value='$285.00' />
            <OrderItem title='Impuestos(15%)' value='Calculated at checkout' />
            <div className='flex flex-row justify-between pb-3'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>$485.00</span>
            </div>
        </BoxDetails>
    );
}