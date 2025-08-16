import Image from "next/image";


export const Item = () => {
    
    return (
        <div className="flex mb-8">
            <div className="relative max-w-[70px] max-h-[70px] sm:max-w-[100px] sm:max-h-[100px]">
                <Image 
                    width={100}
                    height={100}
                    src={`/products/1473809-00-A_1_2000.jpg`}
                    alt="Articulo"
                    className="shadow-[0px_0px_2px_rgba(0,0,0,0.3)] rounded-2xl w-full"
                />
                <div className="absolute bottom-[-9px] w-full flex justify-center">
                    <button className=" bg-red-900 text-white text-[8px] px-2 py-1 rounded-3xl cursor-pointer active:bg-red-700 sm:text-[10px] sm:px-3">
                        Eliminar
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center gap-1 ml-2 xl:ml-5">
                <div className="flex justify-between">
                    <p className="text-[12px] font-bold text-gray-600 sm:text-[15px] xl:text-[18px]">
                        Men's Model Y Launch Series Tree
                    </p>
                    <span className="text-[12px] font-bold ml-2 min-w-[65px] truncate sm:text-[14px] sm:min-w-[75px] xl:mr-10 xl:text-[15px]">$459900.00</span>
                </div>
                <span className="text-[10px] sm:text-[12px] xl:text-[13px]">Burgundy, L</span>
                <span className="text-[10px] sm:text-[12px] xl:text-[13px]">Cantidad: 1</span>
            </div>
        </div>
    );
}