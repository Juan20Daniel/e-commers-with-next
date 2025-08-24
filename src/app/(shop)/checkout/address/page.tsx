'use client'
import Link from 'next/link';
import { useReducer, useState, useEffect, FormEvent } from 'react';
import { Input, Select, Title } from '@/components';
import { Option } from '@/interfaces/select-option.interface';
import { formReducer, initialState } from '@/reducers/formReducer';

const options:Option[] = [
  {id:1, value:'Monterrrey', isSelected:false},
  {id:2, value:'Polonioa', isSelected:false},
  {id:3, value:'México', isSelected:false},
  {id:4, value:'Colima', isSelected:false},
  {id:5, value:'Manzanillo', isSelected:false},
  {id:6, value:'Comala', isSelected:false},
  {id:7, value:'Comala', isSelected:false},
]

export default function AddressPage() {
  const [ state, dispatch ] = useReducer(formReducer, initialState);
  const [ select, setSelect ] = useState<Option>({id:1, value:'', isSelected:false});
  useEffect(() => {
    handleSelect();
  },[select.value]);
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type:'CHANGE_INPUT',
      field: event.target.name,
      value: event.target.value
    });
  }
  const handleSelect = () => {
    dispatch({
      type:'CHANGE_INPUT',
      field: 'country',
      value: select.value
    });
  }
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type:'VALIDATE_INPUTS'
    });
  }
  return (
    <>
      <div className="flex justify-center">
      <div className="w-full max-w-[1000px]">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <form className="grid grid-cols-1 gap-2 px-4 pb-10 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <Input 
            id='fullname' 
            label='Nombres' 
            type='text'
            errorMessage={
              state.errors.fullname === 'empty' 
                ? "El campo nombres es requerido"
                : state.errors.fullname === 'invalid'
                  ? 'El nombre no es válido'
                  : undefined
            }
            value={state.values.fullname} 
            onChange={handleChange} 
          />
          <Input 
            id='lastname' 
            label='Apellidos' 
            type='text'
            errorMessage={
              state.errors.lastname === 'empty' 
                ? "El campo apellidos es requerido"
                : state.errors.lastname === 'invalid'
                  ? 'El apellido no es válido'
                  : undefined
            }
            value={state.values.lastname} 
            onChange={handleChange} 
          />
          <Input 
            id='address' 
            label='Dirección' 
            type='text'
            errorMessage={
              state.errors.address === 'empty' 
                ? "El campo dirección es requerido"
                : state.errors.address === 'invalid'
                  ? 'La dirección no es válida'
                  : undefined
            }
            value={state.values.address} 
            onChange={handleChange} 
          />
          <Input 
            id='opAddress' 
            label='Dirección 2 (opcional)' 
            type='text'
            errorMessage={
              state.errors.opAddress !== 'empty'
                ? state.errors.opAddress === 'invalid'
                    ? 'El campo dirección 2 no es válido'
                    : undefined
                : undefined
            }
            value={state.values.opAddress} 
            onChange={handleChange} 
          />
          <Input 
            id='postalCode' 
            label='Código postal'
            type='number'
            max={5}
            errorMessage={
              state.errors.postalCode === 'empty' 
                ? "El código postal es requerido"
                : state.errors.postalCode === 'invalid'
                  ? 'El campo código postal no es válido'
                  : undefined
            }
            value={state.values.postalCode} 
            onChange={handleChange}
          />
          <Input 
            id='city' 
            label='Ciudad' 
            value={state.values.city} 
            type='text'
            errorMessage={
              state.errors.city === 'empty' 
                ? "La ciudad es requerida"
                : state.errors.fullname === 'invalid'
                  ? 'La ciudad no es válida'
                  : undefined
            }
            onChange={handleChange} 
          />
          <Select
            state={select}
            options={options}
            defaultOption={options[0]}
            label='País'
            setState={setSelect}
            isRequired={
              (state.errors.country !== null) &&
                state.errors.country === 'empty'
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
              state.errors.phone === 'empty' 
                ? "El teléfono es requerido"
                : state.errors.phone === 'invalid'
                  ? 'El teléfono no es válido'
                  : undefined
            }
            onChange={handleChange} 
          />
          <div className="flex flex-col pt-10 gap-5 mb-2 sm:flex-row sm:justify-end sm:col-span-2">
            <Link 
              href='/cart'
              className="py-2 px-4 bg-gray-100 rounded transition-all flex w-full justify-center hover:bg-gray-200 active:bg-gray-100 sm:w-1/5"
            >
              Átras
            </Link>
            <button
              type='submit'
              className="btn-primary flex w-full  sm:w-1/5 justify-center "
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
   
    </>
  );
}