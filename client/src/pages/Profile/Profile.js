// profile page shows ...
// Name
// Goals
// Plans
// Posts?

import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';
import { Button, ButtonProps} from '@chakra-ui/react';
import { useState } from 'react';
import { ReactElement } from 'react';


  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  
  export default function SplitWithImage() {
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            {/* <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              Welcome Back USERNAME HERE!
            </Text> */}



            <Heading>USERNAME'S Profile</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
              ALL USER DATA:
              WEIGHT
              HEIGHT
              AGE
              GENDER
              GOALS
              EXERCISE PLAN
              MEAL PLAN
            </Text>
                <Button
                    px={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={console.log("poke")}>
                    Create Post
                </Button>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Feature
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Your current goal : '}
                // add goal
              />
              <Feature
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Your current exercise plan : '}
                // add goal
              />
              <Feature
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Your current meal plan : '}
                // add meal plan
              />
              <Feature
                iconBg={useColorModeValue('red.100', 'red.900')}
                text={'Your most recent post : '}
                // add post
              />
            </Stack>

          </Stack>
          <Flex>
            <Image
            // maybe some kind of chart? track weight over time or something? or maybe track cheat days/days you did the work?
              rounded={'md'}
              alt={'feature image'}
              src={
                'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
        <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
                <Button
                    px={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={console.log("poke")}>
                    Edit Profile
                </Button>
                <Button
                    px={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={console.log("poke")}>
                    Create Meal Plan
                </Button>
                <Button
                    px={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={console.log("poke")}>
                    Create Exercise Plan
                </Button>
                <Button
                    px={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={console.log("poke")}>
                    Edit Goal
                </Button>
            </Stack>
      </Container>
    );
  }