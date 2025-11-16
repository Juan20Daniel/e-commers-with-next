import { Title } from '@/components';
import { AdressForm } from './components/AdressForm';
import { getCountries } from '@/app/actions/countries/get-countries';

export default async function AddressPage() {
  const result = await getCountries();

  return (
    <>
      <Title 
        title="Dirección"
        subTitle="Dirección de entrega"
        boxStyles="flex flex-col items-center"
        btnBack
        urlBack='/cart'
        minWidth={1000}
        maxWidth={1000}
      />
      <div className="flex justify-center">
        <div className="w-full max-w-[1000px]">
          <AdressForm countries={result} />
        </div>
      </div>
    </>
  );
}