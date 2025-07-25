
export default function ShopLayout({children}: {children: React.ReactNode;}) {
  return (
    <main className="bg-red-500 h-screen min-h-screen w-screen min-w-xs overflow-auto">
      {children}
    </main>
  );
}