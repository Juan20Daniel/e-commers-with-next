'use server';

export const registerUser = async (fullname:string, email:string, password:string) => {
    try {
         
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message:'No se pudo crear el usuario'
        }
    }
}