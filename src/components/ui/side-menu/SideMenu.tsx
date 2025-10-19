'use client'
import { useSideMenuStore } from "@/store";
import { 
  IoCloseOutline, 
  IoLogInOutline, 
  IoLogOutOutline, 
  IoManOutline, 
  IoPeopleOutline, 
  IoPersonOutline, 
  IoSearchOutline, 
  IoShirtOutline, 
  IoTicketOutline, 
  IoWomanOutline
} from "react-icons/io5";
import { LiaChildSolid } from "react-icons/lia";
import { OptionMenu } from "./OptionMenu";
import { logout } from "@/app/actions/auth/logout";
import { useRedirectPath } from "@/store/auth/redirect-path";

export const SideMenu = () => {
  const isSideMenuOpen = useSideMenuStore(state => state.isSideMenuOpen);
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
  const getRedirectPath = useRedirectPath(state => state.getRedirectPath);

  return (
    <>
      {isSideMenuOpen && <div className='fixed top-0 left-0 w-screen h-screen z-5 bg-[#0000003a]' />}
      {isSideMenuOpen && <div onClick={closeSideMenu} className='fixed flex top-0 left-0 w-screen h-screen z-5 backdrop-blur-[2px]' />}
      <nav className={`h-screen w-full max-w-md bg-white fixed top-0 right-0 p-5 transform transition-all duration-300 z-10 ${!isSideMenuOpen && 'translate-x-full'}`}>
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
        <OptionMenu value="Perfil" link="/profile" action={() => getRedirectPath("/profile")}>
          <IoPersonOutline size={20} />
        </OptionMenu>
        <OptionMenu value="Ordenes" link="/">
          <IoTicketOutline size={20} />
        </OptionMenu>
        <OptionMenu value="Ingresar" link="/">
          <IoLogInOutline size={20} />
        </OptionMenu>
        <OptionMenu value="Salir" action={() => logout()}>
          <IoLogOutOutline size={20} />
        </OptionMenu>
        <div className="w-full h-px bg-gray-300 my-3" />
        <OptionMenu value="Todos los productos" link="/">
          <IoShirtOutline size={20} />
        </OptionMenu>
        <div className="sm:hidden">
          <OptionMenu value="Hombres" link="/category/men">
            <IoManOutline size={20} />
          </OptionMenu>
          <OptionMenu value="Mujeres" link="/category/women">
            <IoWomanOutline size={20} />
          </OptionMenu>
          <OptionMenu value="Niños" link="/category/kid">
            <LiaChildSolid size={20} />
          </OptionMenu>
        </div>
        <OptionMenu value="Ordenes" link="/">
          <IoTicketOutline size={20} />
        </OptionMenu>
        <OptionMenu value="Usuarios" link="/">
          <IoPeopleOutline size={20} />
        </OptionMenu>
      </nav>
    </>
  )
}
