import { mutate } from 'swr';
import React, { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from '@chakra-ui/core';

import { deleteFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const DeleteFeedbackButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);
  const onDeleteFeedback = () => {
    deleteFeedback(feedbackId);
    // mutate(['/api/feedback', auth.user.token], async (data) => ({
    //   feedback: data.feedback.filter((fb) => fb.id !== feedbackId)
    // }), false);

    mutate(['/api/feedback', auth.user.token], async (data) => {
      return { feedback: data.feedback.filter((fb) => fb.id !== feedbackId) };
    }, false);
    onClose();
  };

  return (
    <>
      <IconButton 
        aria-label="Delete feedback" 
        icon="delete" 
        variant="ghost" 
        onClick={() => setIsOpen(true)} 
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onDeleteFeedback} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;
