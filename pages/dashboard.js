import Head from 'next/head'
import { Flex, Code, Heading, Icon, Text, Button } from '@chakra-ui/core';
import useSwr from 'swr';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import Fetcher from '@/utils/fetcher';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSwr(user ? ['/api/sites', user.token] : null, Fetcher);

  return (
    <DashboardShell>
      {!data ? <SiteTableSkeleton /> : (data.sites ? <SiteTable sites={data.sites} />: <EmptyState />)}
    </DashboardShell>
  );
  
}
