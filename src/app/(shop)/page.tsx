import { Title } from "@/components";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImgs } from "../actions";

interface Props {
  searchParams: {
    page:Promise<string>;
  }
}

export default async function Home({searchParams}:Props) {
  const params = await searchParams.page
  console.log(params)
  const{ products} = await getPaginatedProductsWithImgs({});

  return (
    <>
      <Title 
        title="Tienda" 
        subTitle="Todos los productos"
      />
      <ProductGrid 
        products={products}
      />
    </> 
  );
}
