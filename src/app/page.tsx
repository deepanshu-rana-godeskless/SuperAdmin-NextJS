import { redirect } from 'next/navigation';

export default async function Page() {
  // Redirect to core since auth is removed
  redirect('/core/overview');
}
