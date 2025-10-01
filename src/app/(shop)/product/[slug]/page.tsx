export const revalidate = 604800;
import { getProductBySlug } from "@/app/actions/products/get-product-by-slug";
import { ProductSlidershow } from "@/components/product/slidershow/ProductSlidershow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

export async function generateStaticParams() {
  return [];
}
interface Props {
  params: Promise<{slug:string}>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = await params;
  const product = await getProductBySlug(slug);
  if(!product) {
    return {
      title: 'Producto no encontrado',
      description: 'Producto no encontrado',
    }
  }
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      // images: [`/products/${product.images[1]}`],
    }
  }
}

export default async function ProductPage({params}:Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if(!product) {
    notFound();
  }

  return (
    <div className="mt-5 mx-5 mb-10 gap-3 md:flex 2xl:gap-15">
      <ProductSlidershow 
        title={product.title}
        images={product.images}
      />
      <div className="col-span-1 pt-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} text-xl font-bold 2xl:text-2xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        <AddToCart product={product} />
        <p className="font-bold text-sm">Descripción</p>
        <div className="max-w-[600px]">
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}