import { Title } from "@/components";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

export default function OrdersPage() {
  return (
    <div className="flex flex-col items-center">
      {/* <div className="w-full max-w-7xl">
        <Title title="Orders" />
        <div className="mb-10 mx-5 mt-5 overflow-auto">
          <div className="min-w-[628px]">
            <table className="w-full">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left md:px-6 md:py-4">
                    #ID
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left md:px-6 md:py-4">
                    Nombre completo
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left md:px-6 md:py-4">
                    Estado
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 text-left px-4 py-2 md:px-6 md:py-4">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="whitespace-nowrap text-sm font-medium text-gray-900 px-4 py-2 md:px-6 md:py-4">1</td>
                  <td className="text-sm text-gray-900 font-light whitespace-nowrap px-4 py-2 md:px-6 md:py-4">
                    Mark
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light whitespace-nowrap px-4 py-2 md:px-6 md:py-4">
                    <IoCardOutline className="text-green-800" />
                    <span className='mx-2 text-green-800'>Pagada</span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-4 md:px-6">
                    <Link href="/orders/123" className="hover:underline">
                      Ver orden
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="whitespace-nowrap text-sm font-medium text-gray-900 px-4 py-2 md:px-6 md:py-4">1</td>
                  <td className="text-sm text-gray-900 font-light whitespace-nowrap px-4 py-2 md:px-6 md:py-4">
                    Mark
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-4 py-2 whitespace-nowrap md:px-6 md:py-4">
                    <IoCardOutline className="text-red-800" />
                    <span className='mx-2 text-red-800'>No Pagada</span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-4 md:px-6">
                    <Link href="/orders/123" className="hover:underline">
                      Ver orden
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
}