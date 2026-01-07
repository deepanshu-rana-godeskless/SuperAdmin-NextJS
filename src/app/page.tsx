import { redirect } from 'next/navigation';

export default async function Page() {
  // Redirect to dashboard since auth is removed
  redirect('/dashboard/overview');
}
