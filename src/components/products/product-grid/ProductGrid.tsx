import { Product } from '@/interfaces/product.interface'
import React from 'react'
import { ProductGridItem } from './ProductGridItem';

interface Props {
    products: Product[];
}

export const ProductGrid = ({products}:Props) => {
    return (
        <div className='grid grid-cols-2 gap-5 mb-10 px-5 md:grid-cols-3 2xl:grid-cols-4 2xl:gap-10 '>
            {products.map(product => (
                <ProductGridItem key={product.slug} product={product} />
            ))}
        </div>
    );
}
