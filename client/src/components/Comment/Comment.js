import React, { useState } from 'react'
import {
  Box,
  HStack,
  VStack,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Center,
  IconButton,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_COMMENT_LIKES } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function Comment({comment, postId}) {
  const hasBeenLiked = comment.usersLiked.find(user => user.id === Auth.getProfile().data._id) ? true : false; 
  const [updateCommentLikes, { error }] = useMutation(UPDATE_COMMENT_LIKES);
  const [liked, setLiked] = useState(hasBeenLiked);
  const [commentLikes, setCommentLikes] = useState(comment.likes);
  
  const handleLike = async (event) => {
    event.preventDefault();

    try {
      setLiked(prev=>!prev);
      
      const updatedComment = await updateCommentLikes({
        variables: { postId: postId, commentId: comment.commentId }
      });

      console.log(updatedComment)
      setCommentLikes(updatedComment.data.updateCommentLikes.comments.find(com => com.commentId === comment.commentId).likes)
    } catch (e) {

      console.error(e);
    }
  }

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        {comment.image &&
          <Box
            h={'210px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
              <Image
                src={comment.image}
                layout={'fill'}
              />
          </Box>
        }
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Comment
          </Text>
          <Text color={'gray.500'}>
            {comment.message}
          </Text>
        </Stack>
        <Stack direction={'row'} mt={6} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
              alt={'Author'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{comment.commentAuthor}</Text>
              <Text color={'gray.500'}>{comment.createdAt}</Text>
              <HStack>
                {comment.tags?.map((tag,index) =><Text key={index} color={'blue'}>{tag}</Text>)}
              </HStack>
            </Stack>
          </Stack>
        </Stack>
        <VStack alignItems={'end'} mt={3}>
          <Center>
            <Text fontWeight={600} mx={2}>
              {commentLikes}
            </Text>
            <IconButton 
              justifySelf='end' 
              aria-label='Like' 
              color={liked ? 'green' : 'black'}
              icon={<FaThumbsUp />} 
              onClick={handleLike}
              isDisabled={Auth.loggedIn() ? false : true}
              _disabled={{
                cursor: 'default'
              }}
            />
          </Center>
        </VStack>
      </Box>
    </Center>
  )
}