'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import NProgress from 'nprogress';
import PageContainer from '@/components/layout/page-container';
import HeaderCards from './components/HeaderCards';
import InsightsCharts from './components/InsightsCharts';
import {
  fetchTraffic,
  fetchDailyUtilization,
  fetchTenantsAnalytics,
  fetchTenantsList,
  fetchRecentUserTenantData,
  fetchRecentTicketVisitTenantData,
  fetchTenantTopUsage,
  fetchLeastRecentUserTenantData,
  fetchAvgTicketVisitUser,
  fetchTenantAverageUtilization,
  fetchApiUtilizationMtd,
  fetchTransactionTrend,
  fetchLeastTicketVisitTenantData
} from './services';
import type {
  TrafficResponse,
  DailyUtilizationResponse,
  TenantsAnalyticsResponse,
  TenantsListResponse,
  RecentUserTenantDataResponse,
  RecentTicketVisitTenantDataResponse,
  TenantTopUsageResponse,
  LeastRecentUserTenantDataResponse,
  AvgTicketVisitUserResponse,
  TenantAverageUtilizationResponse,
  ApiUtilizationMtdResponse,
  TransactionTrendResponse,
  LeastTicketVisitTenantDataResponse
} from './types/api-types';
import { formatDateForApi } from './lib/dashboard-utils';

export default function DashboardPage() {
  // Date range state - default to today
  const today = formatDateForApi(new Date());
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);

  // States for each API
  const [traffic, setTraffic] = useState<TrafficResponse | null>(null);
  const [utilizationWhatsapp, setUtilizationWhatsapp] =
    useState<DailyUtilizationResponse | null>(null);
  const [utilizationSms, setUtilizationSms] =
    useState<DailyUtilizationResponse | null>(null);
  const [utilizationVideo, setUtilizationVideo] =
    useState<DailyUtilizationResponse | null>(null);
  const [utilizationDisk, setUtilizationDisk] =
    useState<DailyUtilizationResponse | null>(null);
  const [tenantsAnalytics, setTenantsAnalytics] =
    useState<TenantsAnalyticsResponse | null>(null);
  const [tenantsList, setTenantsList] = useState<TenantsListResponse | null>(
    null
  );
  const [recentUserTenantData, setRecentUserTenantData] =
    useState<RecentUserTenantDataResponse | null>(null);
  const [recentTicketVisitTenantData, setRecentTicketVisitTenantData] =
    useState<RecentTicketVisitTenantDataResponse | null>(null);
  const [tenantTopUsage, setTenantTopUsage] =
    useState<TenantTopUsageResponse | null>(null);
  const [leastRecentUserTenantData, setLeastRecentUserTenantData] =
    useState<LeastRecentUserTenantDataResponse | null>(null);
  const [avgTicketVisitUser, setAvgTicketVisitUser] =
    useState<AvgTicketVisitUserResponse | null>(null);
  const [tenantAverageUtilization, setTenantAverageUtilization] =
    useState<TenantAverageUtilizationResponse | null>(null);
  const [apiUtilizationMtd, setApiUtilizationMtd] =
    useState<ApiUtilizationMtdResponse | null>(null);
  const [transactionTrend, setTransactionTrend] =
    useState<TransactionTrendResponse | null>(null);
  const [leastTicketVisitTenantData, setLeastTicketVisitTenantData] =
    useState<LeastTicketVisitTenantDataResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data with given date range
  const fetchAllData = useCallback(
    async (start_date: string, end_date: string) => {
      setLoading(true);
      NProgress.start();
      try {
        const token = undefined;
        const defaultParams = {
          count: 5,
          tenant_type: 'paid',
          page: 1,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        const [
          trafficRes,
          utilWhatsapp,
          utilSms,
          utilVideo,
          utilDisk,
          tenantsAnalyticsRes,
          tenantsListRes,
          recentUserTenantDataRes,
          recentTicketVisitTenantDataRes,
          tenantTopUsageRes,
          leastRecentUserTenantDataRes,
          avgTicketVisitUserRes,
          tenantAverageUtilizationRes,
          apiUtilizationMtdRes,
          transactionTrendRes,
          leastTicketVisitTenantDataRes
        ] = await Promise.all([
          fetchTraffic(token).catch((e) => {
            toast.error('Failed to fetch traffic data');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'whatsapp', start_date, end_date },
            token
          ).catch((e) => {
            toast.error('Failed to fetch WhatsApp utilization');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'sms', start_date, end_date },
            token
          ).catch((e) => {
            toast.error('Failed to fetch SMS utilization');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'video', start_date, end_date },
            token
          ).catch((e) => {
            toast.error('Failed to fetch video utilization');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'disk_space', start_date, end_date },
            token
          ).catch((e) => {
            toast.error('Failed to fetch disk space utilization');
            return null;
          }),
          fetchTenantsAnalytics({ type: 'paid' }, token).catch((e) => {
            toast.error('Failed to fetch tenants analytics');
            return null;
          }),
          fetchTenantsList(
            {
              page: 1,
              from_date: start_date,
              to_date: end_date,
              tenant_type: '',
              timezone: defaultParams.timezone
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch tenants list');
            return null;
          }),
          fetchRecentUserTenantData(
            {
              count: 5,
              fromDate: start_date,
              toDate: end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch recent user tenant data');
            return null;
          }),
          fetchRecentTicketVisitTenantData(
            {
              count: 5,
              fromDate: start_date,
              toDate: end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch recent ticket/visit tenant data');
            return null;
          }),
          fetchTenantTopUsage(
            {
              count: 5,
              start_date,
              end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch tenant top usage');
            return null;
          }),
          fetchLeastRecentUserTenantData(
            {
              count: 5,
              fromDate: start_date,
              toDate: end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch least recent user tenant data');
            return null;
          }),
          fetchAvgTicketVisitUser(
            {
              count: 5,
              start_date,
              end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch avg ticket/visit user data');
            return null;
          }),
          fetchTenantAverageUtilization(
            {
              count: 5,
              start_date,
              end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch tenant average utilization data');
            return null;
          }),
          fetchApiUtilizationMtd(token).catch((e) => {
            toast.error('Failed to fetch API Utilization MTD data');
            return null;
          }),
          fetchTransactionTrend(
            {
              start_date,
              end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch tickets & visits data');
            return null;
          }),
          fetchLeastTicketVisitTenantData(
            {
              count: 5,
              fromDate: start_date,
              toDate: end_date,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch bottom tickets/visits data');
            return null;
          })
        ]);
        setTraffic(trafficRes);
        setUtilizationWhatsapp(utilWhatsapp);
        setUtilizationSms(utilSms);
        setUtilizationVideo(utilVideo);
        setUtilizationDisk(utilDisk);
        setTenantsAnalytics(tenantsAnalyticsRes);
        setTenantsList(tenantsListRes);
        setRecentUserTenantData(recentUserTenantDataRes);
        setRecentTicketVisitTenantData(recentTicketVisitTenantDataRes);
        setTenantTopUsage(tenantTopUsageRes);
        setLeastRecentUserTenantData(leastRecentUserTenantDataRes);
        setAvgTicketVisitUser(avgTicketVisitUserRes);
        setTenantAverageUtilization(tenantAverageUtilizationRes);
        setApiUtilizationMtd(apiUtilizationMtdRes);
        setTransactionTrend(transactionTrendRes);
        setLeastTicketVisitTenantData(leastTicketVisitTenantDataRes);
      } catch (e) {
        toast.error('Dashboard data failed to load.');
      } finally {
        setLoading(false);
        NProgress.done();
      }
    },
    []
  );

  // Handle date range change from the DatePicker
  const handleDateRangeChange = useCallback(
    (newStartDate: string, newEndDate: string) => {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      // Refetch all data with new date range
      fetchAllData(newStartDate, newEndDate);
    },
    [fetchAllData]
  );

  // Initial data fetch on mount
  useEffect(() => {
    fetchAllData(startDate, endDate);
  }, []);

  // You can pass these states to child components as needed
  return (
    <PageContainer>
      <HeaderCards
        onDateRangeChange={handleDateRangeChange}
        traffic={traffic}
        utilizationWhatsapp={utilizationWhatsapp}
        utilizationSms={utilizationSms}
        utilizationVideo={utilizationVideo}
        utilizationDisk={utilizationDisk}
        tenantsAnalytics={tenantsAnalytics}
        workspaceUtilization={null}
        tenantsList={tenantsList}
        recentUserTenantData={recentUserTenantData}
        recentTicketVisitTenantData={recentTicketVisitTenantData}
        tenantTopUsage={tenantTopUsage}
        leastRecentUserTenantData={leastRecentUserTenantData}
        avgTicketVisitUser={avgTicketVisitUser}
        loading={loading}
      />
      <InsightsCharts
        traffic={traffic}
        utilizationWhatsapp={utilizationWhatsapp}
        utilizationSms={utilizationSms}
        utilizationVideo={utilizationVideo}
        utilizationDisk={utilizationDisk}
        tenantsAnalytics={tenantsAnalytics}
        workspaceUtilization={null}
        tenantsList={tenantsList}
        recentUserTenantData={recentUserTenantData}
        recentTicketVisitTenantData={recentTicketVisitTenantData}
        tenantTopUsage={tenantTopUsage}
        leastRecentUserTenantData={leastRecentUserTenantData}
        avgTicketVisitUser={avgTicketVisitUser}
        tenantAverageUtilization={tenantAverageUtilization}
        apiUtilizationMtd={apiUtilizationMtd}
        transactionTrend={transactionTrend}
        leastTicketVisitTenantData={leastTicketVisitTenantData}
        loading={loading}
      />
    </PageContainer>
  );
}
