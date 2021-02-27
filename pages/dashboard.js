import Head from 'next/head'
import { Flex, Code, Heading, Icon, Text, Button } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';

export default function Dashboard() {
  const auth = useAuth();
  
  return (!auth.user ? 'Loading...': <EmptyState />);
  
}
