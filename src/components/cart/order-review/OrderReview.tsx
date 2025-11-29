'use client';
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { BoxDetails } from "../box-details/BoxDetails";
import { OrderItem } from "../order-item/OrderItem";
import { useAddressStorage } from "@/store/address/address-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useCartStore } from "@/store/cart/cart-store";
import { placeOrder } from "@/app/actions/order/place-order";

interface Props {
    showBtnAction?:boolean;
    children?: React.ReactNode;
}

export const OrderReview = ({showBtnAction=true, children}:Props) => {
    const [ quantityProducts, setCuantityProducts ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ subTotal, setSubTotal ] = useState(0);
    const [ taxis, setTaxis ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ showDetails, setShowDetails ] = useState(true);
    const [ isPlacingOrder, setIsPlacingOrder ] = useState(false);
    const {getTotalProductsInCart, getSubTotal, getTaxis, getTotal} = useCartStore(state => state);
    const { address } = useAddressStorage(state => state);
    const { firstname, lastname, city, address:col, opAddress, phone } = address;
    const cart = useCartStore(state => state.cart);
    //Para evitar errores de hidratación
    useEffect(() => {
        setCuantityProducts(getTotalProductsInCart);
        setSubTotal(getSubTotal());
        setTaxis(getTaxis());
        setTotal(getTotal());
    },[]);
    const onPlaceOrder = async () => {
        if(!cart) return;
        setIsPlacingOrder(true);
        const productToOrder = cart.map(({id, size, quantity}) => ({productId:id, size, quantity}))
        const result = await placeOrder(productToOrder, address);
        if(!result.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(result.message);
            return;
        }

        setErrorMessage('');
    }
    return (
        <BoxDetails disableBtnAction={isPlacingOrder} showBtnAction={showBtnAction} textBtn="Pagar" action={onPlaceOrder}>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden
                ${showDetails ? 'h-[202px]' : 'h-8'}
            `}>
                <div className='flex flex-row justify-between items-center '>
                    <span className={`${titleFont.className} font-bold text-base lg:text-2xl`}>Dirección de entrega</span>
                    <button className='cursor-pointer w-[30px] h-[30px]' onClick={() => setShowDetails(!showDetails)}>
                        <IoChevronDownOutline className={`${showDetails ? 'rotate-0' : 'rotate-180'} transition-all duration-500`} size={30} />
                    </button>
                </div>
                <div className='flex-row justify-between pb-3 flex transition-all pt-4 duration-500 ease-in-out'>
                    <span className='text-sm'>Nombre</span>
                    <span className='text-sm pl-2 truncate'>{firstname} {lastname}</span>
                </div>
                <OrderItem title="Ciudad" value={city}/>
                <OrderItem title="Alcaldia" value={col}/>
                <OrderItem title="Calle" value={opAddress}/>
                <OrderItem title="Teléfono" value={phone}/>
            </div>
            <div className='w-full h-px bg-gray-400 my-3' />
            <p className={`${titleFont.className} font-bold text-base pb-5 lg:text-2xl`}>Resumen de orden</p>
            <OrderItem 
                title="Nu. Productos" 
                value={
                    `${quantityProducts.toString()}
                    ${quantityProducts > 1 ? 'artículos' : 'artículo'}
                    `
                }
            />
            <OrderItem title="Subtotal" value={currencyFormat(subTotal)}/>
            <OrderItem title="Impuestos(15%)" value={currencyFormat(taxis)}/>
            <div className='flex flex-row justify-between pb-3'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>{currencyFormat(total)}</span>
            </div>
            {children}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </BoxDetails>
    );
}