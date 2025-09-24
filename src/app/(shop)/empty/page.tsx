import Image from "next/image";
import Link from "next/link";

export default function EmptyPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[800px]">
      {/* <div className="px-5">
        <Image 
          width={700}
          height={400}
          src='/emptyCart.png'
          alt='Carrito de compras vacío'
        />
      </div>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-semibold sm:text-3xl ">Tu carrito está vacío</h1>
        <h1 className="text-xs sm:text-base">No has agregado ningún producto al carrito aún</h1>
        <Link href='/' className="text-blue-500 mt-2 text-base sm:text-xl">
          Regresar al inicio
        </Link>
      </div> */}
    </div>
  );
}