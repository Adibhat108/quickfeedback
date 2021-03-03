import Head from 'next/head'
import { Flex, Code, Heading, Icon, Text, Button } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
      <script dangerouslySetInnerHTML={{
        __html: `if (document.cookie && document.cookie.includes('quick-feedback-auth')) {
            window.location.href = "/dashboard"
          }`
      }}
      />
        <title>Quick Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Icon name="logo" color="black" size="64px" />
      {auth.user ? (
        <Button
          onClick={(e) => auth.signout()}
          size="sm"
          mt={4}
        >
          Sign Out
        </Button>
      ): (
        <Button onClick={(e) => auth.signinWithGithub()} size="sm" mt={4}>Sign In</Button>
      )}
    </Flex>
  )
}
