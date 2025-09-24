export const revalidate = 60;
import { Pagination, Title } from "@/components";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Gender } from "@/interfaces/product.interface";
import { getPaginatedProductsWithImgs } from "@/app/actions";

interface Props {
  params: Promise<{gender:Gender}>;
  searchParams: Promise<{page?:string}>;
}

const categorys:Record<Gender, string> = {
  'kid':'niños', 
  'men':'hombres', 
  'women':'mujeres',
  'unisex': 'todos'
}

const allowedParams = ['kid', 'men', 'women'];

export default async function({params, searchParams}:Props) {
  const {gender} = await params;
  const page = (await searchParams).page;
  const numPage = page ? parseInt(page) : 1;
  if(!allowedParams.includes(gender)) notFound();

  const {currentPage, totalPages, products } = await getPaginatedProductsWithImgs({page:numPage, gender});
  
  return (
    <>
      <Title
        title="Tienda"
        subTitle={`Productos para ${categorys[gender]}`}
      />
      {/* <ProductGrid products={products} /> */}
      {/* <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        url={`/gender/${gender}`}
      /> */}
    </>
  );
}