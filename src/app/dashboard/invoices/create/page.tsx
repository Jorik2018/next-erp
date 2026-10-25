import Form from '@/lib/ui/invoices/create-form';
import Breadcrumbs from '@/lib/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/lib/data';
 
export const dynamic = 'force-dynamic';

export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}