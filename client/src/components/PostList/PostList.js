import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../utils/queries';
import Post from '../Post';
import { 
  Center,
  CircularProgress } from '@chakra-ui/react'

export default function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const posts = data?.posts || [];
  console.log(posts)

  if(loading){
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }

  return (
    <>
      {posts.map(({
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
      }) => {
        return <Post 
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
      })}
    </>
  )
}

