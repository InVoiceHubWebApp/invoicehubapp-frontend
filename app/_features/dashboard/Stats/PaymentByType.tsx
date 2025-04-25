import { Card } from '@/app/_components';
import {
  InvoiceType,
  PaymentByType as PaymentByTypeType
} from '@/app/_types/invoices';
import { Fetcher } from '@/lib/fetcher';
import { formatCash } from '@/lib/formatter';
import { PaymentByTypeBar } from '../Charts';

export async function PaymentByType() {
  const { data } = await Fetcher<PaymentByTypeType[]>({
    path: `/analytics/invoices_by_payment_type`
  });

  const items = data as PaymentByTypeType[];

  return (
    <Card
      title="Gasto por tipo de pagamento"
      description="Visualize os gastos categorizados por tipo: parcelado, à vista e fixo."
      className="max-lg:w-full"
    >
      <div className="space-y-4">
        <PaymentByTypeBar data={items} />

        <table className="w-full" aria-label="Pagamentos por Mês">
          <thead className="h-12">
            <tr className="text-primary uppercase text-sm">
              <th className="text-left">Tipo de pagamento</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.payment_type}>
                <td>{InvoiceType[item.payment_type]}</td>
                <td className="text-right">{formatCash(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
