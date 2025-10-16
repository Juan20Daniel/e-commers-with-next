import { initialData } from "./seed";
import prisma from "../../lib/prisma";

async function main() {
    
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    const {categories, products, users} = initialData;

    await prisma.user.createMany({
        data:users
    });

    const categorys = categories.map(category => ({name:category}));
    await prisma.category.createMany({
        data: categorys
    });

    const categoryIdsFromDB = await prisma.category.findMany();

    const categoriesMap = categoryIdsFromDB.reduce((map, category) => {
        map[category.name.toLowerCase()]=category.id
        
        return map;
    }, {} as Record<string, string>);

    products.forEach(async (product) => {
        const { images, type, ...rest } = product

        const productDB = await prisma.product.create({
            data: {
                ...rest,
                categoryId:categoriesMap[product.type.toLowerCase()]
            }
        });

        const imagesData = images.map(img => {
            return {
                url:img,
                productId: productDB.id 
            }
        });
        await prisma.productImage.createMany({
            data:imagesData
        });
    });
    console.log('Seed executed')
}
(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();