import React from 'react';
import PageContainer from '@/components/layout/page-container';
import Page from '@/app/page';
import { CustomersPieChart } from './helpers/CustomersPieChart';
import { AvgTicketsVisitsChart } from './helpers/AvgTicketsVisitsChart';

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
  loading?: boolean;
  avgTicketVisitUser?: any;
}

function InsightsCharts({
  tenantsAnalytics,
  avgTicketVisitUser,
  loading,
  ...rest
}: InsightsChartsProps) {
  return (
    <>
      <div className='mt-6 mb-4'>
        <h2 className='mb-1 text-xl font-semibold text-gray-900'>
          Analytics Overview
        </h2>
        <p className='text-sm text-gray-600'>
          Key insights and performance metrics
        </p>
      </div>
      <section className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <CustomersPieChart
          tenantsAnalytics={tenantsAnalytics}
          loading={loading}
        />
        <AvgTicketsVisitsChart data={avgTicketVisitUser} loading={loading} />

        {/* Add more chart cards here for other analytics */}
      </section>
    </>
  );
}

export default InsightsCharts;
