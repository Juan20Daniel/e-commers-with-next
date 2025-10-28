import { titleFont } from '@/config/fonts';
import { FormNewCount } from './components/FormNewCount';

export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Nueva cuenta</h1>
      <FormNewCount />
    </main>
  );
}