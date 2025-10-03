import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { CartProduct } from "@/interfaces/product.interface";
import { useState } from "react";
import { useAlertsStore } from "@/store/ui/alerts-store";
import { useCartStore } from "@/store/cart/cart-store";

interface Props {
    product: CartProduct;
    canRemove:boolean;
    showQuantitySelector: boolean;
}

export const Item = ({product, canRemove, showQuantitySelector}:Props) => {
    const { open:openAlert, close:closeAlert } = useAlertsStore(state => state);
    const {removeProduct, cart} = useCartStore(state => state);
    const [ quantity, setQuantity ] = useState(product.quantity);
    const confirmDeletion = () => {
        openAlert({
            type:"confirm", 
            title:"Eliminar del carrito", 
            message:"¿Seguro que quieres eliminar este producto del carrito de compras?",
            confirmAction:removeProductFromCart
        });
    }
    const removeProductFromCart = () => {
        removeProduct(product);
        closeAlert();
    }
    return (
        <div className="flex mb-8">
            <div className="relative max-w-[70px] max-h-[70px] sm:max-w-[100px] sm:max-h-[100px]">
                <Image
                    width={100}
                    height={100}
                    src={`/products/${product.image}`}
                    alt="Articulo"
                    className="shadow-[0px_0px_2px_rgba(0,0,0,0.3)] rounded-2xl w-full"
                />
                {canRemove &&
                    <div className="absolute bottom-[-9px] w-full flex justify-center">
                        <button 
                            onClick={() => confirmDeletion()}
                            className="bg-white text-black border-[1px] border-gray-300 text-[8px] px-2 py-1 rounded-3xl cursor-pointer hover:bg-red-800 active:bg-red-500 hover:text-white transition-all sm:text-[10px] sm:px-3"
                        >
                            Remover
                        </button>
                    </div>
                }
            </div>
            <div className="w-full flex flex-col justify-center gap-1 ml-2 xl:ml-5">
                <div className="flex justify-between">
                    <Link href={`/product/${product.slug}`} className="text-[12px] font-bold text-black sm:text-[15px] xl:text-[18px] hover:underline">
                        {product.title}
                    </Link>
                    <span className="text-[12px] font-bold ml-2 min-w-[65px] truncate sm:text-[14px] sm:min-w-[75px] xl:mr-10 xl:text-[15px]">${product.price*product.quantity}.00</span>
                </div>
                <span className="text-[10px] sm:text-[12px] xl:text-[13px]">Talla: {product.size}</span>
                <div className="h-[19px] flex gap-3">
                    <span className="text-[10px] sm:text-[12px] xl:text-[13px]">Cantidad:</span>
                    {showQuantitySelector &&
                        <QuantitySelector
                            defaultCant={quantity}
                            maxQuantity={10}
                            sizeNum="small"
                            onQuantityCanged={(quantity) => setQuantity(quantity)}
                        />
                    }
                </div>
            </div>
        </div>
    );
}