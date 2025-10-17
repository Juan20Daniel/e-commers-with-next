import Link from "next/link";
import { ListItems } from "@/components/cart/list-items/ListItems";
import { OrderReview } from "@/components/cart/order-review/OrderReview";
export default function ChechoutPage() {
  return (
    <div className="flex flex-col items-center pt-5">
      <h1 className='w-full font-semibold max-w-[500px] px-4 text-3xl mb-2 lg:max-w-6xl'>
        Verificar orden
      </h1>
      <Link href='/cart' className='w-full text-blue-500 underline max-w-[500px] px-4 text-[16px] mb-5 lg:max-w-6xl'>
        Editar carrito
      </Link>
      <div className="w-full max-w-6xl flex flex-col items-center lg:flex-row lg:items-start">
        <ListItems canRemove={false} showQuantitySelector={false}/>
        <OrderReview />
      </div>
    </div>
  );
}