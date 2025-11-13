'use server';
import { auth } from "@/auth.config";
import prisma from "~/lib/prisma";
import { getAddress } from "./get-address";

export const removeAddress = async () => {
    try {
        const address = await getAddress();
        if(!address) return true;
        const session = await auth();
        
        await prisma.userAddress.delete({
            where: {userId:session!.user.id}
        });

        return true;
    } catch (error) {
        throw error;
    }
}