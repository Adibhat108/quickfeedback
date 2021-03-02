import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/core';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';

// https://nextjs.org/docs/basic-features/data-fetching
// getStaticProps and getStaticPaths[nextjs 9.3] helps us generate static sites based on dynamic content
// what does that mean?
// having complex data requirements in firebase and output shipped to the users in form of a static page content to be served, based on the data. 
// below is how they are really great, and help in giving an amazing developer experience:
// a good thing about this is, static sites thus generated are highy performant and allow lot of benefits like putting on a CDN, and having that will be instantaneous users, lesser down time, lesser opportunity for database vulnerability while shipping static sites.

export async function getStaticProps(context) {
  const { siteId } = context.params;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: { 
      siteId: site.id.toString()
    }
  }));
  return {
    paths,
    fallback: false// See the "fallback" section below
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  // https://nextjs.org/docs/routing/dynamic-routes
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputEl} type="comment" id="comment" />
          <Button mt={2} type="submit" fontWeight="medium"> Add Comment</Button>
        </FormControl>
      </Box>

      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
}

export default SiteFeedback;
