'use client'
import { useContext, useEffect } from "react";
import { Footer, SideMenu, TopMenu } from "@/components";
import { ScrollContext } from "@/context/ScrollContext";
import { useSearchParams } from "next/navigation";

export default function ShopLayout({children}: {children: React.ReactNode;}) {
  const scrollRef = useContext(ScrollContext)?.scrollRef;
  let searchParams = useSearchParams();
  let page = searchParams.get('page');

  useEffect(() => {
    handleRouteChange();
  }, [page]);
  const handleRouteChange = () => {
    const element = document.querySelector("#main-scroll");
    element?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  
  return (
    <main ref={scrollRef} id='main-scroll' className="border-b-1 h-screen min-h-screen w-screen min-w-xs overflow-auto relative">
      <TopMenu />
      <SideMenu />
      {children}
      <Footer />
    </main>
  );
}