'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

const chartConfig = {
  amount: {
    label: 'Total',
    color: 'hsl(var(--primary))'
  }
} satisfies ChartConfig;

type Item = {
  week: string;
  day_of_week?: string;
  amount: number;
};

type PaymentByWeekLineProps = {
  data: Item[];
};

export function PaymentByWeekLine({ data }: PaymentByWeekLineProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-full w-full max-md:aspect-auto max-md:h-72"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 22,
          right: 22
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="amount"
          type="natural"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          dot={{
            fill: 'hsl(var(--chart-3))'
          }}
          activeDot={{
            r: 6
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
