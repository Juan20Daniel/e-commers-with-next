'use server';
import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address-interface";
import prisma from "~/lib/prisma";
import { getAddress } from "./get-address";

export const saveAddressDB = async (address:Address, countryId:string): Promise<boolean> => {
    try {
        const session = await auth();
        if(!session?.user)  throw new Error('Se requiere autenticación para guardar la dirección.');
        const existAddress = await getAddress();
        if(!existAddress) {
            await insertAddress(address, countryId, session.user.id);
            return true;
        }
        await updateAddress(address, countryId, session.user.id);
        return true;
    } catch (error) {
        throw error;
    }
}

const insertAddress = async (address:Address, countryId:string, userId:string) => {
    try {
        const { country, ...rest } = address;
        await prisma.userAddress.create({
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

const updateAddress = async (address:Address, countryId:string, userId:string) => {
    try {
         const { country, ...rest } = address;
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