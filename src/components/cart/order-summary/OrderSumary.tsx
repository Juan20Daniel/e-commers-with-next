'use client';
import { titleFont } from '@/config/fonts';
import { BoxDetails } from '../box-details/BoxDetails';
import { OrderItem } from '../order-item/OrderItem';
import { useCartStore } from '@/store/cart/cart-store';

export const OrderSumary = () => {
    const {getTotalProductsInCart, getSubTotal, getTaxis, getTotal} = useCartStore(state => state);

    return (
        <BoxDetails link='/checkout/address'>
            <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Resumen de orden</p>
            <div className='flex flex-row justify-between pb-3'>
                <span className='text-sm'>Nu. Productos</span>
                <span className='text-sm'>
                    {getTotalProductsInCart()}
                    {getTotalProductsInCart() > 1 
                        ?   ' artículos'
                        :   ' artículo'
                    }
                </span>
            </div>
            <OrderItem title='Subtotal' value={`$${getSubTotal()}`} />
            <OrderItem title='Impuestos(15%)' value={`${getTaxis()}`} />
            <div className='flex flex-row justify-between pb-3'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>${getTotal()}</span>
            </div>
        </BoxDetails>
    );
}