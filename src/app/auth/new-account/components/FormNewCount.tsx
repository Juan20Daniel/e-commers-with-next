'use client'
import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { registerUser } from '@/app/actions/auth/register';
import { useAlertsStore } from '@/store/ui/alerts-store';
import { login } from '@/app/actions/auth/login';
import { useRouter } from 'next/navigation';
import { useRedirectPath } from '@/store/auth/redirect-path';


type Inputs = {
  fullname: string;
  email: string;
  password: string;
}

export const FormNewCount = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const redirectPath = useRedirectPath(state => state.redirectPath);
    
    const openAlert = useAlertsStore(state => state.open);
    const onSubmit:SubmitHandler<Inputs> = async (data) => {
        const { fullname, email, password } = data;
        const result = await registerUser(fullname, email, password);
        if(!result.ok) {
            openAlert({
                type:'alert-message-top',
                message: result.message,
                color: 'red'
            });
            return;
        }
        await login(email, password);
        window.location.replace(`${redirectPath??'/'}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
           
            <label htmlFor="fullname">Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 bg-gray-200 border-gray-200 border outline-none mb-1 rounded ",
                        {
                            'border-red-500':!!errors.fullname 
                        }
                    )
                }
                type="text"
                {...register("fullname", {required:true})}
            />
            {/* {(errors.fullname?.type === 'required') && 
                <span className='text-red-500'>*El nombre es obligatorio</span> 
            } */}
            <div className='w-full mb-4' />
            <label htmlFor="fullname">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 bg-gray-200 border-gray-200 border outline-none mb-1 rounded ",
                        {
                            'border-red-500':!!errors.email
                        }
                    )
                }
                type="email"
                {...register("email", {required:true})}
            />
            <div className='w-full mb-4' />
            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 bg-gray-200 border-gray-200 border outline-none mb-1 rounded ",
                        {
                            'border-red-500':!!errors.password
                        }
                    )
                }
                type="password"
                {...register("password", {required:true, minLength:6})}
            />
            <div className='w-full mb-4' />
            <button className="btn-primary" type='submit'>Crear</button>
            {/* divisor l ine */ }
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500" />
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500" />
            </div>
            <Link href="/auth/login" className="btn-secondary text-center">
                Iniciar sesión
            </Link>
        </form>
    );
}