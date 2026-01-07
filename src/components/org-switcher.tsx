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

export function OrgSwitcher() {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                {activeOrganization.imageUrl ? (
                  <Image
                    src={activeOrganization.imageUrl}
                    alt={activeOrganization.name}
                    width={32}
                    height={32}
                    className='rounded-lg'
                  />
                ) : (
                  <GalleryVerticalEnd className='size-4' />
                )}
              </div>
              <div
                className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 overflow-hidden opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              >
                <span className='truncate font-semibold'>
                  {activeOrganization.name}
                </span>
                <span className='truncate text-xs'>Organization</span>
              </div>
              <ChevronsUpDown
                className={`ml-auto transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Organizations
            </DropdownMenuLabel>
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-sm border'>
                {activeOrganization.imageUrl ? (
                  <Image
                    src={activeOrganization.imageUrl}
                    alt={activeOrganization.name}
                    width={24}
                    height={24}
                    className='rounded-sm'
                  />
                ) : (
                  <GalleryVerticalEnd className='size-4' />
                )}
              </div>
              {activeOrganization.name}
              <Check className='ml-auto size-4' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2' disabled>
              <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>
                Organizations disabled (Clerk removed)
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default OrgSwitcher;
