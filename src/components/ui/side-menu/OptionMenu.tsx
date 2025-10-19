import { useSideMenuStore } from '@/store';
import { redirect } from 'next/navigation';

interface Props {
    value: string;
    link?: string;
    children:React.ReactNode;
    action?: () => void;
}

export const OptionMenu = ({value, link, children, action}:Props) => {
    const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
    
    const handleClick = () => {
        closeSideMenu();
        if(action) action();
        if(link) redirect(link);
    }
    return (
        <button
            type='button'
            onClick={handleClick}
            className="flex w-full cursor-pointer items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
            {children}
            <span className="text-md">{value}</span>
        </button>
    )
}
