
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{slug:string}>;
}

export default async function ProductPage({params}:Props) {
  const { slug } = await params;
  const product = initialData.products.find(product => product.slug === slug)
  if(!product) {
    notFound();
  }
  return (
    <div className="mt-5 mx-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <p>Hola</p>
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className}`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        
        <SizeSelector availableSizes={product.sizes} defaultSize="S" />
        <button className="btn-primary my-5 cursor-pointer">
          Agregar al carrito
        </button>
        <p className="font-bold text-sm">Descripción</p>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}