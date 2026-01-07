'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { BadgeCheck, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ExclusivePage() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        {/* Info Alert */}
        <Alert>
          <Lock className='h-4 w-4' />
          <AlertDescription>
            Plan-based protection features have been removed along with Clerk
            authentication. This page would typically require a Pro plan to
            access.
          </AlertDescription>
        </Alert>

        {/* Placeholder Content */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BadgeCheck className='h-5 w-5' />
              Exclusive Features
            </CardTitle>
            <CardDescription>
              This feature was previously protected by Clerk billing plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Implement your own plan-based access control here, such as:
            </p>
            <ul className='text-muted-foreground mt-4 list-inside list-disc space-y-2'>
              <li>Custom subscription checks</li>
              <li>Feature flag management</li>
              <li>Premium content protection</li>
              <li>Usage limits enforcement</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
