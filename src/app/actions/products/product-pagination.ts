'use server';
import prisma from "~/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number; 
}

export const getPaginatedProductsWithImgs = async ({page=1, take=12}:PaginationOptions) => {
    if(isNaN(Number(page))) page = 1;
    if(isNaN(Number(take))) take = 12;
    if(page < 1) page = 1;
    try {
        const productsDBPromise = prisma.product.findMany({
            take:take,
            skip: (page - 1) * take,
            include: {
                //tomar dos imagenes y que solo seleccione la url
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        });

        const getTotalNumberProductsPromise = prisma.product.count({});

        const [productsDB, getTotalNumberProducts ] = await Promise.all([
            productsDBPromise,
            getTotalNumberProductsPromise
        ]);
        const totalPages = Math.ceil(getTotalNumberProducts/take);
        const products = productsDB.map(({categoryId, ProductImage, ...product}) => ({
            ...product,
            images: ProductImage.map(img => img.url)
        }));
        return {
            currentPage: page,
            totalPages: totalPages,
            products
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al consultar los productos')
    }
}