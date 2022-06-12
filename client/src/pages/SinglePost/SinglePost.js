import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
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
  CircularProgress
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import { GET_POST } from '../../utils/queries';
import Auth from '../../utils/auth';
import Post from '../../components/Post';
import CreateComment from '../../components/CreateComment';
import Comment from '../../components/Comment';

export default function SinglePost() {

  const { postId } = useParams();
  let username = null;

  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.username
  }

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  })

  const { 
    id,
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
  } = data?.post || {}

  if(loading){
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  } 

  console.log(data)

  return (
    <VStack mb={3}>
      <Post 
        key={id}
        postId={id}
        postAuthor={postAuthor}
        message={message}  
        likes={likes}
        exercises={exercises}
        meals={meals}
        tags={tags}
        comments={comments}
        createdAt={createdAt}
        image={image}
        usersLiked={usersLiked}
      />
      {username && <CreateComment postId={postId} commentAuthor={username} />}
      {comments.map(comment => {
        return (
          <Comment key={comment.commentId} comment={comment} postId={postId} />
        )
      })}
    </VStack>
  )
};
