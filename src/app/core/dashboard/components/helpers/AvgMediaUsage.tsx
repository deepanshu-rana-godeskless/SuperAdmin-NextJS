'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
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
import type { TenantAverageUtilizationResponse } from '../../types/api-types';

const chartConfig = {
  sms_count: {
    label: 'SMS Count',
    color: '#F59E0B'
  },
  whatsapp_count: {
    label: 'WhatsApp Count',
    color: '#22C55E'
  },
  video_count: {
    label: 'Video Count',
    color: '#6366F1'
  },
  used_space: {
    label: 'Used Space',
    color: '#EF4444'
  },
  average_tenant: {
    label: 'Avg Usage/User',
    color: '#0EA5E9'
  }
} satisfies ChartConfig;

export function AvgMediaUsage({
  data,
  loading
}: {
  data?: TenantAverageUtilizationResponse | null;
  loading?: boolean;
}) {
  const chartData = React.useMemo(() => {
    if (!data?.usage) return [];
    return data.usage.map((item) => ({
      tenant: item.tenant_instance_name,
      sms_count: item.sms_count,
      whatsapp_count: item.whatsapp_count,
      video_count: item.video_count,
      used_space: item.used_space,
      average_tenant: item.average_tenant
    }));
  }, [data]);

  // Find the tenant with the highest average_tenant
  const topTenant =
    chartData.length > 0
      ? chartData.reduce(
          (max, curr) =>
            curr.average_tenant > max.average_tenant ? curr : max,
          chartData[0]
        )
      : null;

  return (
    <Card className='@container/card w-full max-w-[520px] gap-2 p-3'>
      <CardHeader className='px-1 pb-2'>
        <CardTitle className='text-sm font-semibold'>
          Avg Media Usage per Tenant
        </CardTitle>
        <CardDescription className='text-xs'>
          Shows average, SMS, WhatsApp, video and usage by tenant
        </CardDescription>
      </CardHeader>
      <CardContent className='px-1 pt-2 sm:px-2 sm:pt-2'>
        <ChartContainer config={chartConfig} className='mx-auto h-[230px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData}
              margin={{ left: 16, right: 28, top: 12, bottom: 44 }}
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
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent indicator='line' />} />
              <Area
                type='monotone'
                dataKey='sms_count'
                fill='#F59E0B'
                stroke='#F59E0B'
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='whatsapp_count'
                fill='#22C55E'
                stroke='#22C55E'
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='video_count'
                fill='#6366F1'
                stroke='#6366F1'
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='used_space'
                fill='#EF4444'
                stroke='#EF4444'
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='average_tenant'
                fill='#0EA5E9'
                stroke='#0EA5E9'
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='px-0 pt-0 text-xs'>
        {topTenant && (
          <div className='flex w-full flex-col gap-2'>
            {/* Top row */}
            <div className='flex w-full items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Top Tenant</span>
              <span className='text-muted-foreground text-right text-xs tracking-wide'>
                Showing {chartData.length} tenants
              </span>
            </div>
            {/* Value row */}
            <div className='text-md flex w-full items-center justify-between gap-2'>
              <span className='text-md max-w-[200px] truncate font-medium'>
                {topTenant.tenant}
              </span>
              <span className='font-semibold tabular-nums'>
                {topTenant.average_tenant.toFixed(2)}
                <span className='text-muted-foreground ml-1 font-normal'>
                  avg
                </span>
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
