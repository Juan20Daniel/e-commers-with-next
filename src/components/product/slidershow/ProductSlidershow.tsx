'use client';

import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import Image from "next/image";

interface Props {
    images: string[];
    title: string;
}
interface ImageSelect {
    id:number;
    img:string, 
    isSelected:boolean
}
interface SelecterImagesProps {
    images: ImageSelect[];
    alt:string;
    selecterImg:(id:number) => void;
    setImage: Dispatch<SetStateAction<string>>;
}
export const ProductSlidershow = ({images, title}:Props ) => {
    const [ image, setImage ] = useState(images[0]);
    const [ imageSelect, setImageSelect ] = useState<ImageSelect[]>([]);
    useLayoutEffect(() => {
        const prepareImageToSelect = images.map((img, index) => ({
            id:index,
            img:img, 
            isSelected: index===0? true : false
        }));
        setImageSelect(prepareImageToSelect);
    },[]);
    const selecterImg = (id:number) => {
        const result = imageSelect.map(img => {
            return img.id === id 
                ? {...img, isSelected:true} 
                : {...img, isSelected:false}
        })
        setImageSelect(result);
    }
    return (
        <div className={`w-auto 
            sm:flex sm:flex-row-reverse sm:justify-end 
            md:flex-col
            xl:flex-row-reverse
        `}>
            <div className="w-full">
                <Image
                    width={700}
                    height={700}
                    alt={title}
                    src={`/products/${image}`}
                    className="rounded-3xl"
                />
            </div>
            <div className={`w-full mt-5 flex gap-2
                sm:max-w-[100px] sm:h-full sm:mt-0 sm:mr-5 sm:flex sm:flex-col
                md:flex-row md:items-start md:max-w-[100%] md:mt-5 md:mr-0
                xl:flex-col xl:max-w-[100px] xl:h-full xl:mr-5 xl:mt-0
            `}>
                <SelecterImages
                    images={imageSelect}
                    alt={title}
                    selecterImg={selecterImg}
                    setImage={setImage}
                />
            </div>
        </div>
    );
}

const SelecterImages = ({images, alt, selecterImg, setImage}:SelecterImagesProps) => {
    return images.map(({id, img, isSelected}) => (
        <button
            className={`rounded-2xl ${isSelected ? 'border-amber-400' : 'border-white'} border-2 cursor-pointer active:opacity-49 transition-all`}
            key={img}
            onClick={() => {
                selecterImg(id);
                setImage(img);
            }}
        >
            <Image
                width={100}
                height={100}
                alt={alt}
                src={`/products/${img}`}
                className="rounded-2xl cursor-pointer"
            />
        </button>
    ));
}