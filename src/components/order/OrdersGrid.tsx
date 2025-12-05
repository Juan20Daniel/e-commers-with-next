import React from 'react'
import { OrderItem } from './OrderItem';
import { Order } from '@/interfaces/order.interface';

interface Props {
    orders:Order[]
}

export const OrdersGrid = ({orders}:Props) => {
    return (
        <div className='w-full grid grid-cols-1 gap-5 sm:grid-cols-2 md2:grid-cols-3'>
            {orders.map(order => (
                <OrderItem 
                    key={order.id} 
                    order={order} 
                />
            ))}
        </div>
    );
}
