import { Card } from '@/app/_components';
import { PaymentByMonthType } from '@/app/_types/invoices';
import { Fetcher } from '@/lib/fetcher';
import { formatCash } from '@/lib/formatter';
import { PaymentByMonthLine } from '../Charts';

const months: Record<number, string> = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro'
};

export async function PaymentByMonth() {
  const { data } = await Fetcher<PaymentByMonthType[]>({
    path: `/analytics/invoices_by_month`
  });

  const monthKeys = Object.keys(months);
  const response = data as PaymentByMonthType[];
  const dataByMonth = Object.groupBy(
    response,
    ({ date }) => new Date(date).getMonth() + 1
  );
  const items = monthKeys.map((key) => {
    const keyNumber = Number(key);
    const data = dataByMonth[keyNumber] ? dataByMonth[keyNumber][0] : null;
    return data
      ? { ...data, month: months[keyNumber] }
      : { month: months[keyNumber], amount: 0 };
  });
  return (
    <Card
      title="Gasto por mês"
      className="max-lg:w-full"
      description="Visualize os gastos de cada mês ao longo do ano de 2025."
    >
      <div className="grid grid-cols-[1fr_2fr] gap-14 max-lg:flex max-lg:flex-wrap max-lg:gap-2">
        <table aria-label="Pagamentos por Mês" className="max-lg:w-full">
          <thead className="h-12">
            <tr className="text-primary uppercase text-sm">
              <th className="text-left">Mês</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.month}>
                <td>{item.month}</td>
                <td className="text-right">{formatCash(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaymentByMonthLine data={items} />
      </div>
    </Card>
  );
}
