import { NavItem } from '@/types';

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/core/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['c', 'c'],
    items: []
  },
  {
    title: 'Workspaces',
    url: '/core/workspaces',
    icon: 'workspace',
    isActive: false,
    items: []
  },
  {
    title: 'Teams',
    url: '/core/workspaces/team',
    icon: 'teams',
    isActive: false,
    items: [],
    // Require organization to be active
    access: { requireOrg: true }
    // Alternative: require specific permission
    // access: { requireOrg: true, permission: 'org:teams:view' }
  },
  {
    title: 'Product',
    url: '/core/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Kanban',
    url: '/core/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: []
  },
  {
    title: 'Pro',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'pro',
    isActive: true,
    items: [
      {
        title: 'Exclusive',
        url: '/core/exclusive',
        icon: 'exclusive',
        shortcut: ['m', 'm']
      }
    ]
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'account',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/core/profile',
        icon: 'profile',
        shortcut: ['m', 'm']
      },
      {
        title: 'Billing',
        url: '/core/billing',
        icon: 'billing',
        shortcut: ['b', 'b'],
        // Only show billing if in organization context
        access: { requireOrg: true }
        // Alternative: require billing management permission
        // access: { requireOrg: true, permission: 'org:manage:billing' }
      }
    ]
  }
];
