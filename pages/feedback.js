import useSwr from 'swr';

import { useAuth } from '@/lib/auth';
import Fetcher from '@/utils/fetcher';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';


export default function MyFeedback() {
  const { user } = useAuth();
  const { data } = useSwr(user ? ['/api/feedback', user.token] : null, Fetcher);

  // experimenting with different coding styles as to which looks aesthetically pleasing, lol!
  // if (!data) {
  //   return (
  //     <DashboardShell>
  //       <FeedbackTableHeader />
  //       <FeedbackTableSkeleton />
  //     </DashboardShell>
  //   );
  // }

  // return (
  //   <DashboardShell>
  //     <FeedbackTableHeader />
  //     {data.feedback.length ? (
  //       <FeedbackTable feedback={data.feedback} />
  //     ) : (
  //       <EmptyState />
  //     )}
  //   </DashboardShell>
  // );

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      <FeedbackTableSkeleton />
      {/* {!data ? <FeedbackTableSkeleton /> : (data.feedback.length ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />)} */}
      {/* {!data ?
        <FeedbackTableSkeleton /> : (
          data.feedback.length
            ? <FeedbackTable allFeedback={data.feedback} />
            : <EmptyState />
        )} */}
      {/* below's the winner snippet anyway! */}
      {!data && <FeedbackTableSkeleton />}
      {data.feedback.length
        ? <FeedbackTable allFeedback={data.feedback} />
        : <EmptyState />}
    </DashboardShell>
  );
  
}
