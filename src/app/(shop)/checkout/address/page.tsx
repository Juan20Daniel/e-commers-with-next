import { Title } from '@/components';
import { AdressForm } from './components/AdressForm';
import { getCountries } from '@/app/actions/countries/get-countries';


export default async function AddressPage() {
  const result = await getCountries();
 
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1000px]">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <AdressForm countries={result} />
      </div>
    </div>
  );
}