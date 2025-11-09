'use server';
import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address-interface";
import prisma from "~/lib/prisma";

export const getAddress = async (): Promise<Address|null> => {
    try {
        const session = await auth();
        if(!session?.user) throw new Error('Se requiere autenticación para consultar la dirección.');
        const address = await prisma.userAddress.findUnique({
            include: {
                country:true
            },
            where: {userId:session.user.id}
        });
        if(!address) return null;
        const {country, countryId, id, userId, opAddress, ...rest} = address;
        return {
            ...rest,
            country:country.name,
            opAddress:opAddress??''
        }
    } catch (error) {
        throw error;
    }
}