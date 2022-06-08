// profile page shows ...
// Name
// Goals
// Plans
// Posts?

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
  } from '@chakra-ui/react';

  import { 
    BsFillPersonLinesFill,
    BsTools,
    BsFillPlusCircleFill,
   } from "react-icons/bs";

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
      <Box display="flex">
      <Container maxW={'5xl'} py={12}>        
        <Box borderWidth='2px' borderRadius='lg' mb='5' overflow='hidden'>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} py={12}>
          <Stack spacing={4}  align="center">
          <Center>
            <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
          </Center>
            <Heading>USERNAME'S Profile</Heading>
            <UnorderedList color={'gray.500'} fontSize={'lg'}>
              <ListItem>WEIGHT</ListItem>
              <ListItem>HEIGHT</ListItem>
              <ListItem>AGE</ListItem>
              <ListItem>GENDER</ListItem>         
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
                onClick={console.log("poke")}>
                Edit Profile
            </Button>
            </Stack>
            <Center>
            <Stack
              spacing={4}
              align="center"
              mt="5"
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
                // add exercise plan
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
                  onClick={console.log("poke")}>
                  Create Post
              </Button>
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
                  onClick={console.log("poke")}>
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
                  onClick={console.log("poke")}>
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
                  onClick={console.log("poke")}>
                  Edit Goal
              </Button>
            </ButtonGroup>
          </Box>       
      </Container>
    </Box>
    );
  }