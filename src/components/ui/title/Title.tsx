import { titleFont } from "@/config/fonts";

interface Props {
    title:string;
    subTitle?:string;
    className?: string;
}

export const Title = ({title, subTitle, className}:Props) => {
    return (
        <div className={`mt-3 ${className} sticky top-0 z-1`}>
            <h1 className={`${titleFont.className} antialiased text-4xl font-semibold px-5 select-none`}>{title}</h1>
            {subTitle && 
                <div className="py-3 mb-5 px-5 backdrop-blur-xs">
                    <h3 className="text-xl select-none">{subTitle}</h3>
                </div>
            }
        </div>
    );
}
