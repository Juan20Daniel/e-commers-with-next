import type { Metadata } from "next";
import { interLight } from "@/config/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "Teslo | Shop",
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
        {children}
      </body>
    </html>
  );
}
