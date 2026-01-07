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
import { Info, Building2 } from 'lucide-react';

export default function WorkspacesPage() {
  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Workspace management has been removed along with Clerk authentication'
    >
      <div className='space-y-6'>
        {/* Info Alert */}
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            Clerk Organizations functionality has been completely removed from
            this project. This page would typically allow you to manage
            workspaces and switch between them.
          </AlertDescription>
        </Alert>

        {/* Placeholder Content */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Building2 className='h-5 w-5' />
              Workspace Management
            </CardTitle>
            <CardDescription>
              This feature was previously powered by Clerk Organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Implement your own workspace/organization system here, such as:
            </p>
            <ul className='text-muted-foreground mt-4 list-inside list-disc space-y-2'>
              <li>Custom organization management</li>
              <li>Team member invitations</li>
              <li>Role-based access control</li>
              <li>Workspace switching</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
