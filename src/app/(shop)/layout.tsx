import { SideMenu, TopMenu } from "@/components";

export default function ShopLayout({children}: {children: React.ReactNode;}) {
  return (
    <main className="h-screen min-h-screen w-screen min-w-xs overflow-auto relative">
      <TopMenu />
      <SideMenu />
      {children}
    </main>
  );
}