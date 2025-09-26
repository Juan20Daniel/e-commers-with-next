import type { Metadata } from "next";
import { interLight } from "@/config/fonts";
import { ScrollProvider } from "@/context/ScrollContext";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template:"%s - Teslo | Shop",
    default: "Teslo | Shop"
  },
  description: "Tienda virtual de productos en venta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interLight.className} antialiased`}
      >
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
