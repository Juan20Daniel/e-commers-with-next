'use client'
import { SideMenu, TopMenu } from "@/components";
import { ScrollContext } from "@/context/ScrollContext";
import { useContext } from "react";

export default function ShopLayout({children}: {children: React.ReactNode;}) {
  const scrollRef = useContext(ScrollContext)?.scrollRef;
  return (
    <main ref={scrollRef} className="border-b-1 h-screen min-h-screen w-screen min-w-xs overflow-auto relative">
      <TopMenu />
      <SideMenu />
      {children}
    </main>
  );
}