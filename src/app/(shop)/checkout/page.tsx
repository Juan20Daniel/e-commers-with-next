import { ListItems } from "@/components/cart/list-items/ListItems";
import { OrderReview } from "@/components/cart/order-review/OrderReview";
import { Title } from "@/components";
export default function ChechoutPage() {
  return (
    <>
      <Title
        title="Verificar orden"
        btnBack
        urlBack='/checkout/address'
        boxStyles="flex flex-col items-center"
      />
      <div className="flex flex-col items-center mt-10">
        <div className="w-full max-w-6xl flex flex-col items-center lg:flex-row lg:items-start">
          <ListItems 
            canRemove={false} 
            showQuantitySelector={false}
            goToPeoduct={false}
          />
          <OrderReview />
        </div>
      </div>
    </>
  );
}