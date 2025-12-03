import { getOrders } from "@/app/actions/order/get-orders";
import { Title } from "@/components";
import { OrdersGrid } from "@/components/order/OrdersGrid";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";


export default async function OrdersPage() {
  const orders = await getOrders();
  if(!orders.ok) {
    return <p>Error al obtener las ordenes</p>
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <Title title="Todas mis ordenes" />
        <div className="mb-10 mx-5 mt-5">
          <OrdersGrid orders={orders.orders!} />   
        </div>
      </div>
    </div>
  );
}