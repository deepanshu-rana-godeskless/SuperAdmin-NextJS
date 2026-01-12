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

const chartConfig = {
  total_tickets_visits: {
    label: 'Tickets & Visits',
    color: '#6366F1'
  }
} satisfies ChartConfig;

export function TopTicketsVisitsBarChart({
  data,
  loading
}: {
  data?: any;
  loading?: boolean;
}) {
  // Defensive: handle missing/empty data
  const chartData = React.useMemo(() => {
    if (!data?.results) return [];
    return [...data.results]
      .sort((a, b) => b.total_tickets_visits - a.total_tickets_visits)
      .slice(0, 5)
      .map((item) => ({
        tenant_name:
          item.tenant_name.length > 12
            ? item.tenant_name.slice(0, 12) + '…'
            : item.tenant_name,
        total_tickets_visits: item.total_tickets_visits
      }));
  }, [data]);

  const topTenant = chartData.length > 0 ? chartData[0] : null;

  return (
    <Card className='@container/card w-full max-w-[520px] gap-2 overflow-hidden p-3'>
      <CardHeader className='space-y-0.5 px-0 pb-1'>
        <CardTitle className='text-sm font-semibold'>
          Top 5 Tickets & Visits
        </CardTitle>
        <CardDescription className='text-xs'>
          Tenants with the highest combined tickets and visits
        </CardDescription>
      </CardHeader>

      <CardContent className='px-0'>
        <ChartContainer config={chartConfig} className='mx-auto h-[240px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              margin={{ top: 30, right: 12, left: 12, bottom: 24 }}
              barCategoryGap={24}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey='tenant_name'
                tickLine={false}
                axisLine={false}
                tickMargin={16}
                interval={0}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                allowDecimals={false}
              />

              <Tooltip content={<ChartTooltipContent hideLabel />} />

              <Bar
                dataKey='total_tickets_visits'
                fill='#6366F1'
                radius={[6, 6, 0, 0]}
                barSize={28}
              >
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start gap-2 px-2 text-sm'>
        {topTenant && (
          <div className='flex w-full flex-col gap-2'>
            <div className='flex w-full items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Top Tenant</span>
              <span className='text-muted-foreground text-xs'>
                Showing {chartData.length} tenants
              </span>
            </div>
            <div className='flex w-full items-center justify-between'>
              <span className='max-w-[200px] truncate font-medium'>
                {topTenant.tenant_name}
              </span>
              <span className='font-semibold tabular-nums'>
                {topTenant.total_tickets_visits}
                <span className='text-muted-foreground ml-1 font-normal'>
                  total
                </span>
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
