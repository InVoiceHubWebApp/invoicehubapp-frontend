import { Card } from '@/app/_components';
import type { PaymentByCreditorType } from '@/app/_types/invoices';
import { Fetcher } from '@/lib/fetcher';
import { formatCash } from '@/lib/formatter';
import { PaymentByCreditorTable } from '../Table/PaymentByCreditorTable';

export async function PaymentByCreditor() {
  const { data } = await Fetcher<PaymentByCreditorType[]>({
    path: `/analytics/invoices_by_creditor`
  });

  const response = data as PaymentByCreditorType[];

  const total = response.reduce((acc, cur) => acc + cur.total_value, 0);
  const other_payments = response.reduce(
    (acc, cur) => acc + cur.amount_receivable,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 max-md:flex-col flex-wrap">
        <Card className="flex-1">
          <h2 className="text-sm text-primary pb-4">GASTO</h2>
          <p className="text-3xl">{formatCash(total)}</p>
        </Card>
        <Card className="flex-1">
          <h2 className="text-sm text-primary pb-4">PAGAMENTO</h2>
          <p className="text-3xl">{formatCash(other_payments)}</p>
        </Card>
        <Card className="flex-1">
          <h2 className="text-sm text-primary pb-4">PAGAMENTO FINAL</h2>
          <p className="text-3xl">{formatCash(total - other_payments)}</p>
        </Card>
      </div>

      <Card
        title="Gasto por creditor"
        description="Visualize os gastos, valores a receber, valores a pagar e o total consolidado por credor em um único lugar."
      >
        <PaymentByCreditorTable payments={response} />
      </Card>
    </div>
  );
}
