'use client';

/**
 * Navigation hook for filtering menu items based on access controls
 *
 * WARNING: Clerk authentication has been removed from this project.
 * This hook now provides basic functionality without actual authentication.
 *
 * For production use, implement your own authentication system with proper server-side checks.
 * Note: This is only for UI visibility and should not be relied upon for actual security.
 */

import { useMemo } from 'react';
import type { NavItem } from '@/types';

/**
 * Hook to filter navigation items (basic implementation without auth)
 *
 * @param items - Array of navigation items to filter
 * @returns Filtered items (currently returns all items since auth is removed)
 */
export function useFilteredNavItems(items: NavItem[]) {
  // Mock access context since Clerk is removed
  const accessContext = useMemo(() => {
    return {
      organization: { id: 'default-org', name: 'Default Organization' },
      user: { id: 'default-user', fullName: 'Demo User' },
      permissions: ['manage', 'read', 'write'] as string[],
      role: 'admin' as string,
      hasOrg: true
    };
  }, []);

  // Return all items since we don't have real authentication
  const filteredItems = useMemo(() => {
    // For now, just return all items without filtering
    // In a real implementation, you would implement your own access control logic
    return items.map((item) => ({
      ...item,
      items: item.items ? item.items : undefined
    }));
  }, [items]);

  return filteredItems;
}
