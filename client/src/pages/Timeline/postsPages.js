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
        gap={1}
        templateRows='repeat(2, auto 1fr)'
        templateColumns='repeat(5, 1fr)'
        bg="lightgrey"
        >
        <GridItem rowSpan={2} colSpan={1}>
            <Sidebar />
        </GridItem>

        <GridItem row span={1} colSpan={4} >
            <CreatePost />
        </GridItem>

        <GridItem row span={1} colSpan={4}>
            <PostList />
        </GridItem>
    </Grid>
 </>
)}