'use client'
import Link from "next/link";
import { useUiStore } from "@/store";
import { 
  IoCloseOutline, 
  IoLogInOutline, 
  IoLogOutOutline, 
  IoPeopleOutline, 
  IoPersonOutline, 
  IoSearchOutline, 
  IoShirtOutline, 
  IoTicketOutline 
} from "react-icons/io5";

export const SideMenu = () => {
  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUiStore(state => state.closeSideMenu);
  return (
    <>
      {isSideMenuOpen && <div className='fixed top-0 left-0 w-screen h-screen z-5 bg-[#0000003a]' />}
      {isSideMenuOpen && <div onClick={closeSideMenu} className='fixed flex top-0 left-0 w-screen h-screen z-5 backdrop-blur-[2px]' />}
      <nav className={`
        h-screen w-full 
        max-w-md 
        bg-white 
        fixed 
        top-0 
        right-0 
        p-5 
        transform 
        transition-all 
        duration-300 
        z-10 
        ${!isSideMenuOpen && 'translate-x-full'}
      `}>
        <IoCloseOutline
          title="Cerrar"
          size={30}
          color="black"
          className="absolute right-5 cursor-pointer active:opacity-55 transition-all"
          onClick={() => closeSideMenu()}
        />
        <div className="relative mt-14 pb-5">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input 
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={20} />
          <span className="text-md">Perfil</span>
        </Link>
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={20} />
          <span className="text-md">Ordenes</span>
        </Link>
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={20} />
          <span className="text-md">Ingresar</span>
        </Link>
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={20} />
          <span className="text-md">Salir</span>
        </Link>
        <div className="w-full h-px bg-gray-300 my-3" />
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={20} />
          <span className="text-md">Productos</span>
        </Link>
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={20} />
          <span className="text-md">Ordenes</span>
        </Link>
        <Link 
          href="/"
          className="flex items-center mt-2 p-2 gap-3 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={20} />
          <span className="text-md">Usuarios</span>
        </Link>
      </nav>
    </>
  )
}
