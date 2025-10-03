'use client';

import React, { useContext, useEffect } from 'react';
import { ScrollContext } from '@/context/ScrollContext';
import { Item } from '../item/Item';
import { useCartStore } from '@/store/cart/cart-store';

interface Props {
  canRemove?:boolean;
  showQuantitySelector?:boolean;
  children?: React.ReactNode;
}

export const ListItems = ({canRemove=true, showQuantitySelector=true, children}:Props) => {
  const cart = useCartStore(state => state.cart);
  const scrollRef = useContext(ScrollContext)?.scrollRef;
  const setIsScrolling = useContext(ScrollContext)?.setIsScrolling;
  
  useEffect(() => {
    const scroll = scrollRef!.current;
    if (!scroll) return;
    const onScroll = () => {
      setIsScrolling!(scroll.scrollTop > 0);
    }
    scroll.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroll.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <div className='w-full max-w-[500px] px-4 pb-17 lg:max-w-[900px]'>
      {children}
      {cart.map((product, index) => (
        <Item
          key={product.id+`${index}`}
          product={product}
          canRemove={canRemove} 
          showQuantitySelector={showQuantitySelector}
        />
      ))}
    </div>
  )
}