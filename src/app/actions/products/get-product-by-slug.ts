import prisma from "~/lib/prisma";

export const getProductBySlug = async (slug:string) => {
    try {
        const productDB = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url:true
                    }
                }
            },
            where: {slug:slug}
        })
        if(!productDB) return null;
        const { ProductImage, ...rest } = productDB
        const product = {
            ...rest,
            images:productDB?.ProductImage.map(img => img.url)
        }
        return product;
    } catch (error) {
        console.log(error);
        throw new Error('Error al consultar los productos');
    }
}