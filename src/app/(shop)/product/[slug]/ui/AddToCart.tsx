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

    return (
        <>
            <SizeSelector 
                defaultSize={size} 
                availableSizes={product.sizes}
                onSizeChange={(sizeSelected) => setSize(sizeSelected)}
            />
            <p className="font-bold text-sm mb-2">Cantidad</p>
            <div className="h-[40px]">
                <QuantitySelector />
            </div>
            <button className="btn-primary my-5 cursor-pointer">
                Agregar al carrito
            </button>
        </>
    );
}
