'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Pie, PieChart, Label } from 'recharts';

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
  ChartTooltipContent
} from '@/components/ui/chart';

interface PieGraphProps {
  tenantsAnalytics?: any[];
  loading?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getPieData(tenantsAnalytics?: any[]) {
  if (!Array.isArray(tenantsAnalytics)) return [];

  return tenantsAnalytics
    .map((tenant) => {
      const value =
        (tenant.activated_disp_details || 0) +
        (tenant.activated_fm_details || 0) +
        (tenant.activated_fr_details || 0);

      return {
        name: tenant.customer || tenant.email || `Tenant ${tenant.id}`,
        value
      };
    })
    .filter((item) => item.value > 0);
}

/* -------------------------------------------------------------------------- */
/*                               Chart Config                                 */
/* -------------------------------------------------------------------------- */
/** REQUIRED for ChartContainer – prevents runtime crash */
const chartConfig = {
  value: {
    label: 'Activations'
  }
};

/* -------------------------------------------------------------------------- */
/*                                Pie Colors                                  */
/* -------------------------------------------------------------------------- */

const PIE_COLORS = [
  '#6366F1',
  '#22C55E',
  '#F59E0B',
  '#EF4444',
  '#3B82F6',
  '#A855F7',
  '#14B8A6',
  '#E11D48',
  '#84CC16',
  '#0EA5E9',
  '#F97316',
  '#8B5CF6',
  '#06B6D4',
  '#D946EF',
  '#65A30D',
  '#0284C7',
  '#DB2777',
  '#CA8A04',
  '#059669',
  '#4F46E5'
];

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export function CustomersPieChart({
  tenantsAnalytics,
  loading
}: PieGraphProps) {
  const pieData = React.useMemo(
    () => getPieData(tenantsAnalytics),
    [tenantsAnalytics]
  );

  const total = React.useMemo(
    () => pieData.reduce((sum, d) => sum + d.value, 0),
    [pieData]
  );

  const customerCount = pieData.length;

  const topCustomer =
    pieData.length > 0
      ? pieData.reduce((max, curr) => (curr.value > max.value ? curr : max))
      : null;

  const topCustomerPercent =
    topCustomer && total > 0
      ? ((topCustomer.value / total) * 100).toFixed(1)
      : null;

  /* ------------------------------------------------------------------------ */
  /*                                  Loading                                 */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <Card className='max-w-[325px] animate-pulse p-3'>
        <div className='bg-muted mb-2 h-4 w-40 rounded' />
        <div className='bg-muted/70 mb-4 h-3 w-56 rounded' />
        <div className='bg-muted/60 mx-auto h-[240px] w-[240px] rounded-full' />
        <div className='bg-muted mt-4 h-3 w-3/4 rounded' />
      </Card>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                 Empty                                    */
  /* ------------------------------------------------------------------------ */

  if (!pieData.length) {
    return (
      <Card className='p-4'>
        <CardHeader className='px-0 pb-2'>
          <CardTitle className='text-sm font-semibold'>
            Customer Distribution
          </CardTitle>
          <CardDescription className='text-xs'>
            Share of total activations
          </CardDescription>
        </CardHeader>

        <CardContent className='flex h-[240px] items-center justify-center'>
          <div className='text-muted-foreground text-sm'>
            No activation data available
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                 Render                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <Card className='@container/card w-full max-w-[365px] gap-2 p-3'>
      {/* Header */}
      <CardHeader className='space-y-0.5 px-0 pb-1'>
        <CardTitle className='text-sm font-semibold'>
          Customer Distribution
        </CardTitle>
        <CardDescription className='text-xs'>
          Share of total activations
        </CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className='px-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[240px]'
        >
          <PieChart>
            <defs>
              {pieData.map((_, index) => (
                <linearGradient
                  key={index}
                  id={`pieFill${index}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                  <stop
                    offset='100%'
                    stopColor={PIE_COLORS[index % PIE_COLORS.length]}
                    stopOpacity={0.8}
                  />
                </linearGradient>
              ))}
            </defs>

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={pieData.map((item, idx) => ({
                ...item,
                fill: `url(#pieFill${idx})`
              }))}
              dataKey='value'
              nameKey='name'
              innerRadius={60}
              outerRadius={95}
              stroke='var(--card)'
              strokeWidth={3}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox)) return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-4xl font-semibold'
                      >
                        {customerCount}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 28}
                        className='fill-muted-foreground text-sm'
                      >
                        Customers
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='px-0 text-sm'>
        {topCustomer && (
          <div className='flex w-full flex-col gap-1'>
            <div className='flex w-full items-center justify-between gap-2'>
              <span className='text-muted-foreground text-sm tracking-wide'>
                Top customer
              </span>
              <span className='text-muted-foreground text-xs tracking-wide'>
                Licenses Purchased
              </span>
            </div>
            <div className='flex w-full items-center justify-between gap-2'>
              <span className='max-w-[200px] truncate font-medium'>
                {topCustomer.name}
              </span>

              <span className='font-semibold tabular-nums'>
                {topCustomer.value}
                <span className='text-muted-foreground ml-1 font-normal'>
                  ({topCustomerPercent}%)
                </span>
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
