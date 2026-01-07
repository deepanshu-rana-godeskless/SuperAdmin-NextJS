'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Users } from 'lucide-react';

export default function TeamPage() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Team management features have been removed along with Clerk authentication'
    >
      <div className='space-y-6'>
        {/* Info Alert */}
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            Clerk Organization Profile functionality has been completely removed
            from this project. This page would typically allow you to manage
            workspace team members, roles, and security.
          </AlertDescription>
        </Alert>

        {/* Placeholder Content */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Users className='h-5 w-5' />
              Team Management
            </CardTitle>
            <CardDescription>
              This feature was previously powered by Clerk Organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Implement your own team management system here, such as:
            </p>
            <ul className='text-muted-foreground mt-4 list-inside list-disc space-y-2'>
              <li>Member invitation system</li>
              <li>Role and permission management</li>
              <li>Security settings</li>
              <li>Team activity logs</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
