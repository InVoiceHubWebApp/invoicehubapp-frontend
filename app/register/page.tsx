import { Card } from '../_components';
import { RegisterForm } from '../_features';

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen max-md:h-screen">
      <Card className="max-md:w-full h-full max-md:flex max-md:flex-col max-md:justify-center">
        <div className="flex flex-col gap-8 items-center justify-center p-4">
          <h1 className="text-2xl">Crie uma conta</h1>
          <RegisterForm />
        </div>
      </Card>
    </main>
  );
}
