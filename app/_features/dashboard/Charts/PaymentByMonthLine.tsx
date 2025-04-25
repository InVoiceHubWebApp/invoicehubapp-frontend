'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

const chartConfig = {
  amount: { label: 'Total', color: 'hsl(var(--primary))' }
} satisfies ChartConfig;

type Item = { month: string; date?: string; amount: number };

type PaymentByMonthLineProps = { data: Item[] };

export function PaymentByMonthLine({ data }: PaymentByMonthLineProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-full w-full max-md:aspect-auto max-md:h-72"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="amount"
          type="natural"
          stroke="hsl(var(--chart-5))"
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--chart-5))' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
