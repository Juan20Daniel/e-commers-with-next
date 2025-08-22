
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { ProductSlidershow } from "@/components/product/slidershow/ProductSlidershow";
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
    <div className="mt-5 mx-5 mb-20 gap-3 md:flex 2xl:gap-15">
      <ProductSlidershow 
        title={product.title}
        images={product.images}
      />
      <div className="col-span-1 pt-5">
        <h1 className={`${titleFont.className} text-xl font-bold 2xl:text-2xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        <SizeSelector availableSizes={product.sizes} defaultSize="S" />
        <p className="font-bold text-sm mb-2">Cantidad</p>
        <div className="h-[40px]">
          <QuantitySelector />
        </div>
        <button className="btn-primary my-5 cursor-pointer">
          Agregar al carrito
        </button>
        <p className="font-bold text-sm">Descripción</p>
        <div className="max-w-[600px]">
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}