'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { ApiUtilizationMtdResponse } from '../../types/api-types';

const chartConfig = {
  total_success_hits: {
    label: 'Success Hits',
    color: '#22C55E'
  },
  total_failed_hits: {
    label: 'Failed Hits',
    color: '#EF4444'
  }
} satisfies ChartConfig;

export function ApiUtilizationMtdChart({
  data,
  loading
}: {
  data?: ApiUtilizationMtdResponse | null;
  loading?: boolean;
}) {
  const chartData = React.useMemo(() => {
    if (!data?.data) return [];
    const mapped = data.data.map((item) => ({
      tenant: item.tenant,
      total_success_hits: item.total_success_hits,
      total_failed_hits: item.total_failed_hits,
      total_api_hits: item.total_api_hits,
      maximum_total_api_hits: item.maximum_total_api_hits
    }));
    return mapped;
  }, [data]);

  // Find the tenant with the highest total_api_hits
  const topTenant =
    chartData.length > 0
      ? chartData.reduce(
          (max, curr) =>
            curr.total_api_hits > max.total_api_hits ? curr : max,
          chartData[0]
        )
      : null;

  return (
    <Card className='@container/card w-full max-w-[520px] gap-2 p-3'>
      <CardHeader className='px-2 pb-2'>
        <CardTitle className='text-sm font-semibold'>
          API Utilization (MTD)
        </CardTitle>
        <CardDescription className='text-xs'>
          Stacked bar chart of API success and failed hits per tenant.
        </CardDescription>
      </CardHeader>
      <CardContent className='px-1 pt-0 sm:px-2 sm:pt-2'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto h-[230px] overflow-hidden'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              margin={{ left: 16, right: 16, top: 12, bottom: 70 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='tenant'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                angle={-30}
                textAnchor='end'
              />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey='total_success_hits'
                stackId='a'
                fill='#22C55E'
                radius={[4, 4, 4, 4]}
              />
              <Bar
                dataKey='total_failed_hits'
                stackId='a'
                fill='#EF4444'
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='px-0 text-xs'>
        {topTenant && (
          <div className='flex w-full flex-col gap-2'>
            {/* Summary row */}
            <div className='flex w-full items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Top Tenant</span>
              <span className='text-muted-foreground text-xs tracking-wide'>
                Showing {chartData.length} tenants
              </span>
            </div>

            {/* Value row */}
            <div className='flex w-full items-center justify-between'>
              <span className='max-w-[200px] truncate font-medium'>
                {topTenant.tenant}
              </span>
              <span className='font-semibold tabular-nums'>
                {topTenant.total_api_hits}
                <span className='text-muted-foreground ml-1 font-normal'>
                  hits
                </span>
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
