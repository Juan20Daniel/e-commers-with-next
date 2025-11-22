'use client'
import React, { FormEvent, useLayoutEffect, useReducer, useEffect, useState } from 'react';
import Link from 'next/link';
import { Option } from '@/interfaces/select-option.interface';
import { useRouter } from 'next/navigation';
import { formReducer, initialState } from '@/reducers/formReducer';
import { Input, Select } from '@/components';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { useAlertsStore } from '@/store/ui/alerts-store';
import { saveAddressDB } from '@/app/actions/address/save-address';
import { getAddress } from '@/app/actions/address/get-address';
import { Address } from '@/interfaces/address.interface';
import { removeAddress } from '@/app/actions/address/remove-address';
import { useAddressStorage } from '@/store/address/address-store';

interface Props {
    countries:Option[]
}

export const AdressForm = ({countries}:Props) => {
    const [ rememberAddress, setRememberAddress ] = useState(false);
    const [ state, dispatch ] = useReducer(formReducer, initialState);
    const { saveAdderessLS} = useAddressStorage(state => state);
    const openAlert = useAlertsStore(state => state.open);
    const router = useRouter();
    useLayoutEffect(() => {
        getAdderssFromDB();
    },[]);

    const getAdderssFromDB = async () => {
        let address: Address | null = await getAddress();
        if(address) {
            setRememberAddress(true);
            return dispatch({
                type:'INITIALIZER',
                form: address??initialState.values
            });
        }
        dispatch({
            type:'RESET',
        });
    }
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type:'CHANGE_INPUT',
            field: event.target.name,
            value: event.target.value
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
            const countryid = countries.find(country => country.value === state.values.country);
            await saveAddressDB(state.values, countryid!.id);
        }
        saveAdderessLS(state.values);
        if(!rememberAddress) {
            clearInputs();
        }
        return router.push('/checkout');
    }

    const clearInput = (field:string) => {
        dispatch({
          type:'CLEAR_INPUT',
          field:field
        });
    }
    const clearInputs = () => {
        removeAddress();
        dispatch({
            type:'RESET',
        })
    }
    return (
        <form className="grid grid-cols-1 mt-3 gap-4 px-4 pb-10 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
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
                id='country' 
                state={state.values.country}
                options={countries}
                label='País'
                onChange={handleChange}
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
                <Checkbox 
                    rememberAddress={rememberAddress}
                    setRememberAddres={setRememberAddress}
                />
                <span>¿Recordar dirección?</span>
            </div>
            <div className="flex pt-10 gap-5 mb-2 sm:justify-end sm:col-span-2">
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