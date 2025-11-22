'use server';
import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address.interface";
import prisma from "~/lib/prisma";
import { getAddress } from "./get-address";

export const saveAddressDB = async (address:Address, countryId:string): Promise<boolean> => {
    try {
        const session = await auth();
        if(!session?.user)  throw new Error('Se requiere autenticación para guardar la dirección.');
        const existAddress = await getAddress();
        await createOrUpdate(address, countryId, session.user.id, !existAddress ? 'create' : 'update');
        return true;
    } catch (error) {
        throw error;
    }
}

const createOrUpdate = async (address:Address, countryId:string, userId:string, action: 'create'|'update') => {
    try {
        const { country, ...rest } = address;
        if(action === 'create') {
            return await prisma.userAddress.create({
                data:{
                    ...rest,
                    countryId: countryId,
                    userId: userId
                }
            });
        }
        await prisma.userAddress.update({
            where: {userId},
            data:{
                ...rest,
                countryId: countryId,
                userId: userId
            }
        });
    } catch (error) {
        throw error;
    }
}