'use server';

import bcrypt from "bcryptjs";
import prisma from "~/lib/prisma";

export const registerUser = async (fullname:string, email:string, password:string) => {
    try { 
        const user = await prisma.user.create({
            data:{
                name:fullname, 
                email, 
                password:bcrypt.hashSync(password)
            },
            select: {
                id: true,
                name: true, 
                email: true
            }
        });
        return {
            ok:true,
            message:'Usuario creado correctamente.',
            user:user
        }
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message:'No se pudo crear el usuario'
        }
    }
}