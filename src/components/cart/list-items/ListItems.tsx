'use client';

import React, { useContext, useEffect } from 'react';
import { ScrollContext } from '@/context/ScrollContext';
import { Item } from '../item/Item';

interface Props {
  canRemove:boolean;
  showQuantitySelector:boolean;
}

export const ListItems = ({canRemove=true, showQuantitySelector=true}:Props) => {
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
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
      <Item canRemove={canRemove} showQuantitySelector={showQuantitySelector}/>
    </div>
  )
}
