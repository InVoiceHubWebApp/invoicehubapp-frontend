import { PaymentByCreditorType } from '@/app/_types/invoices';
import { formatCash } from '@/lib/formatter';

type PaymentByCreditorTableProps = {
  payments: PaymentByCreditorType[];
};
export function PaymentByCreditorTable({
  payments
}: PaymentByCreditorTableProps) {
  const items = payments.map((item) => {
    return { ...item, total: item.total_value - item.amount_receivable };
  });

  const entities = payments.map(({ name, id }) => {
    return { name, id };
  });

  return (
    <div className="flex items-center overflow-auto">
      <div className="flex-[2_1_1] 2xl:flex-1">
        <h2 className="text-primary text-sm uppercase text-nowrap">
          Entidade financeira
        </h2>
        {entities.map((entity) => (
          <p key={entity.id}>{entity.name}</p>
        ))}
      </div>
      <div className="flex-1">
        <div className="text-primary text-sm uppercase flex items-center justify-between min-w-[450px]">
          <h2 className="text-right flex-1">Fatura</h2>
          <h2 className="text-right flex-1">Desconto</h2>
          <h2 className="text-right flex-1">Devido</h2>
          <h2 className="text-right flex-1">Total</h2>
        </div>
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between min-w-[450px]"
            >
              <p className="text-right flex-1">
                {formatCash(item.total_value)}
              </p>
              <p className="text-right flex-1">
                {formatCash(item.amount_receivable)}
              </p>
              <p className="text-right flex-1">
                {formatCash(item.amount_payable)}
              </p>
              <p className="text-right flex-1">{formatCash(item.total)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
