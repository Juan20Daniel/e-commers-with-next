import { Title } from '@/components';
import { AdressForm } from './components/AdressForm';


export default function AddressPage() {

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1000px]">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <AdressForm />
      </div>
    </div>
  );
}