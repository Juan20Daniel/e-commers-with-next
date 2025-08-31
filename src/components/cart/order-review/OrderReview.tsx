'use client';
import { titleFont } from "@/config/fonts";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { BoxDetails } from "../box-details/BoxDetails";
import { OrderItem } from "../order-item/OrderItem";

interface Props {
    showBtnAction?:boolean;
    children?: React.ReactNode;
}

export const OrderReview = ({showBtnAction=true, children}:Props) => {
    const [ showDetails, setShowDetails ] = useState(true);
    return (
        <BoxDetails link='/orders/123' showBtnAction={showBtnAction}>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden
                ${showDetails ? 'h-[202px]' : 'h-[32px]'}
            `}>
                <div className='flex flex-row justify-between items-center '>
                    <span className={`${titleFont.className} font-bold text-base lg:text-2xl`}>Dirección de entrega</span>
                    <button className='cursor-pointer w-[30px] h-[30px]' onClick={() => setShowDetails(!showDetails)}>
                        <IoChevronDownOutline className={`${showDetails ? 'rotate-[0deg]' : 'rotate-[180deg]'} transition-all duration-500`} size={30} />
                    </button>
                </div>
                <div className='flex-row justify-between pb-3 flex transition-all pt-4 duration-500 ease-in-out'>
                    <span className='text-sm'>Nombre</span>
                    <span className='text-sm pl-2 truncate'>Juan Daniel Morales Abarca</span>
                </div>
                <OrderItem title="Ciudad" value="México"/>
                <OrderItem title="Alcaldia" value="Av. Siempre viva 123"/>
                <OrderItem title="Calle" value="Morelos y pavon"/>
                <OrderItem title="Teléfono" value="3141023884"/>
            </div>
            <div className='w-full h-[1px] bg-gray-400 my-3' />
            <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Resumen de orden</p>
            <OrderItem title="Nu. Productos" value="3 artículos"/>
            <OrderItem title="Subtotal" value="$285.00"/>
            <OrderItem title="Impuestos(15%)" value="Calculated at checkout"/>
            <div className='flex flex-row justify-between pb-3'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>$485.00</span>
            </div>
            {children}
        </BoxDetails>
    );
}