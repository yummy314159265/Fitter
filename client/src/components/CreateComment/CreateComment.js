import React from 'react';
import { 
  Textarea,
  Center,
  Button,
  Box,
  List,
  ListItem,
  CircularProgress,
  VStack,
  HStack,
  Stack,
  IconButton
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

export default function CreateComment({ postId, commentAuthor }){
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const hashtagRegExp = /#[a-z0-9_]+/g;
  
  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (async ({message}) => {
      const tags = message.match(hashtagRegExp);
      const newComment = await addComment({
        variables: { input: { postId, commentDetails: { commentAuthor, message, tags}}}
      })
      console.log(newComment)
    })
  })

  return (
    <Center>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <VStack>
            <Textarea 
              id='message'
              name='message'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.message}
              resize={'none'}
            />
            <Button justifyContent={'end'} type='submit'>
              Post Comment
            </Button>
        </VStack>
          </form>
      </Box>  
    </Center>
  )
}