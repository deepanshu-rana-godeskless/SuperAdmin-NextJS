export type LoginPayload = {
  username: string;
  password: string;
  user_type: 'management';
};

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  user_data: {
    email: string;
    product_name: string;
    crm_type: string;
    domain_name: string;
    user_type: string;
    id: number;
    company_name: string | null;
    phone_number: string | null;
    designation: string | null;
    date_joined: string;
    first_name: string | null;
    last_name: string | null;
    allowed_user: number;
    pool_id: string;
    is_admin: boolean;
    is_active: boolean;
  };
};

export type LoginErrorResponse = {
  msg: string;
  error_code: number;
};

export type LogoutResponse = {
  msg: string;
  success_code: number;
};
