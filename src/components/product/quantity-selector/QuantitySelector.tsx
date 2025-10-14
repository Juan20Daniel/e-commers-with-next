import { useAlertsStore } from "@/store/ui/alerts-store";
import clsx from "clsx";

interface Props {
    defaultCant: number;
    maxQuantity: number;
    sizeNum?: 'big' | 'small';
    onQuantityCanged: (quantity:number, isIncreasing:boolean) => void;
    onIsIncreasing?:(isIncreasing:boolean) => void;
}

export const QuantitySelector = ({defaultCant, maxQuantity, sizeNum='big', onQuantityCanged}:Props) => {
    const { open:openAlert } = useAlertsStore(state => state);
    const imcrement = () => {
        const newCuantity = defaultCant+1;
        if(newCuantity>maxQuantity) {
            return openAlert({
                type:"alert-message-top",
                message: "Ya agregaste la cantidad máxima de este producto",
            });
        }
        onQuantityCanged(Math.min(maxQuantity, newCuantity), true);
    }
    const decrement = () => {
        const newCuantity = defaultCant-1;
        if(!newCuantity) return;
        onQuantityCanged(Math.max(1, newCuantity), false);
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
