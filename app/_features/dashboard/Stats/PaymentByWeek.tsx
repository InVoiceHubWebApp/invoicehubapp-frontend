import { Card } from '@/app/_components';
import { PaymentByWeekType } from '@/app/_types/invoices';
import { Fetcher } from '@/lib/fetcher';
import { formatCash } from '@/lib/formatter';
import { PaymentByWeekLine } from '../Charts';

const weekdays: Record<string, string> = {
  2: 'Segunda',
  3: 'Terça',
  4: 'Quarta',
  5: 'Quinta',
  6: 'Sexta',
  7: 'Sábado',
  1: 'Domingo'
};

export async function PaymentByWeek() {
  const { data } = await Fetcher<PaymentByWeekType[]>({
    path: `/analytics/invoices_by_week`
  });
  const weekKeys = Object.keys(weekdays);
  const response = data as PaymentByWeekType[];

  const dataByWeek = Object.groupBy(response, ({ day_of_week }) => day_of_week);

  const items = weekKeys.map((key) => {
    const keyNumber = Number(key);
    const data = dataByWeek[keyNumber] ? dataByWeek[keyNumber][0] : null;
    return data
      ? { ...data, week: weekdays[keyNumber] }
      : { week: weekdays[keyNumber], amount: 0 };
  });
  return (
    <Card
      title="Gasto por dia da semana"
      description="Analise em quais dias da semana ocorrem mais gastos."
    >
      <div className="grid grid-cols-[1fr_2fr] gap-14 max-lg:flex max-lg:flex-wrap max-lg:gap-2">
        <table aria-label="Pagamentos por Mês" className="max-lg:w-full">
          <thead className="h-12">
            <tr className="text-primary uppercase text-sm">
              <th className="text-left">Dia</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.week}>
                <td>{item.week}</td>
                <td className="text-right">{formatCash(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaymentByWeekLine data={items} />
      </div>
    </Card>
  );
}
