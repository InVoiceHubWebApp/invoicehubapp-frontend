'use client';
import { PaymentByType } from '@/app/_types/invoices';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  amount: { label: 'Total' },
  INSTALLMENT: { label: 'Parcelado', color: 'hsl(var(--chart-2))' },
  CASH: { label: 'À vista', color: 'hsl(var(--chart-4))' },
  FIXED: { label: 'Fixo', color: 'hsl(var(--chart-1))' }
} satisfies ChartConfig;

type PaymentByTypeBarProps = { data: PaymentByType[] };

export function PaymentByTypeBar({ data }: PaymentByTypeBarProps) {
  const items = data.map((item) => {
    return { ...item, fill: `var(--color-${item.payment_type})` };
  });

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={items}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="payment_type"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="amount" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
