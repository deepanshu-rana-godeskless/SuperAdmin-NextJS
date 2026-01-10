// Dashboard analytics/utilization API services
import axios from 'axios';
import { environment } from '@/environment';
import type {
  UserAnalyticsRequest,
  UserAnalyticsResponse,
  WorkspaceUtilizationRequest,
  WorkspaceUtilizationResponse,
  ProductAnalyticsRequest,
  ProductAnalyticsResponse,
  TrafficResponse,
  DailyUtilizationRequest,
  DailyUtilizationResponse,
  TenantsAnalyticsRequest,
  TenantsAnalyticsResponse,
  TenantsListRequest,
  TenantsListResponse,
  RecentUserTenantDataRequest,
  RecentUserTenantDataResponse,
  RecentTicketVisitTenantDataRequest,
  RecentTicketVisitTenantDataResponse,
  TenantTopUsageRequest,
  TenantTopUsageResponse,
  LeastRecentUserTenantDataRequest,
  LeastRecentUserTenantDataResponse,
  ApiError
} from '../types/api-types';

const API_BASE = environment.apiUrl;

// Helper to build query string from params
function toQuery(params: Record<string, any>): string {
  const esc = encodeURIComponent;
  return (
    '?' +
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${esc(k)}=${esc(v)}`)
      .join('&')
  );
}

// User Analytics
export async function fetchUserAnalytics(
  params: UserAnalyticsRequest
): Promise<UserAnalyticsResponse> {
  const url = `${API_BASE}/analytics/users${toQuery(params)}`;
  const { data } = await axios.get<UserAnalyticsResponse>(url);
  return data;
}

// Workspace Utilization
export async function fetchWorkspaceUtilization(
  params: WorkspaceUtilizationRequest
): Promise<WorkspaceUtilizationResponse> {
  const url = `${API_BASE}/analytics/workspaces${toQuery(params)}`;
  const { data } = await axios.get<WorkspaceUtilizationResponse>(url);
  return data;
}

// Product Analytics
export async function fetchProductAnalytics(
  params: ProductAnalyticsRequest
): Promise<ProductAnalyticsResponse> {
  const url = `${API_BASE}/analytics/products${toQuery(params)}`;
  const { data } = await axios.get<ProductAnalyticsResponse>(url);
  return data;
}

// 1. Traffic API
export async function fetchTraffic(token?: string): Promise<TrafficResponse> {
  const url = `${API_BASE}/api/get/traffic/`;
  const { data } = await axios.get<TrafficResponse>(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return data;
}

// 2. Daily Utilization API (category: whatsapp|sms|video|disk_space)
export async function fetchDailyUtilization(
  params: DailyUtilizationRequest,
  token?: string
): Promise<DailyUtilizationResponse> {
  const url = `${API_BASE}/api/get/daily-utilization/?category=${params.category}`;
  const { data } = await axios.post<DailyUtilizationResponse>(
    url,
    {
      start_date: params.start_date || '',
      end_date: params.end_date || ''
    },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    }
  );
  return data;
}

// 3. Tenants Analytics API
export async function fetchTenantsAnalytics(
  params: TenantsAnalyticsRequest,
  token?: string
): Promise<TenantsAnalyticsResponse> {
  const url = `${API_BASE}/api/get/tenants/analytics/?type=${params.type}`;
  const { data } = await axios.get<TenantsAnalyticsResponse>(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return data;
}

// 4. Tenants List API (paginated)
export async function fetchTenantsList(
  params: TenantsListRequest,
  token?: string
): Promise<TenantsListResponse> {
  const url = `${API_BASE}/api/get/tenants/?page=${params.page}`;
  const { data } = await axios.post<TenantsListResponse>(
    url,
    {
      from_date: params.from_date,
      to_date: params.to_date,
      tenant_type: params.tenant_type,
      timezone: params.timezone
    },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    }
  );
  return data;
}

// 5. Recent User Tenant Data
export async function fetchRecentUserTenantData(
  params: RecentUserTenantDataRequest,
  token?: string
): Promise<RecentUserTenantDataResponse> {
  const url = `${API_BASE}/api/get/recent-user-tenant-data/`;
  const { data } = await axios.post<RecentUserTenantDataResponse>(url, params, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return data;
}

// 6. Recent Ticket Visit Tenant Data
export async function fetchRecentTicketVisitTenantData(
  params: RecentTicketVisitTenantDataRequest,
  token?: string
): Promise<RecentTicketVisitTenantDataResponse> {
  const url = `${API_BASE}/api/get/recent-ticket-visit-tenant-data/`;
  const { data } = await axios.post<RecentTicketVisitTenantDataResponse>(
    url,
    params,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    }
  );
  return data;
}

// 7. Tenant Top Usage
export async function fetchTenantTopUsage(
  params: TenantTopUsageRequest,
  token?: string
): Promise<TenantTopUsageResponse> {
  const url = `${API_BASE}/api/get/tenant-top-usage/`;
  const { data } = await axios.post<TenantTopUsageResponse>(url, params, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return data;
}

// 8. Least Recent User Tenant Data
export async function fetchLeastRecentUserTenantData(
  params: LeastRecentUserTenantDataRequest,
  token?: string
): Promise<LeastRecentUserTenantDataResponse> {
  const url = `${API_BASE}/api/get/least-recent-user-tenant-data/`;
  const { data } = await axios.post<LeastRecentUserTenantDataResponse>(
    url,
    params,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    }
  );
  return data;
}
