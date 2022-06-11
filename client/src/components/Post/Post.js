import React, { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  HStack,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Center,
  IconButton
} from '@chakra-ui/react';
import { FaThumbsUp } from 'react-icons/fa';
import { UPDATE_LIKES } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

export default function Post({
  postId,
  postAuthor, 
  message,
  likes,
  exercises,
  meals,
  tags,
  comments,
  createdAt,
  image,
  usersLiked
}) {
  const hasBeenLiked = usersLiked.find(
    user => {
      console.log(user.id, Auth.getProfile().data._id);
      return user.id === Auth.getProfile().data._id
  }) ? true : false; 
  const [liked, setLiked] = useState(hasBeenLiked);
  const [postLikes, setPostLikes] = useState(likes);
  const [updateLikes, { error }] = useMutation(UPDATE_LIKES);

  const handleLike = async (event) => {
    event.preventDefault();

    try {
      setLiked(prev=>!prev);
      const post = await updateLikes({
        variables: { postId: postId }
      });

      setPostLikes(post.data.updateLikes.likes)
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
        overflow={'hidden'}>

        {image &&
          <Box
            h={'210px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
              <Image
                src={image}
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
            Post
          </Text>
          {/* <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Boost your conversion rate
          </Heading> */}
          <Text color={'gray.500'}>
            {message}

          </Text>
        </Stack>
        <Stack direction={'row'} mt={6} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
              alt={'Author'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{postAuthor}</Text>
              <Text color={'gray.500'}>{createdAt}</Text>
              <HStack>
                {tags?.map((tag,index) =><Text key={index} color={'blue'}>{tag}</Text>)}
              </HStack>
            </Stack>
          </Stack>
          <Stack>
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
          <Center>
            <Text fontWeight={600}>{postLikes}</Text>
          </Center>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
};
