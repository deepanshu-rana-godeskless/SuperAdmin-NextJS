'use client';
import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { TransactionTrendResponse } from '../../types/api-types';

const chartConfig = {
  visit_count: {
    label: 'Visits',
    color: '#6366F1'
  },
  ticket_count: {
    label: 'Tickets',
    color: '#22C55E'
  }
};

export function TransactionTrendChart({
  data,
  loading
}: {
  data?: TransactionTrendResponse | null;
  loading?: boolean;
}) {
  const chartData = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => ({
      label: item.value,
      visit_count: item.visit_count,
      ticket_count: item.ticket_count
    }));
  }, [data]);

  if (!chartData.length) {
    return (
      <Card className='max-w-[520px] p-4'>
        <CardHeader className='px-0 pb-2'>
          <CardTitle className='text-sm font-semibold'>
            Tickets & Visits
          </CardTitle>
          <CardDescription className='text-xs'>
            No Tickets & Visits data available
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Robust logic: Give more weight to visits (e.g., 70% visits, 30% tickets)
  const topCustomer =
    chartData.length > 0
      ? chartData.reduce((max, curr) => {
          const currScore = curr.visit_count * 0.7 + curr.ticket_count * 0.3;
          const maxScore = max.visit_count * 0.7 + max.ticket_count * 0.3;
          return currScore > maxScore ? curr : max;
        }, chartData[0])
      : null;

  return (
    <Card className='@container/card w-full max-w-[520px] gap-2 p-3'>
      <CardHeader className='space-y-0.5 px-0 pb-1'>
        <CardTitle className='text-sm font-semibold'>
          Tickets & Visits
        </CardTitle>
        <CardDescription className='text-xs'>
          Visit and ticket count trend by period
        </CardDescription>
      </CardHeader>
      <CardContent className='px-0'>
        <ChartContainer config={chartConfig} className='mx-auto h-[240px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              margin={{ top: 16, right: 16, left: 8, bottom: 16 }}
              barCategoryGap={18}
              barGap={8}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='label'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey='visit_count'
                fill='#6366F1'
                radius={[6, 6, 0, 0]}
                barSize={28}
              >
                <LabelList position='top' fontSize={12} />
              </Bar>
              <Bar
                dataKey='ticket_count'
                fill='#22C55E'
                radius={[6, 6, 0, 0]}
                barSize={28}
              >
                <LabelList position='top' fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 px-2 text-sm'>
        {topCustomer && (
          <div className='flex w-full flex-col gap-2'>
            {/* Top row */}
            <div className='flex w-full items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Best Period</span>
              <span className='text-muted-foreground text-right text-xs tracking-wide'>
                Showing {chartData.length} periods
              </span>
            </div>
            {/* Value row */}
            <div className='text-md flex w-full items-center justify-between gap-2'>
              <span className='text-md max-w-[200px] truncate font-medium'>
                {topCustomer.label}
              </span>
              <span className='font-semibold tabular-nums'>
                {topCustomer.visit_count}{' '}
                <span className='text-muted-foreground ml-1 font-normal'>
                  visits
                </span>{' '}
                | {topCustomer.ticket_count}{' '}
                <span className='text-muted-foreground ml-1 font-normal'>
                  tickets
                </span>
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
