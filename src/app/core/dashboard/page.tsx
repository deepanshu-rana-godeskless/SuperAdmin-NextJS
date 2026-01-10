'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import HeaderCards from './components/HeaderCards';
import {
  fetchTraffic,
  fetchDailyUtilization,
  fetchTenantsAnalytics,
  fetchTenantsList,
  fetchRecentUserTenantData,
  fetchRecentTicketVisitTenantData,
  fetchTenantTopUsage,
  fetchLeastRecentUserTenantData
} from './services';
import type {
  TrafficResponse,
  DailyUtilizationResponse,
  TenantsAnalyticsResponse,
  TenantsListResponse,
  RecentUserTenantDataResponse,
  RecentTicketVisitTenantDataResponse,
  TenantTopUsageResponse,
  LeastRecentUserTenantDataResponse
} from './types/api-types';

export default function DashboardPage() {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const token = undefined;
        const today = new Date().toISOString().slice(0, 10);
        const defaultParams = {
          start_date: today,
          end_date: today,
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
          leastRecentUserTenantDataRes
        ] = await Promise.all([
          fetchTraffic(token).catch((e) => {
            toast.error('Failed to fetch traffic data');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'whatsapp', start_date: today, end_date: today },
            token
          ).catch((e) => {
            toast.error('Failed to fetch WhatsApp utilization');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'sms', start_date: today, end_date: today },
            token
          ).catch((e) => {
            toast.error('Failed to fetch SMS utilization');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'video', start_date: today, end_date: today },
            token
          ).catch((e) => {
            toast.error('Failed to fetch video utilization');
            return null;
          }),
          fetchDailyUtilization(
            { category: 'disk_space', start_date: today, end_date: today },
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
              from_date: today,
              to_date: today,
              tenant_type: '',
              timezone: defaultParams.timezone
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch tenants list');
            return null;
          }),
          fetchRecentUserTenantData(
            { count: 5, fromDate: today, toDate: today, tenant_type: 'paid' },
            token
          ).catch((e) => {
            toast.error('Failed to fetch recent user tenant data');
            return null;
          }),
          fetchRecentTicketVisitTenantData(
            { count: 5, fromDate: today, toDate: today, tenant_type: 'paid' },
            token
          ).catch((e) => {
            toast.error('Failed to fetch recent ticket/visit tenant data');
            return null;
          }),
          fetchTenantTopUsage(
            {
              count: 5,
              start_date: today,
              end_date: today,
              tenant_type: 'paid'
            },
            token
          ).catch((e) => {
            toast.error('Failed to fetch tenant top usage');
            return null;
          }),
          fetchLeastRecentUserTenantData(
            { count: 5, fromDate: today, toDate: today, tenant_type: 'paid' },
            token
          ).catch((e) => {
            toast.error('Failed to fetch least recent user tenant data');
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
        // Show success toast if all loaded (at least one is not null)
        if (
          trafficRes &&
          utilWhatsapp &&
          utilSms &&
          utilVideo &&
          utilDisk &&
          tenantsAnalyticsRes &&
          tenantsListRes &&
          recentUserTenantDataRes &&
          recentTicketVisitTenantDataRes &&
          tenantTopUsageRes &&
          leastRecentUserTenantDataRes
        ) {
          toast.success('Dashboard data loaded successfully!');
        }
      } catch (e) {
        toast.error('Dashboard data failed to load.');
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // You can pass these states to child components as needed
  return (
    <div>
      {loading && <div>Loading dashboard data...</div>}
      <HeaderCards />
      {/* Example: <DashboardStats traffic={traffic} utilization={utilizationWhatsapp} ... /> */}
    </div>
  );
}
