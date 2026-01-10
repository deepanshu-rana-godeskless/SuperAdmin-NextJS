'use client';
import PageContainer from '@/components/layout/page-container';
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
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { DateRange } from 'react-day-picker';
import { formatDateForApi } from '../lib/dashboard-utils';

interface HeaderCardsProps {
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

export default function HeaderCards({ onDateRangeChange }: HeaderCardsProps) {
  const [firstName, setFirstName] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  useEffect(() => {
    const userDataStr = Cookies.get('user_data');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData.email) {
          // Extract first name from email (before @)
          const namePart = userData.email.split('@')[0];
          // Capitalize first letter, handle dot-separated names
          const first = namePart.split('.')[0];
          setFirstName(first.charAt(0).toUpperCase() + first.slice(1));
        }
      } catch {}
    }
  }, []);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from && range?.to && onDateRangeChange) {
      const startDate = formatDateForApi(range.from);
      const endDate = formatDateForApi(range.to);
      onDateRangeChange(startDate, endDate);
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
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

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                $1,250.00
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
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
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
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
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Active Accounts</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Strong user retention <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Engagement exceed targets
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                4.5%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Steady performance increase{' '}
                <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
