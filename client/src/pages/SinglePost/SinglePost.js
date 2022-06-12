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
import { FaThumbsUp, FaDumbbell, FaRunning, FaLeaf, FaComment } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST } from '../../utils/queries';
import { UPDATE_LIKES } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function SinglePost() {

  const { postId } = useParams();

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  })

  const { 
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

  const [liked, setLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(likes);
  const [updateLikes, { error }] = useMutation(UPDATE_LIKES);
  const boxBg = useColorModeValue('white', 'gray.900')

  useEffect(() => {
    setLiked(usersLiked?.find(user => user.id === Auth.getProfile().data._id) ? true : false);
    setPostLikes(likes);
  }, [loading])

  if(loading){
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  } 

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
        bg={boxBg}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
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
        <VStack alignItems={'end'} mt={3}>
          <Center>
            <Text fontWeight={600} mx={2}>
              {postLikes}
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
            <Text fontWeight={600} mx={2}>
              {comments.length}
            </Text>
            <IconButton 
              justifySelf='end' 
              aria-label='Like' 
              color='black'
              icon={<FaComment />} 
              isDisabled={true}
              _disabled={{
                cursor: 'default'
              }}
            />
          </Center>
        </VStack>
      </Box>
    </Center>
  )
};
