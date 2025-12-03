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
    if(productToOrder.length === 0) {
        return {
            ok:false,
            message: 'El carrito esta vacío'
        }
    }
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

    try {
        const prismaTransaction = await prisma.$transaction( async (tr) => {
            const updateProductsDBPromises = productInStockDB.map(productDB => {
                const reagroupProductsInOrder = productToOrder
                .filter(p => p.productId === productDB.id)
                .reduce((acc, currentItem) => currentItem.quantity+acc, 0);

                if(reagroupProductsInOrder === 0) {
                    throw new Error(`${productDB.id}, no tiene cantidad definida`);
                }

                return tr.product.update({
                    where: {id: productDB.id},
                    data: {
                        inStock: {
                            decrement: reagroupProductsInOrder
                        }
                    }
                })
            });

            const updateProducts = await Promise.all(updateProductsDBPromises);
            
            updateProducts.forEach(productDB => {
                if(productDB.inStock < 0) {
                    throw new Error(`${productDB.title} 'no hay suficientes productos en stock en este momento para satisfacer su compra, intente mas tarde.'`)
                }
            });
            const order = await tr.order.create({
                data: {
                    userId: session.user.id,
                    subTotal:totals.subTotal,
                    tax: totals.tax,
                    total: totals.total,
                    itemInOrder: productsInOrder,
                    order: {
                        createMany: {
                            data: productToOrder.map(p => ({
                                quantity: p.quantity,
                                price: productInStockDB.find(productDB => productDB.id === p.productId)?.price??0,
                                size: p.size,
                                productId: p.productId
                            }))
                        }
                    }
                }
            });

            const countryDB = await tr.countries.findFirst({
                where: {name:address.country}
            });

            const {country, ...restAddress} = address;
            const saveOrderAddress = await tr.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: countryDB?.id!,
                    orderId3: order.id
                }
            });
            return {
                order:order,
                updateProducts: updateProducts,
                orderAddress: saveOrderAddress
            }
        });
        return {
            ok:true,
            order: prismaTransaction.order,
            prismaTransaction: prismaTransaction,
        }
    } catch (error:any) {
        return {
            ok:false,
            message: error?.message
        }
    }
   
}