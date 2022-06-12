import React, { useState, useEffect } from 'react'
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
} from '@chakra-ui/react';
import { FaThumbsUp, FaDumbbell, FaRunning, FaLeaf } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';
import { UPDATE_LIKES } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
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

  // likes
  const hasBeenLiked = usersLiked.find(user => user.id === Auth.getProfile().data._id) ? true : false; 
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

  console.log(meals)

  return (
    <Center 
      py={2}
      m={2}>
      <Box
        maxW={'95%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        align={'stretch'}>

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
        <Stack direction={'row'} justifyContent={'space-around'}>
          <List spacing={3}>
            <Text>
              Exercises
            </Text>
            {exercises.map(exercise => {
              return (
                <ListItem key={exercise.id}>
                  <ListIcon as={(exercise.type[0]==='Cardio') ? FaRunning : FaDumbbell} color='green' /> 
                  <Text display='inline'>{exercise.name}</Text>
                  <List>
                    {exercise.time && <ListItem fontSize='small'>Time: {exercise.time} min</ListItem>}
                    {exercise.distance && <ListItem fontSize='small'>Distance: {exercise.distance} km</ListItem>}
                    {exercise.liftingWeight && <ListItem fontSize='small'>Lift weight: {exercise.liftingWeight}</ListItem>}
                    {exercise.sets && <ListItem fontSize='small'>Sets: {exercise.sets}</ListItem>}
                    {exercise.reps && <ListItem fontSize='small'>Reps: {exercise.reps}</ListItem>}
                    {exercise.calories && <ListItem fontSize='small'>Calories burnt: {exercise.calories}</ListItem>}
                  </List>
                </ListItem>
              )
            })}
          </List>
          <List spacing={3}>
            <Text>
              Meals
            </Text>
            {meals.map(meal => {
              return (
                <ListItem key={meal.id}>
                  <ListIcon as={meal.type[0] === 'Vegan'|| meal.type[0] === 'Vegetarian' ? FaLeaf : GiMeat} color='green' /> 
                  <Text display='inline'>{meal.name}</Text>
                  <List>
                    <ListItem fontSize='small'>{meal.calories} calories</ListItem>
                    <ListItem fontSize='small'>{meal.carbs} carbs</ListItem>
                    <ListItem fontSize='small'>{meal.proteins} proteins</ListItem>
                    <ListItem fontSize='small'>{meal.fats} fats</ListItem>
                  </List>
                </ListItem>
              )
            })}
          </List>
        </Stack>
      </Box>
    </Center>
  )
};
