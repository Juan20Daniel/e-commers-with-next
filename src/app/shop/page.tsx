export const revalidate = 60;
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImgs } from "../actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{page?:string}>
}

export default async function Home({searchParams}:Props) {
  const page = (await searchParams).page;
  const numPage = page ? parseInt(page) : 1;
  
  const { products, totalPages, currentPage } = await getPaginatedProductsWithImgs({page:numPage});
 
  if(!products.length) {
    redirect('/');
  }
  return (
    <>
      <Title 
        title="Tienda" 
        subTitle="Todos los productos"
      />
      <ProductGrid 
        products={products}
      />
      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </> 
  );
}
