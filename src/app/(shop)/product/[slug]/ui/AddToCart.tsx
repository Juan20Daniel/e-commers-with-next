'use client';
import { useState } from 'react';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { Product, ValidSizes } from '@/interfaces/product.interface';
import { useCartStore } from '@/store/cart/cart-store';

interface Props {
    product:Product
}

export const AddToCart = ({product}:Props) => {
    const { addProducttoCart } = useCartStore(state => state);
    const [ size, setSize ] = useState<ValidSizes | undefined>();
    const [ quantity, setQuantity ] = useState<number>(1);
    const [ posted, setPosted ] = useState<boolean>(false);
    const addToCart = () => {
        setPosted(true);
        if(!size) return;
        const productToAdd = {
            id: product.id,
            slug: product.slug,
            price: product.price,
            title: product.title,
            size: size,
            quantity: quantity,
            image: product.images[0]
        }
        addProducttoCart(productToAdd);
        setSize(undefined);
        setQuantity(1);
        setPosted(false);
    }
    return (
        <>
            <SizeSelector 
                defaultSize={size} 
                availableSizes={product.sizes}
                onSizeChange={(sizeSelected) => setSize(sizeSelected)}
            />
            {(posted && !size) &&
                <span className='text-red-600 fade-in'>Selecciona una de las tallas disponibles</span>
            }
            <p className="font-bold text-sm mb-2 mt-3">Cantidad</p>
            <div className="h-[40px]">
                <QuantitySelector
                    defaultCant={quantity}
                    maxQuantity={product.inStock}
                    onQuantityCanged={setQuantity} 
                />
            </div>
            <button type='button' onClick={addToCart} className="btn-primary my-5 cursor-pointer">
                Agregar al carrito
            </button>
        </>
    );
}
