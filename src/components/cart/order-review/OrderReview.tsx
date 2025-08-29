'use client';
import { titleFont } from "@/config/fonts";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { BoxDetails } from "../box-details/BoxDetails";


export const OrderReview = () => {
    const [ showDetails, setShowDetails ] = useState(true);
    return (
        <BoxDetails>
        
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
                    <span className='text-sm pl-2 truncate'>Juvvggan Daniel Morales Abarca</span>
                </div>
                <div className='flex flex-row justify-between pb-3'>
                    <span className='text-sm'>Calle</span>
                    <span className='text-sm'>Av. Siempre viva 123</span>
                </div>
                <div className='flex flex-row justify-between pb-3'>
                    <span className='text-sm'>Alcaldia</span>
                    <span className='text-sm'>Morelos y pavon</span>
                </div>
                <div className='flex flex-row justify-between pb-3'>
                    <span className='text-sm'>Ciudad</span>
                    <span className='text-sm'>México</span>
                </div>
                <div className='flex flex-row justify-between pb-3'>
                    <span className='text-sm'>Teléfono</span>
                    <span className='text-sm'>3141023884</span>
                </div>
            </div>
            <div className='w-full h-[1px] bg-gray-400 my-3' />
            <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Resumen de orden</p>
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