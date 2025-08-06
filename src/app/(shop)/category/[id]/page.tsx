import { Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Categories } from "@/interfaces/product.interface";

interface Props {
  params: Promise<{id:Categories}>
}

const categorys:Record<Categories, string> = {
  'kid':'niños', 
  'men':'hombres', 
  'women':'mujeres',
  'unisex': 'todos'
}

const allowedParams = ['kid', 'men', 'women'];
const products = initialData.products;

export default async function({params}:Props) {
  const {id} = await params;
  if(!allowedParams.includes(id)) notFound();

  const productsByCategory =  products.filter(product => product.gender === id);
  
  return (
    <>
      <Title
        title="Tienda"
        subTitle={`Productos para ${categorys[id]}`}
      />
      <ProductGrid products={productsByCategory} />
    </>
  );
}