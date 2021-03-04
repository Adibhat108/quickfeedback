import Head from 'next/head'
import { Box, Flex, Code, Heading, Icon, Text, Button, Link, Stack } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Box bg="gray.100">
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="400px"
        margin="0 auto"
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

        <Icon color="black" name="logo" size="42px" mb={2} />
        <Text mb={4} fontSize="lg" p={6}>
          <Text as="span" fontWeight="bold" display="inline">
            Quick Feedback
          </Text>
          {' is being built as part of '}
          <Link
            href="https://github.com/adibhat108/quickfeedback"
            isExternal
            textDecoration="underline"
          >
            Jinga Lala
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
        </Text>

        {auth.user ? (
          <Button
            size="lg"
            mt={4}
            onClick={(e) => auth.signout()}
            backgroundColor="white"
            color="grey.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Stack>
            <Button
              leftIcon="github"
              size="lg"
              mt={4}
              onClick={(e) => auth.signinWithGithub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              Sign in with GitHub
            </Button>
            <Button
              leftIcon="google"
              size="lg"
              mt={4}
              onClick={(e) => auth.signinWithGoogle()}
              backgroundColor="white"
              color="grey.900"
              variant="outline"
              fontWeight="medium"
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)'
              }}
            >
              Sign in with Google
            </Button>
          </Stack>        
        )}
      </Flex>
    </Box>
  )
}
