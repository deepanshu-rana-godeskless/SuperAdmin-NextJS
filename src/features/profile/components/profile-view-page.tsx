import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, User } from 'lucide-react';

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col space-y-6 p-4'>
      {/* Info Alert */}
      <Alert>
        <Info className='h-4 w-4' />
        <AlertDescription>
          Clerk User Profile functionality has been completely removed from this
          project. This page would typically allow you to manage your user
          profile and settings.
        </AlertDescription>
      </Alert>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            User Profile Management
          </CardTitle>
          <CardDescription>
            This feature was previously powered by Clerk UserProfile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Implement your own user profile management system here, such as:
          </p>
          <ul className='text-muted-foreground mt-4 list-inside list-disc space-y-2'>
            <li>Profile information editing</li>
            <li>Avatar upload</li>
            <li>Password management</li>
            <li>Account security settings</li>
            <li>Notification preferences</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
