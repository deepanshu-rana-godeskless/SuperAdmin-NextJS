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
import { Info } from 'lucide-react';

export default function BillingPage() {
  return (
    <PageContainer
      pageTitle='Billing & Plans'
      pageDescription='Billing features have been removed along with Clerk authentication'
    >
      <div className='space-y-6'>
        {/* Info Alert */}
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            Clerk billing functionality has been completely removed from this
            project. This page would typically manage subscriptions and usage
            limits.
          </AlertDescription>
        </Alert>

        {/* Placeholder Content */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Management</CardTitle>
            <CardDescription>
              This feature was previously powered by Clerk Billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Implement your own billing system here, such as:
            </p>
            <ul className='text-muted-foreground mt-4 list-inside list-disc space-y-2'>
              <li>Stripe integration</li>
              <li>Custom subscription management</li>
              <li>Usage tracking</li>
              <li>Plan management</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
