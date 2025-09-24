'use client'
import Link from 'next/link';
import { useReducer, useState, useEffect, FormEvent } from 'react';
import { Input, Select, Title } from '@/components';
import { Option } from '@/interfaces/select-option.interface';
import { formReducer, initialState } from '@/reducers/formReducer';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
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
    
    const formErrors = {...state.errors};
    if(state.values.opAddress === '') {
      delete formErrors["opAddress"];
    }

    if(Object.values(formErrors).map(error => error.valid).includes(false)) {
      return alert("Error en uno de los campos")
    }
    return router.push('/checkout');
  }
  const clearInput = (field:string) => {
    dispatch({
      type:'CLEAR_INPUT',
      field:field
    });
  }
  return (
    <div className="flex justify-center">
      {/* <div className="w-full max-w-[1000px]">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <form className="grid grid-cols-1 gap-4 px-4 pb-10 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <Input 
            id='fullname' 
            label='Nombres' 
            type='text'
            errorMessage={
              state.errors.fullname.status === 'empty' 
                ? "El campo nombres es requerido"
                : state.errors.fullname.status === 'invalid'
                  ? 'El nombre no es válido'
                  : undefined
            }
            value={state.values.fullname} 
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
                : state.errors.fullname.status === 'invalid'
                  ? 'La ciudad no es válida'
                  : undefined
            }
            onChange={handleChange}
            clearInput={clearInput}
          />
          <Select
            state={select}
            options={options}
            defaultOption={options[0]}
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
      </div> */}
    </div>
  );
}