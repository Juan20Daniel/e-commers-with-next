'use client'
import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';


type Inputs = {
  fullname: string;
  email: string;
  password: string;
}

export const FormNewCount = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit:SubmitHandler<Inputs> = async (data) => {
        const { fullname, email, password } = data;
        console.log({ fullname, email, password } )
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