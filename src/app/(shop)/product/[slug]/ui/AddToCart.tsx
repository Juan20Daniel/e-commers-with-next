'use client';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { Product, ValidSizes } from '@/interfaces/product.interface';
import { useState } from 'react';

interface Props {
    product:Product
}

export const AddToCart = ({product}:Props) => {
    const [ size, setSize ] = useState<ValidSizes | undefined>();
    const [ quantity, setQuantity ] = useState<number>(1);
    const [ posted, setPosted ] = useState<boolean>(false);
    const addToCart = () => {
        setPosted(true);
        if(!size) return;
        console.log({size, quantity})
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
