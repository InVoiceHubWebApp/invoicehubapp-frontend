import {
  PaymentByCreditor,
  PaymentByMonth,
  PaymentByType,
  PaymentByWeek
} from '../_features/dashboard';

export default async function Page() {
  return (
    <div className="space-y-4">
      <div className="h-10 flex items-center">
        <h2 className="text-2xl">Visão Geral</h2>
      </div>

      <PaymentByCreditor />
      <div className="grid grid-cols-[2fr_1fr] gap-4 max-lg:flex max-lg:flex-wrap">
        <PaymentByMonth />
        <PaymentByType />
      </div>
      <PaymentByWeek />
    </div>
  );
}
