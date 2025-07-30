'use client';
import { useState } from "react";
import { Product } from "@/interfaces/product.interface"
import Image from "next/image";
import Link from "next/link";

interface Props {
    product: Product;
}

export const ProductGridItem = ({product}:Props) => {
    const [ displayImg, setDisplayImg ] = useState(product.images[0]);
    return (
        <div className="overflow-hidden fade-in">
            <div className="w-full aspect-square rounded-2xl">
                <Link href={`/product/${product.slug}`}>
                    <Image 
                        src={`/products/${displayImg}`}
                        alt='Product photo'
                        className="w-full h-full object-cover rounded-2xl cursor-pointer active:opacity-55 transition-all select-none"
                        width={500}
                        height={500}
                        onMouseEnter={() => setDisplayImg(product.images[1])}
                        onMouseLeave={() => setDisplayImg(product.images[0])}
                    />
                </Link>
            </div>
            <div className="p-4 flex flex-col items-start text-xs md:text-sm 2xl:text-[16px]">
                <Link href={`/product/${product.slug}`} className="transition-all hover:underline active:text-gray-400 select-none">
                    {product.title}
                </Link>
                <span className="font-bold select-none">${product.price}</span>
            </div>
        </div>
    );
}
