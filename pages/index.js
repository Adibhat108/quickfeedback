import Head from 'next/head'
import { Button, Code, Heading, Text } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Quick Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>
          Quick Feedback
        </Heading>

        <Text> current user: <Code>{auth?.user?.email}</Code></Text>
        {auth.user ? (
          <Button onClick={(e) => auth.signout()}>Sign Out</Button>
        ): (
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
      </main>

    </div>
  )
}
