'use client';

import { ScrollContext } from "@/context/ScrollContext";
import { useContext } from "react";

export default function AuthLayout({children}: {children: React.ReactNode;}) {
  const scrollRef = useContext(ScrollContext)?.scrollRef;
  return (
    <main ref={scrollRef} className="bg-gray-500 h-screen min-h-screen w-screen min-w-xs overflow-auto">
      {children}
    </main>
  );
}