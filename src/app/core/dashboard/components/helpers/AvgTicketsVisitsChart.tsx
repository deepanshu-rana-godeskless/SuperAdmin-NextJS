'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { AvgTicketVisitUserResponse } from '../../types/api-types';

const chartConfig = {
  avg_ticket_visits_user: {
    label: 'Avg Ticket/Visit per User',
    color: '#6366F1'
  },
  total_tickets_visits: {
    label: 'Total Tickets/Visits',
    color: '#F59E0B'
  },
  users_count: {
    label: 'Users Count',
    color: '#22C55E'
  }
} satisfies ChartConfig;

export function AvgTicketsVisitsChart({
  data,
  loading
}: {
  data?: AvgTicketVisitUserResponse | null;
  loading?: boolean;
}) {
  const chartData = React.useMemo(() => {
    if (!data?.results) return [];
    return data.results.map((item) => ({
      tenant: item.tenant_name,
      avg_ticket_visits_user: item.avg_ticket_visits_user,
      total_tickets_visits: item.total_tickets_visits,
      users_count: item.users_count
    }));
  }, [data]);

  // Find the tenant with the highest avg_ticket_visits_user
  const topTenant =
    chartData.length > 0
      ? chartData.reduce(
          (max, curr) =>
            curr.avg_ticket_visits_user > max.avg_ticket_visits_user
              ? curr
              : max,
          chartData[0]
        )
      : null;

  return (
    <Card className='@container/card w-full max-w-[520px] gap-2 p-3'>
      <CardHeader className='px-1 pb-2'>
        <CardTitle className='text-sm font-semibold'>
          Avg Tickets & Visits
        </CardTitle>
        <CardDescription className='text-xs'>
          Shows avg, total tickets/visits, and License count by tenant
        </CardDescription>
      </CardHeader>
      <CardContent className='px-1 pt-2 pb-0 sm:px-2 sm:pt-2'>
        <ChartContainer config={chartConfig} className='mx-auto h-[230px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData}
              margin={{ left: 10, right: 28, top: 12, bottom: 30 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='tenant'
                tickLine={false}
                axisLine={false}
                interval={0}
                height={40}
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={12}
                      textAnchor='end'
                      transform='rotate(-30)'
                      className='fill-muted-foreground text-[10px]'
                    >
                      {payload.value}
                    </text>
                  </g>
                )}
              />

              <YAxis hide />
              <Tooltip content={<ChartTooltipContent indicator='line' />} />
              <Area
                type='monotone'
                dataKey='users_count'
                fill='#F59E0B'
                stroke='#F59E0B'
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='total_tickets_visits'
                fill='#22C55E'
                stroke='#22C55E'
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='avg_ticket_visits_user'
                fill='#6366F1'
                stroke='#6366F1'
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='px-0 text-xs'>
        {topTenant && (
          <div className='flex w-full flex-col gap-2'>
            {/* Top row */}
            <div className='flex w-full items-center justify-between'>
              <span className='text-muted-foreground text-sm'>
                Top Customer
              </span>

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
                {topTenant.avg_ticket_visits_user.toFixed(2)}
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
