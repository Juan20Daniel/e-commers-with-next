'use server';
import { Order } from "@/interfaces/order.interface";
import prisma from "~/lib/prisma";
type Result = {ok:boolean, message:string, orders?:Order[]}
export const getOrders = async (): Promise<Result> => {
    try {
        const response = await prisma.order.findMany();
        const orders = response.map(order => ({
            id: order.id,
            subTotal: order.subTotal,
            tax: order.tax,
            total: order.total,
            itemInOrder: order.itemInOrder,
            isPaid: order.isPaid,
            createdAt: order.createdAt,
            userId: order.userId
        }))
        return {
            ok:true,
            message:'Lista de ordernes',
            orders
        }
    } catch (error) {
        return {
            ok:false,
            message: 'Error al optener las ordenes'
        }
    }
}