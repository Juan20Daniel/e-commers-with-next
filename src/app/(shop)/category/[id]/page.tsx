import { notFound } from "next/navigation";
interface Props {
  params: Promise<{id:string}>
}

const allowedParams = ['kids', 'men', 'women'];

export default async function({params}:Props) {
  const {id} = await params;
  
  if(!allowedParams.includes(id)) notFound();
  
  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}