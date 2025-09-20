import clsx from 'clsx';
import Link from 'next/link';

interface Props {
    numberPage:number;
    currentPage:number;
    url:string;
}

export const NavLink = ({numberPage, currentPage, url}:Props) => {
    return (
        <li className="page-item">
            <Link
                href={`${url}?page=${numberPage}`} 
                className={
                    clsx(
                        "page-link px-1 h-[28px] flex justify-center items-center rounded outline-none transition-all duration-300 focus:shadow-none",
                        "sm:py-1.5 sm:px-3",
                        "xl:py-2",
                        numberPage===currentPage ? "hover:bg-blue-400 bg-blue-600 text-white" : "hover:bg-gray-200 bg-transparent text-gray-800 hover:text-gray-800"
                    )
                }
            >
                {numberPage}
            </Link>
        </li>
    );
}
