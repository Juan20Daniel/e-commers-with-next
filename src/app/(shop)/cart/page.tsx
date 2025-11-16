'use client';
import { Spinner, Title } from "@/components";
import { ListItems } from "@/components/cart/list-items/ListItems";
import { OrderSumary } from "@/components/cart/order-summary/OrderSumary";
import { useCartStore } from "@/store/cart/cart-store";
import { redirect } from "next/navigation";

export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  if(!cart) return <Spinner />;
  if(!cart.length) redirect('/empty');
  return (
    <>
      <Title 
        title="Mi Carrito" 
        subTitle="Todos los pruductos agregados en mi carrito de compras"
        boxStyles="flex flex-col items-center"
        btnBack
      />
      <div className="flex flex-col items-center pt-5">
        <div className="w-full max-w-6xl flex flex-col items-center sm:min-h-[500px] lg:flex-row lg:items-start">
          <ListItems />
          <OrderSumary />
        </div>
      </div>
    </>
  );
}