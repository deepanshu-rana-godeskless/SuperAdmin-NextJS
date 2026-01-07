import { redirect } from 'next/navigation';

export default async function Core() {
  // Redirect to overview since auth is removed
  redirect('/core/overview');
}
