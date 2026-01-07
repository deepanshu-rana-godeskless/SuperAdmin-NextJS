'use client';

import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

export function OrgSidebarHeader() {
  const { isMobile, state } = useSidebar();

  // Mock organization data since Clerk is removed
  const activeOrganization = {
    id: 'default-org',
    name: 'Default Organization',
    slug: 'default-org',
    imageUrl: null
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size='lg'>
          {/* Icon */}
          <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
            <GalleryVerticalEnd className='size-4' />
          </div>

          {/* Organization Name */}
          <div
            className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
              state === 'collapsed'
                ? 'invisible max-w-0 overflow-hidden opacity-0'
                : 'visible max-w-full opacity-100'
            }`}
          >
            <span className='truncate font-semibold'>GoDeskless Inc.</span>
            <span className='text-muted-foreground truncate text-xs'>
              Organization
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default OrgSidebarHeader;
