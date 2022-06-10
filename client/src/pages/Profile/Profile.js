// profile page shows ...
// Name
// Goals
// Plans
// Posts?
import React  from 'react';
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

    // const GetData = async () => {
    //   const response = await useQuery(QUERY_ME);
    //   console.log(response.data.me);
    //   return (response.data.me)
    // }

    // const user = GetData();
    const username = Auth.getProfile().data.username;
    const {loading, data}= useQuery(QUERY_ME);
    // if (loading) {
    //   console.log("loading");
    // }
    // console.log(data);
    const user = data?.me || {};
    console.log(user);
    console.log(user.age)
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
            <Heading>{username}'s Profile</Heading>
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
                // onClick={console.log("poke")}
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
                
                {/* <ListItem>Target weight : {targetWeight}</ListItem> */}
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
                    // onClick={console.log("poke")}
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