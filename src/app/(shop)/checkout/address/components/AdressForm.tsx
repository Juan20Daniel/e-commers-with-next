'use client'
import React, { FormEvent, useLayoutEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import { Option } from '@/interfaces/select-option.interface';
import { useRouter } from 'next/navigation';
import { formReducer, initialState } from '@/reducers/formReducer';
import { Input, Select } from '@/components';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { useAlertsStore } from '@/store/ui/alerts-store';
import { useAddressStorage } from '@/store/address/address-store';
import { saveAddressDB } from '@/app/actions/address/save-address';
import { getAddress } from '@/app/actions/address/get-address';
import { Address } from '@/interfaces/address-interface';

interface Props {
    countries:Option[]
}

export const AdressForm = ({countries}:Props) => {
    const [ state, dispatch ] = useReducer(formReducer, initialState);
    const [ select, setSelect ] = useState('');
    const { address, rememberAddress, saveAdderessLS, toggleRememberAddress } = useAddressStorage(state => state);
    const openAlert = useAlertsStore(state => state.open);
    const router = useRouter();
    useLayoutEffect(() => {
        getAdderssFromServices();
    },[]);
    const getAdderssFromServices = async () => {
        let aux_address:Address | null = null;
        if(address.firstname !== '') {
            aux_address = address
        } else {
            aux_address = await getAddress();
        }
        toggleRememberAddress(!!aux_address);
        
        dispatch({
            type:'RESET',
            form: aux_address??initialState.values
        });
    }
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type:'CHANGE_INPUT',
            field: event.target.name,
            value: event.target.value
        });
    }//Buscar la manera de actualizar el valor del select desde adentro del componente
    const handleSelect = () => {
        dispatch({
            type:'CHANGE_INPUT',
            field: 'country',
            value: select
        });
    }
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type:'VALIDATE_INPUTS'
        });
    
        const formErrors = {...state.errors};
        if(state.values.opAddress === '') {
            delete formErrors["opAddress"];
        }
        const thereAreErrors = Object.values(formErrors).map(error => error.valid).includes(false)
        if(thereAreErrors) {
            return openAlert({type:'alert-message-top', message:"Error en uno de los campos", color:'red'});
        }
        if(rememberAddress && !thereAreErrors) {
            saveAdderessLS(state.values);
            const countryid = countries.find(country => country.value === select);
            await saveAddressDB(state.values, countryid!.id);
        }
        console.log(state.values);
        //return router.push('/checkout');
    }

    const clearInput = (field:string) => {
        dispatch({
          type:'CLEAR_INPUT',
          field:field
        });
    }
    return (
        <form className="grid grid-cols-1 gap-4 px-4 pb-10 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Input 
                id='firstname' 
                label='Nombres' 
                type='text'
                errorMessage={
                    state.errors.firstname.status === 'empty' 
                        ? "El campo nombres es requerido"
                        : state.errors.firstname.status === 'invalid'
                            ? 'El nombre no es válido'
                            : undefined
                }
                value={state.values.firstname} 
                onChange={handleChange}
                clearInput={clearInput}
            />
            <Input 
                id='lastname' 
                label='Apellidos' 
                type='text'
                errorMessage={
                    state.errors.lastname.status === 'empty' 
                        ? "El campo apellidos es requerido"
                        : state.errors.lastname.status === 'invalid'
                            ? 'El apellido no es válido'
                            : undefined
                }
                value={state.values.lastname} 
                onChange={handleChange}
                clearInput={clearInput}
            />
            <Input 
                id='address' 
                label='Dirección' 
                type='text'
                errorMessage={
                    state.errors.address.status === 'empty' 
                        ? "El campo dirección es requerido"
                        : state.errors.address.status === 'invalid'
                            ? 'La dirección no es válida'
                            : undefined
                }
                value={state.values.address} 
                onChange={handleChange}
                clearInput={clearInput}
            />
            <Input 
                id='opAddress' 
                label='Dirección 2 (opcional)' 
                type='text'
                errorMessage={
                    state.errors.opAddress.status !== 'empty'
                        ? state.errors.opAddress.status === 'invalid'
                            ? 'La dirección 2 no es válida'
                            : undefined
                        : undefined
                }
                value={state.values.opAddress} 
                onChange={handleChange}
                clearInput={clearInput}
            />
            <Input 
                id='postalCode' 
                label='Código postal'
                type='number'
                max={5}
                errorMessage={
                    state.errors.postalCode.status === 'empty' 
                        ? "El código postal es requerido"
                        : state.errors.postalCode.status === 'invalid'
                            ? 'El código postal no es válido'
                            : undefined
                }
                value={state.values.postalCode} 
                onChange={handleChange}
                clearInput={clearInput}
            />
            <Input 
                id='city' 
                label='Ciudad' 
                value={state.values.city} 
                type='text'
                errorMessage={
                    state.errors.city.status === 'empty' 
                        ? "La ciudad es requerida"
                        : state.errors.city.status === 'invalid'
                            ? 'La ciudad no es válida'
                            : undefined
                }
                onChange={handleChange}
                clearInput={clearInput}
            />
            <Select
                state={select}
                options={countries}
                defaultOption={state.values.country}
                label='País'
                setState={setSelect}
                isRequired={
                    (state.errors.country !== null) &&
                        state.errors.country.status === 'empty'
                            ? true 
                            : false
                }
            />
            <Input
                id='phone' 
                label='Teléfono' 
                value={state.values.phone}
                type='number'
                max={10}
                errorMessage={
                    state.errors.phone.status === 'empty' 
                        ? "El teléfono es requerido"
                        : state.errors.phone.status === 'invalid'
                            ? 'El teléfono no es válido'
                            : undefined
                }
                onChange={handleChange}
                clearInput={clearInput}
            />
            <div className="flex gap-5 mb-2 items-center sm:flex-row sm:col-span-2">
                <Checkbox />
                <span>¿Recordar dirección?</span>
            </div>
            <div className="flex flex-col-reverse pt-10 gap-5 mb-2 sm:flex-row sm:justify-end sm:col-span-2">
                <Link
                    href='/cart'
                    className="py-2 px-4 bg-gray-100 rounded transition-all flex w-full justify-center hover:bg-gray-200 active:bg-gray-100 sm:w-1/5"
                >
                    Átras
                </Link>
                <button
                    type='submit'
                    className="btn-primary flex w-full cursor-pointer sm:w-1/5 justify-center "
                >
                    Siguiente
                </button>
            </div>
        </form>
    );
}