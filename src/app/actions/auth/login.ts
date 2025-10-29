'use server';
 
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
let counterErrors = 0;
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {...Object.fromEntries(formData), redirect:false});
    return 'Success';
  } catch (error) {
    console.log(error)
    counterErrors++;
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return `Invalid credentials ${counterErrors}`;
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const login = async (email:string, password:string) => {
  try {
    await signIn('credentials', {email, password});

    return {
      ok:true,
      message:"Inicio de sessión",
    }
  } catch (error) {
    return {
      ok:false,
      message:"Error al iniciar sessión",
    }
  }
}