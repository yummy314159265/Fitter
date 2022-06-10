import React from 'react';
import PostList from '../../components/PostList';
import CreatePost from '../../components/createPost';

export default function postsPages() {
 return(
 <>
  <CreatePost />
  <PostList />
 </>
)}