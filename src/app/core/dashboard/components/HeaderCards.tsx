'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { formatDateForApi } from '../lib/dashboard-utils';

interface HeaderCardsProps {
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  traffic?: any;
  utilizationWhatsapp?: any;
  utilizationSms?: any;
  utilizationVideo?: any;
  utilizationDisk?: any;
  tenantsAnalytics?: any;
  productAnalytics?: any;
  workspaceUtilization?: any;
  userAnalytics?: any;
  tenantsList?: any;
  recentUserTenantData?: any;
  recentTicketVisitTenantData?: any;
  tenantTopUsage?: any;
  leastRecentUserTenantData?: any;
  loading?: boolean;
  avgTicketVisitUser?: any;
}

export default function HeaderCards({
  onDateRangeChange,
  traffic,
  utilizationWhatsapp,
  utilizationSms,
  utilizationVideo,
  utilizationDisk,
  tenantsAnalytics,
  productAnalytics,
  workspaceUtilization,
  userAnalytics,
  tenantsList,
  recentUserTenantData,
  recentTicketVisitTenantData,
  tenantTopUsage,
  leastRecentUserTenantData,
  loading
}: HeaderCardsProps) {
  const [firstName, setFirstName] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  useEffect(() => {
    const userDataStr = Cookies.get('user_data');
    if (!userDataStr) return;

    try {
      const userData = JSON.parse(userDataStr);
      if (userData?.email) {
        const namePart = userData.email.split('@')[0];
        const first = namePart.split('.')[0];
        setFirstName(first.charAt(0).toUpperCase() + first.slice(1));
      }
    } catch {
      // silently fail – cookie might be malformed
    }
  }, []);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from && range?.to && onDateRangeChange) {
      onDateRangeChange(
        formatDateForApi(range.from),
        formatDateForApi(range.to)
      );
    }
  };

  return (
    <div className='flex flex-1 flex-col space-y-2'>
      {/* Header */}
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight'>
          {`Hi${firstName ? ' ' + firstName : ''}, Welcome back 👋`}
        </h2>

        <DatePickerWithRange
          date={dateRange}
          setDate={handleDateRangeChange}
          className='ml-auto'
          defaultToToday={true}
        />
      </div>

      {/* Metric Cards */}
      <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-2 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-5'>
        {/* Total Revenue */}
        <Card className='@container/card max-w-[360px]'>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              $1,250.00
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp className='mr-1 size-4' />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending up this month <IconTrendingUp className='size-4' />
            </div>
            <div className='text-muted-foreground'>
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* New Customers */}
        <Card className='@container/card max-w-[360px]'>
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              1,234
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingDown className='mr-1 size-4' />
                -20%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Down 20% this period <IconTrendingDown className='size-4' />
            </div>
            <div className='text-muted-foreground'>
              Acquisition needs attention
            </div>
          </CardFooter>
        </Card>

        {/* Active Accounts */}
        <Card className='@container/card max-w-[360px]'>
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              45,678
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp className='mr-1 size-4' />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Strong user retention <IconTrendingUp className='size-4' />
            </div>
            <div className='text-muted-foreground'>
              Engagement exceeds targets
            </div>
          </CardFooter>
        </Card>

        {/* Growth Rate */}
        <Card className='@container/card max-w-[360px]'>
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              4.5%
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp className='mr-1 size-4' />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Steady performance increase <IconTrendingUp className='size-4' />
            </div>
            <div className='text-muted-foreground'>
              Meets growth projections
            </div>
          </CardFooter>
        </Card>

        {/* Growth Rate */}
        <Card className='@container/card max-w-[360px]'>
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              4.5%
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp className='mr-1 size-4' />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Steady performance increase <IconTrendingUp className='size-4' />
            </div>
            <div className='text-muted-foreground'>
              Meets growth projections
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
