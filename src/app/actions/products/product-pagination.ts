'use server';
import { Gender } from "@/app/generated/prisma";
import prisma from "~/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?:Gender;
}

export const getPaginatedProductsWithImgs = async ({page=1, take=12, gender}:PaginationOptions) => {
    if(isNaN(Number(page))) page = 1;
    if(isNaN(Number(take))) take = 12;
    if(page < 1) page = 1;
    try {
        const productsDBPromise = prisma.product.findMany({
            take:take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                },
            },
            where:{gender:gender}
        });
        
        const getTotalNumberProductsPromise = prisma.product.count({
            where:{gender:gender}
        });

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
        throw new Error('Error al consultar los productos');
    }
}