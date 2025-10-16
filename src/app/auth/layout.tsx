'use client';

import { AlertMessageTop } from "@/components";

export default function AuthLayout({children}: {children: React.ReactNode;}) {
 
  return (
    <main className="relative flex justify-center">
      <div className="w-full sm:w-[450px] px-10">
        {children}
      </div>
      <AlertMessageTop />
    </main>
  );
}