// Types for all dashboard analytics/utilization APIs
// Extend as needed for new endpoints

// Example: User Analytics
export interface UserAnalyticsRequest {
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface UserAnalyticsResponse {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  users: Array<{
    id: string;
    name: string;
    email: string;
    joinedAt: string;
    lastActiveAt: string;
  }>;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Example: Workspace Utilization
export interface WorkspaceUtilizationRequest {
  workspaceId: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface WorkspaceUtilizationResponse {
  workspaceId: string;
  utilization: number;
  activeMembers: number;
  totalMembers: number;
  activity: Array<{
    date: string;
    count: number;
  }>;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Example: Product Analytics
export interface ProductAnalyticsRequest {
  productId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductAnalyticsResponse {
  productId: string;
  sales: number;
  revenue: number;
  refunds: number;
  salesByDate: Array<{
    date: string;
    sales: number;
    revenue: number;
  }>;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Add more API types as needed for each analytics/utilization endpoint

// 1. Traffic API
export interface TrafficResponse {
  accumulated_traffic: Array<{
    month_name: string;
    paid_user_views: number;
    trial_user_views: number;
  }>;
  tenant_wise_view: Array<{
    id: number;
    tenant_company: string;
    tenant_instance_name: string;
    is_paid: boolean;
    tenant_plan: string;
    paid_until: string;
    views: Array<{
      month_name: string;
      paid_user_views: number;
      trial_user_views: number;
    }>;
  }>;
}

// 2. Daily Utilization API (used for whatsapp, sms, video, disk_space)
export interface DailyUtilizationRequest {
  start_date?: string;
  end_date?: string;
  category: 'whatsapp' | 'sms' | 'video' | 'disk_space';
}
export interface DailyUtilizationUsage {
  paid_until: string;
  video_count: number;
  used_duration: number;
  video_size_sum: number;
  whatsapp_count: number;
  sms_count: number;
  outgoing_whatsapp: number;
  incoming_whatsapp: number;
  outgoing_sms: number;
  incoming_sms: number;
  tenant_company: string;
  tenant_instance_name: string;
  allowed_messages: number;
  allowed_space: number;
  allowed_duration: number;
  used_messages: number;
  used_space: number;
}
export interface DailyUtilizationResponse {
  usage: DailyUtilizationUsage[];
}

// 3. Tenants Analytics API
export interface TenantsAnalyticsRequest {
  type: 'paid' | 'default';
}
export interface TenantsAnalyticsResponseItem {
  id: number;
  email: string;
  tenant_type: string;
  customer: string;
  tickets_mtd: number;
  tickets_today: number;
  tickets_ytd: number;
  last_ticket_time: string | null;
  visits_mtd: number;
  visits_ytd: number;
  visits_today: number;
  visit_with_activity: number;
  visits_closed_mtd: number;
  visit_resolved_mtd: number;
  last_visit_time: string | null;
  user_registered_mtd: number;
  user_registered_ytd: number;
  user_registered_today: number;
  user_activated_mtd: number;
  logged_in_user_mtd: number;
  fr_count_today: number;
  fr_count_mtd: number;
  fr_count_ytd: number;
  fm_count_today: number;
  fm_count_mtd: number;
  fm_count_ytd: number;
  dispatcher_count_today: number;
  dispatcher_count_mtd: number;
  dispatcher_count_ytd: number;
  fr_count_till_date: number;
  fm_count_till_date: number;
  disp_count_till_date: number;
  activated_fr_details: number;
  activated_fm_details: number;
  activated_disp_details: number;
  months_tickets_closed_count: number;
  months_tickets_resolved_count: number;
  today_logged_in_fr_count: number;
  today_logged_in_fm_count: number;
  today_logged_in_disp_count: number;
  months_logged_in_fr_count: number;
  months_logged_in_fm_count: number;
  months_logged_in_disp_count: number;
  year_logged_in_fr_count: number;
  year_logged_in_fm_count: number;
  year_logged_in_disp_count: number;
}
export type TenantsAnalyticsResponse = TenantsAnalyticsResponseItem[];

// 4. Tenants List API (paginated)
export interface TenantsListRequest {
  page: number;
  from_date?: string;
  to_date?: string;
  tenant_type?: string;
  timezone?: string;
}
export interface TenantListItem {
  id: number;
  paid_until: string;
  on_trial: boolean;
  active_fa_count: number;
  allowed_users: number;
  business_email: string;
  client_type: string;
  company: string;
  company_description: string;
  company_score: number | null;
  couch_db_name: string;
  created_on: string;
  crm_install: boolean;
  crm_type: string;
  csm_assigned_and_touchpoint_notes: string;
  customer_support_mobile_number: string;
  end_date: string;
  field_agent_usage_percentage: number;
  final_comment: string;
  first_name: string;
  inactive_fa_count: number;
  is_godeksless_source: boolean;
  is_license_exceeded: boolean;
  is_paid_user: boolean;
  is_whitelabel_enabled: boolean;
  last_name: string;
  last_qbr_date: string | null;
  license_utilization_ratio: number | null;
  next_qbr_date: string | null;
  phone_number: string;
  plan_type: string;
  pool_id: string;
  product_name: string;
  s3_media_storage_path: string;
  secondary_first_name: string | null;
  secondary_last_name: string | null;
  secondary_phone: string | null;
  subdomain: string;
  tenant_type: string;
  tickets_count: number;
  total_activated_users: number;
  total_fa_count: number;
  total_licensed_users: number;
  trial_expired: boolean;
  visit_to_ticket_percent: number;
  visits_count: number;
  work_order_max_count: number;
}
export type TenantsListResponse = TenantListItem[];

// 5. Recent User Tenant Data
export interface RecentUserTenantDataRequest {
  count: number;
  fromDate: string;
  toDate: string;
  tenant_type: 'paid' | 'default';
}
export interface RecentUserTenantDataItem {
  tenant_name: string;
  users_count: number;
}
export interface RecentUserTenantDataResponse {
  results: RecentUserTenantDataItem[];
}

// 6. Recent Ticket Visit Tenant Data
export interface RecentTicketVisitTenantDataRequest {
  count: number;
  fromDate: string;
  toDate: string;
  tenant_type: 'paid' | 'default';
}
export interface RecentTicketVisitTenantDataItem {
  tenant_name: string;
  total_tickets: number;
  total_visits: number;
  total_tickets_visits: number;
}
export interface RecentTicketVisitTenantDataResponse {
  results: RecentTicketVisitTenantDataItem[];
}

// 7. Tenant Top Usage
export interface TenantTopUsageRequest {
  count: number;
  start_date: string;
  end_date: string;
  tenant_type: 'paid' | 'default';
}
export interface TenantTopUsageItem {
  video_count: number;
  whatsapp_count: number;
  sms_count: number;
  used_space: number;
  tenant_company: string;
  tenant_instance_name: string;
  total_count: number;
}
export interface TenantTopUsageResponse {
  usage: TenantTopUsageItem[];
}

// 8. Least Recent User Tenant Data
export interface LeastRecentUserTenantDataRequest {
  count: number;
  fromDate: string;
  toDate: string;
  tenant_type: 'paid' | 'default';
}
export interface LeastRecentUserTenantDataItem {
  tenant_name: string;
  users_count: number;
}
export interface LeastRecentUserTenantDataResponse {
  results: LeastRecentUserTenantDataItem[];
}

// 9. Avg Ticket Visit User Data
export interface AvgTicketVisitUserRequest {
  count: number;
  start_date: string;
  end_date: string;
  tenant_type: string;
}

export interface AvgTicketVisitUserResult {
  tenant_name: string;
  users_count: number;
  total_tickets: number;
  total_visits: number;
  total_tickets_visits: number;
  avg_ticket_visits_user: number;
}

export interface AvgTicketVisitUserResponse {
  results: AvgTicketVisitUserResult[];
}

// Tenant Average Utilization Data
export interface TenantAverageUtilizationRequest {
  count: number;
  start_date: string;
  end_date: string;
  tenant_type: string;
}

export interface TenantAverageUtilizationUsage {
  video_count: number;
  whatsapp_count: number;
  sms_count: number;
  used_space: number;
  tenant_company: string;
  tenant_instance_name: string;
  total_count: number;
  total_users: number;
  average_tenant: number;
}

export interface TenantAverageUtilizationResponse {
  usage: TenantAverageUtilizationUsage[];
}

// API Utilization MTD
export interface ApiUtilizationMtdItem {
  id: number;
  tenant: string;
  tenant_type: string;
  from: string;
  to: string;
  total_api_hits: number;
  maximum_total_api_hits: number;
  total_success_hits: number;
  total_failed_hits: number;
}

export interface ApiUtilizationMtdResponse {
  status: boolean;
  data: ApiUtilizationMtdItem[];
}

// Generic API error
export interface ApiError {
  message: string;
  code?: string | number;
}
