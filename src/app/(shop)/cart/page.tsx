'use client';
import { ListItems } from "@/components/cart/list-items/ListItems";
import { OrderSumary } from "@/components/cart/order-summary/OrderSumary";
import { useCartStore } from "@/store/cart/cart-store";
import { redirect } from "next/navigation";

export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  if(!cart) return <p>Loading</p>;
  if(!cart.length) redirect('/empty');
  return (
    <div className="flex flex-col items-center pt-5">
      <h1 className='w-full max-w-[500px] px-4 text-3xl mb-5 lg:max-w-6xl'>
        <span className="font-bold">Mi</span> Carrito
      </h1>
      <div className="w-full max-w-6xl flex flex-col items-center sm:min-h-[500px] lg:flex-row lg:items-start">
        <ListItems />
        <OrderSumary />
      </div>
    </div>
  );
}