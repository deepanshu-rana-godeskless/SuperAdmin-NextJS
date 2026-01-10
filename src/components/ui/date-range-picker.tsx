'use client';

import * as React from 'react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  subDays,
  subWeeks,
  subYears,
  subQuarters,
  startOfQuarter,
  endOfQuarter,
  startOfWeek as getStartOfWeek,
  endOfWeek as getEndOfWeek,
  startOfYear,
  endOfYear
} from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useMediaQuery } from '@/hooks/use-media-query';

export interface DatePickerWithRangeProps {
  className?: string;
  date?: DateRange;
  setDate?: (date: DateRange | undefined) => void;
  defaultToToday?: boolean;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const presetRanges = [
  {
    label: 'Today',
    range: () => {
      const today = new Date();
      return { from: today, to: today };
    }
  },
  {
    label: 'Yesterday',
    range: () => {
      const yesterday = subDays(new Date(), 1);
      return { from: yesterday, to: yesterday };
    }
  },
  {
    label: 'This Week',
    range: () => ({
      from: getStartOfWeek(new Date(), { weekStartsOn: 0 }),
      to: getEndOfWeek(new Date(), { weekStartsOn: 0 })
    })
  },
  {
    label: 'Last Week',
    range: () => {
      const lastWeek = subWeeks(new Date(), 1);
      return {
        from: getStartOfWeek(lastWeek, { weekStartsOn: 0 }),
        to: getEndOfWeek(lastWeek, { weekStartsOn: 0 })
      };
    }
  },
  {
    label: 'Last 7 Days',
    range: () => ({
      from: subDays(new Date(), 6),
      to: new Date()
    })
  },
  {
    label: 'This Month',
    range: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  },
  {
    label: 'Last Month',
    range: () => {
      const lastMonth = subMonths(new Date(), 1);
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth)
      };
    }
  },
  {
    label: 'Last Quarter',
    range: () => {
      const lastQuarter = subQuarters(new Date(), 1);
      return {
        from: startOfQuarter(lastQuarter),
        to: endOfQuarter(lastQuarter)
      };
    }
  },
  {
    label: 'This Year',
    range: () => ({
      from: startOfYear(new Date()),
      to: endOfYear(new Date())
    })
  },
  {
    label: 'Last Year',
    range: () => {
      const lastYear = subYears(new Date(), 1);
      return {
        from: startOfYear(lastYear),
        to: endOfYear(lastYear)
      };
    }
  }
];

interface CalendarGridProps {
  month: Date;
  selectedRange: DateRange | undefined;
  onDateClick: (date: Date) => void;
  onMonthChange: (month: Date) => void;
  compact?: boolean;
  showLeftNav?: boolean;
  showRightNav?: boolean;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

function CalendarGrid({
  month,
  selectedRange,
  onDateClick,
  onMonthChange,
  compact = false,
  showLeftNav = false,
  showRightNav = false,
  onPrevMonth,
  onNextMonth
}: CalendarGridProps) {
  const monthStart = startOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });

  // Always render exactly 6 weeks (42 days) for consistent height
  const days: Date[] = [];
  let day = calendarStart;
  for (let i = 0; i < 42; i++) {
    days.push(day);
    day = addDays(day, 1);
  }

  const currentYear = month.getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

  const isInRange = (date: Date) => {
    if (!selectedRange?.from || !selectedRange?.to) return false;
    return isWithinInterval(date, {
      start: selectedRange.from,
      end: selectedRange.to
    });
  };

  const isRangeStart = (date: Date) => {
    return selectedRange?.from && isSameDay(date, selectedRange.from);
  };

  const isRangeEnd = (date: Date) => {
    return selectedRange?.to && isSameDay(date, selectedRange.to);
  };

  const cellSize = compact ? 'h-7 w-[30px]' : 'h-8 w-8';
  const fontSize = compact ? 'text-xs' : 'text-sm';

  return (
    <div className={compact ? 'w-[240px]' : 'w-[270px]'}>
      {/* Month/Year Selectors with Navigation */}
      <div className='mb-3 flex items-center gap-1'>
        {showLeftNav && (
          <Button
            variant='ghost'
            size='icon'
            className='h-7 w-7 shrink-0'
            onClick={onPrevMonth}
          >
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
        )}
        <Select
          value={month.getMonth().toString()}
          onValueChange={(value) => {
            const newMonth = new Date(month);
            newMonth.setMonth(parseInt(value));
            onMonthChange(newMonth);
          }}
        >
          <SelectTrigger
            className={cn('w-[110px] text-xs', compact ? 'h-7' : 'h-8')}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m, i) => (
              <SelectItem key={m} value={i.toString()} className='text-sm'>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={currentYear.toString()}
          onValueChange={(value) => {
            const newMonth = new Date(month);
            newMonth.setFullYear(parseInt(value));
            onMonthChange(newMonth);
          }}
        >
          <SelectTrigger
            className={cn('w-[90px] text-xs', compact ? 'h-7' : 'h-8')}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()} className='text-xs'>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showRightNav && (
          <Button
            variant='ghost'
            size='icon'
            className='h-7 w-7 shrink-0'
            onClick={onNextMonth}
          >
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
        )}
      </div>

      {/* Month Label */}
      <div className={cn('mb-2 text-center font-medium', fontSize)}>
        {format(month, 'MMMM yyyy')}
      </div>

      {/* Weekday Headers */}
      <div className='grid grid-cols-7'>
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className={cn(
              cellSize,
              'text-muted-foreground flex items-center justify-center text-xs font-medium'
            )}
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Days Grid - Fixed 6 rows */}
      <div className='grid grid-cols-7'>
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, month);
          const isStart = isRangeStart(date);
          const isEnd = isRangeEnd(date);
          const inRange = isInRange(date);
          const isToday = isSameDay(date, new Date());

          return (
            <div
              key={index}
              className={cn(
                'relative flex items-center justify-center',
                cellSize,
                inRange && !isStart && !isEnd && 'bg-accent',
                isStart && inRange && 'bg-accent rounded-l-md',
                isEnd && inRange && 'bg-accent rounded-r-md'
              )}
            >
              <button
                type='button'
                onClick={() => onDateClick(date)}
                disabled={!isCurrentMonth}
                className={cn(
                  cellSize,
                  'rounded-md font-normal transition-colors',
                  fontSize,
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:ring-ring focus:ring-1 focus:outline-none',
                  !isCurrentMonth &&
                    'text-muted-foreground/30 pointer-events-none',
                  isCurrentMonth && 'text-foreground',
                  isToday && !isStart && !isEnd && 'border-primary border',
                  (isStart || isEnd) &&
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                )}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
  defaultToToday = false
}: DatePickerWithRangeProps) {
  // Get today's date range
  const getTodayRange = (): DateRange => {
    const today = new Date();
    return { from: today, to: today };
  };

  const getInitialRange = (): DateRange | undefined => {
    if (date) return date;
    if (defaultToToday) return getTodayRange();
    return undefined;
  };

  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(getInitialRange());
  const [leftMonth, setLeftMonth] = React.useState<Date>(
    date?.from || new Date()
  );
  const [rightMonth, setRightMonth] = React.useState<Date>(
    addMonths(date?.from || new Date(), 1)
  );
  const [selectingEnd, setSelectingEnd] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState<string | null>(
    defaultToToday ? 'Today' : null
  );

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Notify parent of initial value if defaultToToday is true
  React.useEffect(() => {
    if (defaultToToday && !date && setDate) {
      const todayRange = getTodayRange();
      setDate(todayRange);
    }
  }, []);

  React.useEffect(() => {
    if (date !== selectedRange) {
      setSelectedRange(date);
    }
  }, [date]);

  const handleDateClick = (clickedDate: Date) => {
    if (!selectingEnd || !selectedRange?.from) {
      // Start new selection
      setSelectedRange({ from: clickedDate, to: undefined });
      setSelectingEnd(true);
      setActivePreset(null);
    } else {
      // Complete the range
      const from = selectedRange.from;
      if (clickedDate < from) {
        const newRange = { from: clickedDate, to: from };
        setSelectedRange(newRange);
        setDate?.(newRange);
      } else {
        const newRange = { from, to: clickedDate };
        setSelectedRange(newRange);
        setDate?.(newRange);
      }
      setSelectingEnd(false);
    }
  };

  const handlePresetSelect = (preset: (typeof presetRanges)[0]) => {
    const range = preset.range();
    setSelectedRange(range);
    setDate?.(range);
    setActivePreset(preset.label);
    setLeftMonth(range.from);
    setRightMonth(addMonths(range.from, 1));
    setSelectingEnd(false);
  };

  const handlePrevMonth = () => {
    setLeftMonth(subMonths(leftMonth, 1));
    setRightMonth(subMonths(rightMonth, 1));
  };

  const handleNextMonth = () => {
    setLeftMonth(addMonths(leftMonth, 1));
    setRightMonth(addMonths(rightMonth, 1));
  };

  const handleLeftMonthChange = (newMonth: Date) => {
    setLeftMonth(newMonth);
    // Ensure right month is always after left month
    if (newMonth >= rightMonth) {
      setRightMonth(addMonths(newMonth, 1));
    }
  };

  const handleRightMonthChange = (newMonth: Date) => {
    setRightMonth(newMonth);
    // Ensure left month is always before right month
    if (newMonth <= leftMonth) {
      setLeftMonth(subMonths(newMonth, 1));
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={cn(
              'h-9 justify-start text-left font-normal',
              isMobile ? 'w-full' : 'w-[260px]',
              !selectedRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {selectedRange?.from ? (
              selectedRange.to ? (
                <span className='text-xs sm:text-sm'>
                  {format(selectedRange.from, 'dd MMM, yyyy')} -{' '}
                  {format(selectedRange.to, 'dd MMM, yyyy')}
                </span>
              ) : (
                format(selectedRange.from, 'dd MMM, yyyy')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align={isMobile ? 'center' : 'end'}
          sideOffset={4}
        >
          <div
            className={cn(
              'flex',
              isMobile && 'max-h-[80vh] flex-col overflow-y-auto'
            )}
          >
            {/* Preset Options */}
            <div
              className={cn(
                'flex flex-col',
                isMobile ? 'order-first border-b' : 'border-r'
              )}
            >
              <div className='p-2'>
                <div
                  className={cn(
                    'gap-1',
                    isMobile ? 'grid grid-cols-3' : 'flex flex-col space-y-0.5'
                  )}
                >
                  {presetRanges.map((preset) => (
                    <Button
                      key={preset.label}
                      variant={
                        activePreset === preset.label ? 'default' : 'ghost'
                      }
                      size='sm'
                      className={cn(
                        'h-7 justify-start px-2 text-sm font-normal',
                        isMobile && 'justify-center',
                        activePreset === preset.label &&
                          'bg-primary text-primary-foreground'
                      )}
                      onClick={() => handlePresetSelect(preset)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendars */}
            <div className='p-3'>
              <div
                className={cn(
                  'flex items-start',
                  isMobile ? 'flex-col gap-3' : 'gap-4'
                )}
              >
                {/* Mobile Navigation */}
                {isMobile && (
                  <div className='flex w-full items-center justify-between px-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7'
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeftIcon className='h-4 w-4' />
                    </Button>
                    <span className='text-sm font-medium'>
                      Select Date Range
                    </span>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7'
                      onClick={handleNextMonth}
                    >
                      <ChevronRightIcon className='h-4 w-4' />
                    </Button>
                  </div>
                )}

                {/* Left Calendar */}
                <CalendarGrid
                  month={leftMonth}
                  selectedRange={selectedRange}
                  onDateClick={handleDateClick}
                  onMonthChange={handleLeftMonthChange}
                  compact={true}
                  showLeftNav={!isMobile}
                  onPrevMonth={handlePrevMonth}
                />

                {/* Right Calendar */}
                <CalendarGrid
                  month={rightMonth}
                  selectedRange={selectedRange}
                  onDateClick={handleDateClick}
                  onMonthChange={handleRightMonthChange}
                  compact={true}
                  showRightNav={!isMobile}
                  onNextMonth={handleNextMonth}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
