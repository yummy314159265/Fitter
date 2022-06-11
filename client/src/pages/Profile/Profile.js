// profile page shows ...
// Name
// Goals
// Plans
// Posts?
import React from 'react';
import {
    Container,
    Box,
    SimpleGrid,
    Flex,
    Heading,
    Text,
    Button,
    ButtonGroup,
    Stack,
    StackDivider,
    Center,
    useColorModeValue,
    Avatar,
    ListItem,
    UnorderedList,
    List,
    Link,
    CircularProgress
  } from '@chakra-ui/react';

  import { 
    BsFillPersonLinesFill,
    BsTools,
    BsFillPlusCircleFill,
   } from "react-icons/bs";

   import { useQuery } from '@apollo/client';
   import { Link as RouterLink } from 'react-router-dom';

   import theme from '../../Theme';
   import Auth from '../../utils/auth';
   import { QUERY_ME } from '../../utils/queries';

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

  
  export default function Profile() {

    // ISSUES
    // stores data in localstorage but only after loading the page
    // On page load, no data is there to use
    // This throws an error if I uncomment line 135 and try running it
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};

    // console.log(user)

    // MOVE USECOLORMODEVALUE TO VARIABLES SET BEFORE IF STATEMENT

    // if(loading){
    //   return (
    //     <Center>
    //       <CircularProgress h={'100vh'} isIndeterminate />
    //     </Center>
    //   )
    // }

    // const reversedKeys = Object.keys(user.mealPlan).reverse();
    // reversedKeys.forEach(key => {
    //   console.log(key, user.mealPlan[key]);
    // });
    // const targetWeight = user.goals[0].goalWeight;
    // console.log(targetWeight);

    return (
      <Box display="flex">
      <Container maxW={'5xl'} py={12}>
        <Box borderWidth='2px' borderRadius='lg' mb='5' overflow='hidden'>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} py={12}>
          <Stack spacing={4}  align="center">
          <Center>
            <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
          </Center>
            <Heading>{user.username}'s Profile</Heading>
            <UnorderedList color={'gray.500'} fontSize={'lg'}>
              <ListItem>{user.gender}</ListItem>  
              <ListItem>{user.age} years old</ListItem>
              <ListItem>{user.weight} pounds</ListItem>
              <ListItem>{user.height} inches</ListItem>       
            </UnorderedList>
            <Button
                leftIcon={<BsFillPersonLinesFill />}
                px={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
                >

                <a href="profile/edit">Edit Profile</a>

            </Button>
            </Stack>
            <Center>
            <Stack
              spacing={4}
              align="left"
              mt="5"
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>

              <Feature
                iconBg={useColorModeValue(theme.colors.grey, 'yellow.900')}
                text={`Your current goal`}

                // add goal
              />
              <UnorderedList>
                
                {/* <ListItem>Target weight : {user.goals[0].goalWeight}</ListItem> */}
                <ListItem>goal 2</ListItem>
              </UnorderedList>
              <Feature
                iconBg={useColorModeValue(theme.colors.lightgreen, 'teal.900')}                

                text={`Your current exercise plan`}

                // add exercise plan
              />
              <UnorderedList>
                <ListItem>goal 1</ListItem>
                <ListItem>goal 2</ListItem>
              </UnorderedList>
              <Feature
                iconBg={useColorModeValue(theme.colors.lightblue, 'purple.900')}

                text={`Your current meal plan`}

                // add meal plan
              />
              <UnorderedList>
                <ListItem>goal 1</ListItem>
                <ListItem>goal 2</ListItem>
              </UnorderedList>
              <Feature
                iconBg={useColorModeValue(theme.colors.darkgreen, 'red.900')}

                text={`Your most recent post`}

                // add post
              />
              <UnorderedList>
                <ListItem>goal 1</ListItem>
                <ListItem>goal 2</ListItem>
              </UnorderedList>
              <Link as={RouterLink} to='/posts'>
                <Button
                    leftIcon={<BsFillPlusCircleFill />}              
                    px={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    >
                    Create Post
                </Button>
              </Link>
            </Stack>
            </Center>
        </SimpleGrid>
        </Box>
          <Box align="center">
            <ButtonGroup variant='outline' spacing='6'>
            <Link as={RouterLink} to='/meal-plan'>
              <Button
                  leftIcon={<BsFillPlusCircleFill />}
                  px={5}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                  }}
                  // onClick={console.log("poke")}
                  >
                  Create Meal Plan
              </Button>
            </Link>
              <Button
                  leftIcon={<BsFillPlusCircleFill />}
                  px={8}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                  }}
                  // onClick={console.log("poke")}
                  >
                  Create Exercise Plan
                  
              </Button>
              <Button
                  leftIcon={<BsTools />}              
                  px={8}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                  }}
                  // onClick={console.log("poke")}
                  >
                  Edit Goal
              </Button>
            </ButtonGroup>
          </Box>       
      </Container>
    </Box>
    );
  }