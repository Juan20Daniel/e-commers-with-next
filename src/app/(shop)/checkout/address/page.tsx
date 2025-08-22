'use client'
import Link from 'next/link';
import { useReducer, useState, useEffect } from 'react';
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
  return (
    <>
      <div className="flex justify-center">
      <div className="w-full max-w-[1000px]">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <div className="grid grid-cols-1 gap-2 px-4 pb-10 sm:gap-5 sm:grid-cols-2">
          <Input id='fullname' label='Nombres' type='text' value={state.values.fullname} onChange={handleChange} />
          <Input id='lastname' label='Apellidos' type='text' value={state.values.lastname} onChange={handleChange} />
          <Input id='address' label='Dirección' type='text' value={state.values.address} onChange={handleChange} />
          <Input id='opAddress' label='Dirección 2 (opcional)' type='text' value={state.values.opAddress} onChange={handleChange} />
          <Input id='postalCode' label='Código postal' type='number' value={state.values.postalCode??undefined} onChange={handleChange} />
          <Input id='city' label='Ciudad' value={state.values.city} type='text' onChange={handleChange} />
          <Select
            state={select}
            options={options}
            defaultOption={options[0]}
            label='País'
            setState={setSelect}
          />
          <Input id='phone' label='Teléfono' value={state.values.phone??undefined} type='number' onChange={handleChange} />
          <div className="flex flex-col pt-10 gap-5 mb-2 sm:flex-row sm:justify-end sm:col-span-2">
            <Link 
              href='/cart'
              className="py-2 px-4 bg-gray-100 rounded transition-all flex w-full justify-center hover:bg-gray-200 active:bg-gray-100 sm:w-1/5"
            >
              Átras
            </Link>
            <Link
              href='/checkout'
              className="btn-primary flex w-full  sm:w-1/5 justify-center "
            >
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </div>
    <p>{JSON.stringify(state.values, null, 2)}</p>
    </>
  );
}