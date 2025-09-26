'use client';
import { getStockBySlug } from '@/app/actions/products/get-stock-by-slug';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
    slug:string;
}

export const StockLabel = ({slug}:Props) => {
    const [ stock, setStock ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        getStock();
    },[]);
    const getStock = async () => {
        const result = await getStockBySlug(slug);
        setStock(result);
        setIsLoading(false);
    }
    return (
       <>
           {!isLoading 
                ?   <h1 className={`${titleFont.className} text-xl font-bold 2xl:text-lg`}>
                        Stock: {stock}
                    </h1>
                :   <h1 className={`${titleFont.className} text-xl font-bold bg-gray-200 animate-pulse 2xl:text-lg`}>
                        &nbsp;
                    </h1>
                }
       </>
    )
}
