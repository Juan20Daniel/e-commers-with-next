'use client';

import { ScrollContext } from "@/context/ScrollContext";
import { useContext } from "react";

export default function AuthLayout({children}: {children: React.ReactNode;}) {
  const scrollRef = useContext(ScrollContext)?.scrollRef;
  return (
    <main ref={scrollRef} className="flex justify-center">
      <div className="w-full sm:w-[450px] px-10">
        {children}
      </div>
    </main>
  );
}