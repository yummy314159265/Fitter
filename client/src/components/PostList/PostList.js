import React from 'react';
import Post from '../Post';


export default function PostList({ posts }) {
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

