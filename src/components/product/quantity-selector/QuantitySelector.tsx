import clsx from "clsx";

interface Props {
    defaultCant: number;
    maxQuantity: number;
    sizeNum?: 'big' | 'small';
    onQuantityCanged: (quantity:number, isIncreasing:boolean) => void;
    onIsIncreasing?:(isIncreasing:boolean) => void;
}

export const QuantitySelector = ({defaultCant, maxQuantity, sizeNum='big', onQuantityCanged}:Props) => {
    const imcrement = () => {
        onQuantityCanged(Math.min(maxQuantity, defaultCant+1), true);
    }
    const decrement = () => {
        onQuantityCanged(Math.max(1, defaultCant-1), false);
    }
    return (
        
        <div className="flex flex-row gap-1 h-full">
            <button onClick={decrement} className="w-[30px] h-auto flex items-center justify-center bg-gray-100 rounded cursor-pointer transition-all active:bg-gray-200">
                -
            </button>
            <div className="w-[60px] h-full bg-gray-100 flex justify-center items-center rounded select-none">
                <p className={clsx('font-bold',
                    sizeNum === 'big' ? 'text-base' : 'text-xs'
                )}>
                    {defaultCant}
                </p>
            </div>
            <button onClick={imcrement} className="w-[30px] h-full flex items-center justify-center bg-gray-100 rounded cursor-pointer transition-all active:bg-gray-200">
                +
            </button>
        </div>
    )
}
