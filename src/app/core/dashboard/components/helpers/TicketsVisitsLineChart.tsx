'use client';
import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
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
} satisfies ChartConfig;

export function TicketsVisitsLineChart({
  data,
  loading
}: {
  data?: TransactionTrendResponse | null;
  loading?: boolean;
}) {
  const chartData = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => {
      // Format label for year/week/month
      let label = item.value;
      if (label.includes('T')) {
        // ISO date string, extract month name and year
        const date = new Date(label);
        label = date.toLocaleString('default', {
          month: 'short',
          year: '2-digit'
        });
      }
      return {
        label,
        visit_count: item.visit_count,
        ticket_count: item.ticket_count
      };
    });
  }, [data]);

  // Find top period for visits and tickets
  const topPeriod =
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
          Tickets & Visits Trend
        </CardTitle>
        <CardDescription className='text-xs'>
          Trend of tickets and visits by period
        </CardDescription>
      </CardHeader>
      <CardContent className='px-0'>
        <ChartContainer config={chartConfig} className='mx-auto h-[240px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 12, left: 12, bottom: 24 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='label'
                tickLine={false}
                axisLine={false}
                tickMargin={16}
                interval={0}
                minTickGap={24}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={36}
                allowDecimals={false}
                domain={[0, 'dataMax']}
              />
              <Tooltip content={<ChartTooltipContent indicator='line' />} />
              <Line
                dataKey='visit_count'
                type='monotone'
                stroke='#6366F1'
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position='top'
                  offset={16}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Line>
              <Line
                dataKey='ticket_count'
                type='monotone'
                stroke='#22C55E'
                strokeWidth={2}
                dot={{ fill: '#22C55E' }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position='top'
                  offset={16}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 px-2 text-sm'>
        {topPeriod && (
          <div className='flex w-full flex-col gap-2'>
            <div className='flex w-full items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Top Period</span>
              <span className='text-muted-foreground text-right text-xs tracking-wide'>
                Showing {chartData.length} periods
              </span>
            </div>
            <div className='text-md flex w-full items-center justify-between gap-2'>
              <span className='text-md max-w-[200px] truncate font-medium'>
                {topPeriod.label}
              </span>
              <span className='font-semibold tabular-nums'>
                {topPeriod.visit_count}{' '}
                <span className='text-muted-foreground ml-1 font-normal'>
                  visits
                </span>{' '}
                | {topPeriod.ticket_count}{' '}
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
