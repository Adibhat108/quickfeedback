import useSwr from 'swr';

import { useAuth } from '@/lib/auth';
import Fetcher from '@/utils/fetcher';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSwr(user ? ['/api/sites', user.token] : null, Fetcher);

  return (
    <DashboardShell>
      <SiteTableHeader />
      {!data ? <SiteTableSkeleton /> : (data.sites.length ? <SiteTable sites={data.sites} />: <EmptyState />)}
    </DashboardShell>
  );
  
}
