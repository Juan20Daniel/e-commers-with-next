'use server';

import prisma from "~/lib/prisma";

export const getOrderById = async (orderId:string) => {
    try {
        const order = await prisma.order.findFirst({
            where: {id: orderId},
            include: {
               orderAddresses: true,
               order: true
            }
        });
        // console.log(order);
    } catch (error) {
        return {
            ok: false,
            message: 'Error al optener los datos de la orden'
        }
    }
}