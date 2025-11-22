'use server';

import { Product } from "@/app/generated/prisma";
import { auth } from "@/auth.config";
import type { Address } from "@/interfaces/address.interface";
import type { ValidSizes } from "@/interfaces/product.interface";
import prisma from "~/lib/prisma";

interface ProductToOrder {
    productId:string;
    quantity: number;
    size: ValidSizes;
}

export const placeOrder = async (productToOrder: ProductToOrder[], address: Address) => {
    const session = await auth();
    if(!session?.user) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        }
    }
    const productInStockDB:Product[] = await prisma.product.findMany({
        where: {
            id: {
                in: productToOrder.map(p => p.productId)
            }
        }
    });
    const productsInOrder = productToOrder.reduce((count, product) => count+product.quantity,0);
    const totals = productToOrder.reduce((totals, product) => {
        const productDB = productInStockDB.find(proDB => proDB.id === product.productId);
        let subTotal = productDB?.price!*product.quantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal*0.15;
        totals.total += subTotal*1.15;
        return totals;
    }, {subTotal:0, tax:0, total:0});
    console.log(totals);
    // console.log({productToOrder, address, userId:session.user.id})
}