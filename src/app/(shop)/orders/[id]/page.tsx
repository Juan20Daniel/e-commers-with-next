import { ListItems } from "@/components/cart/list-items/ListItems";
import { OrderReview } from "@/components/cart/order-review/OrderReview";
import { IoCardOutline } from "react-icons/io5";
import clsx from "clsx";

interface Props {
  params: Promise<{id:string}>
}

export default async function OrderPage({params}:Props) {
  const {id} = await params;

  return (
    <div className="flex flex-col items-center pt-5">
      {/* <h1 className='w-full font-semibold max-w-[500px] px-4 text-3xl mb-2 lg:max-w-6xl'>
        Orden #{id}
      </h1>
      <div className="w-full max-w-6xl flex flex-col items-center lg:flex-row lg:items-start">
        <ListItems canRemove={false} showQuantitySelector={false}>
          <div className={
            clsx("h-[50px]  mb-7 rounded-[10px] flex flex-row items-center px-4 gap-3",
              {
                'bg-red-500':false,
                'bg-green-700':true
              }
            )
          }>
            <IoCardOutline className="text-white" size={25} />
          
            <span className="text-white text-ls">Pagada</span>
          </div>
        </ListItems>
        <OrderReview showBtnAction={false}>
          <div className={
            clsx("h-[50px] rounded-[10px] flex flex-row items-center px-4 gap-3",
              {
                'bg-red-500':false,
                'bg-green-700':true
              }
            )
          }>
            <IoCardOutline className="text-white" size={25} />
          
            <span className="text-white text-ls">Pagada</span>
          </div>
        </OrderReview>
      </div> */}
    </div>
  );
}


    