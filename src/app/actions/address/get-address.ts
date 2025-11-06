'use server';

import { UserAddress } from "@/app/generated/prisma";
import { auth } from "@/auth.config";
import prisma from "~/lib/prisma";

export const getAddress = async (): Promise<UserAddress|null> => {
    try {
        const session = await auth();
        if(!session?.user) throw new Error('Se requiere autenticación para consultar la dirección.');
        const address = await prisma.userAddress.findUnique({
            where: {userId:session.user.id}
        });
        return address;
    } catch (error) {
        throw error;
    }
}