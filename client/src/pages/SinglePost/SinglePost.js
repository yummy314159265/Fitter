import React from 'react';
import {
  Grid,
  GridItem,
  Center,
  CircularProgress
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import { GET_POST } from '../../utils/queries';
import Auth from '../../utils/auth';
import Post from '../../components/Post';
import CreateComment from '../../components/CreateComment';
import Comment from '../../components/Comment';
import Sidebar from '../../components/Sidebar';

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
      <>
         <Grid 
             gap={1}
             templateRows='repeat(2, auto 1fr)'
             templateColumns='repeat(5, 1fr)'
             bg="lightgrey"
             >
             <GridItem rowSpan={2} colSpan={1}>
                 <Sidebar />
             </GridItem>
             
             <GridItem row span={1} colSpan={4}>

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
                {comments.slice().reverse().map(comment => {
                  return (
                    <Comment key={comment.commentId} comment={comment} postId={postId} />
                  )
                })}

             </GridItem>
         </Grid>
      </>


  )
};
