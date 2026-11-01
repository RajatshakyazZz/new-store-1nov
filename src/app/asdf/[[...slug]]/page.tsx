import type { Metadata } from 'next';
import AdminClientView from './AdminClientView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    absolute: 'DigiHaven Command Center | Admin Portal',
  },
  description: 'DigiHaven Store Management & Command Center',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClientView />;
}
