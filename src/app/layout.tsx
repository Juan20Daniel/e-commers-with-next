import type { Metadata } from "next";
import { interLight } from "@/config/fonts";
import { ScrollProvider } from "@/context/ScrollContext";
import "./globals.css";
import { Provider } from "@/components/providers/Provider";

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
        <Provider>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </Provider>
      </body>
    </html>
  );
}