import React from 'react';
import PageContainer from '@/components/layout/page-container';
import Page from '@/app/page';
import { CustomersPieChart } from './helpers/CustomersPieChart';
import { AvgTicketsVisitsChart } from './helpers/AvgTicketsVisitsChart';
import { AvgMediaUsage } from './helpers/AvgMediaUsage';
import { ApiUtilizationMtdChart } from './helpers/ApiUtilizationMtdChart';
import { TransactionTrendChart } from './helpers/TransactionTrendChart';
import { TicketsVisitsLineChart } from './helpers/TicketsVisitsLineChart';
import { TopTicketsVisitsBarChart } from './helpers/TopTicketsVisitsBarChart';
import { BottomTicketsVisitsBarChart } from './helpers/BottomTicketsVisitsBarChart';

// Define the prop types for analytics data (replace with actual types)
interface InsightsChartsProps {
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
  leastTicketVisitTenantData?: any;
  loading?: boolean;
  avgTicketVisitUser?: any;
  tenantAverageUtilization?: any;
  apiUtilizationMtd?: any;
  transactionTrend?: any;
}

function InsightsCharts({
  tenantsAnalytics,
  avgTicketVisitUser,
  tenantAverageUtilization,
  apiUtilizationMtd,
  transactionTrend,
  recentTicketVisitTenantData,
  leastTicketVisitTenantData,
  loading,
  ...rest
}: InsightsChartsProps) {
  return (
    <>
      <div className='mt-6 mb-4'>
        <h2 className='text-foreground mb-1 text-xl font-semibold'>
          Analytics Overview
        </h2>
        <p className='text-foreground/70 text-sm'>
          Key insights and performance metrics
        </p>
      </div>
      <section className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <CustomersPieChart
          tenantsAnalytics={tenantsAnalytics}
          loading={loading}
        />
        <AvgTicketsVisitsChart data={avgTicketVisitUser} loading={loading} />
        <AvgMediaUsage data={tenantAverageUtilization} loading={loading} />
        <ApiUtilizationMtdChart data={apiUtilizationMtd} loading={loading} />
      </section>
      <div className='mt-6 mb-4'>
        <h2 className='text-foreground mb-1 text-xl font-semibold'>
          Tickets Analytics Overview
        </h2>
        <p className='text-foreground/70 text-sm'>
          Key insights and performance metrics related to Tickets
        </p>
      </div>
      <section className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <TransactionTrendChart data={transactionTrend} loading={loading} />
        <TicketsVisitsLineChart data={transactionTrend} loading={loading} />
        <TopTicketsVisitsBarChart
          data={recentTicketVisitTenantData}
          loading={loading}
        />
        <BottomTicketsVisitsBarChart
          data={leastTicketVisitTenantData}
          loading={loading}
        />
      </section>
    </>
  );
}

export default InsightsCharts;
