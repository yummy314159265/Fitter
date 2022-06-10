import React from 'react';
import PostList from '../../components/PostList';
import CreatePost from '../../components/createPost';
import Sidebar from '../../components/Sidebar';

import {
    Grid,
    GridItem,
} from '@chakra-ui/react';

export default function postsPages() {
 return(
 <>
    <Grid 
        gap={4}
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        bg="lightgrey">
        <GridItem rowSpan={2} colSpan={1}>
            <Sidebar />
        </GridItem>

        <GridItem colSpan={4}>
            <CreatePost />
        </GridItem>

        <GridItem colSpan={4}>
            <PostList />
        </GridItem>
    </Grid>
 </>
)}