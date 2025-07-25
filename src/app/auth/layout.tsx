
export default function AuthLayout({children}: {children: React.ReactNode;}) {
  return (
    <main className="bg-gray-500 h-screen min-h-screen w-screen min-w-xs overflow-auto">
      {children}
    </main>
  );
}