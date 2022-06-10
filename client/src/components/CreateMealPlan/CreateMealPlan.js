import React, {useState} from "react";
import {
  chakra,
  Box,
  Container,
  Heading,
  StackDivider,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  ButtonGroup,
  Link,
  Center,
  Input,
  ListItem,
  IconButton,
  CircularProgress,
  List,
  UnorderedList,
  Text,
  Divider,
} from "@chakra-ui/react";

import { 
    BsFillPersonLinesFill,
    BsTools,
    BsFillPlusCircleFill,
   } from "react-icons/bs";

import { Link as RouterLink } from 'react-router-dom';

// import { Formik, useFormik } from 'formik';
import { searchFood } from '../../utils/API';
import { FaPlus, FaCheck } from 'react-icons/fa';

export default function Component() {


//     const [cart, setCart] = useState([]);

//     function addItemToCart(e) {
//       const item = e.target.value;
//       console.log(item);
//       setCart([...cart, item]);
//     }
  
//     return (
//       <div className="app">
//         <div className="items">
//           <button value="MacBook Pro" onClick={addItemToCart}> MacBook Pro</button>
//           <button value="iPhone XS" onClick={addItemToCart}>iPhone XS</button>
//           <button value="Gem" onClick={addItemToCart}> Gem</button>
//           <button value="Teddy Bear" onClick={addItemToCart}> Teddy Bear</button>
//         </div>
//         <div className="cart">
//           Cart
//           <ul>
//             {cart.map(item => <li key={item}>{item}</li>)}
//           </ul>
//         </div>
//       </div>
//     );
//   }


const [meal, setMeal] = useState(false);

const [results, setResults] = useState(null)
const [data, setData] = useState(null)
const [search, setSearch] = useState('');
const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === 'query' ) {
    setSearch(value);
  }
};


  const searchNutrition =(async (values) => {
    // event.preventDefault();
    // if(values==null)
    // {
    //   return;
    // }
    setResults('loading');
    const response = await searchFood(values);
    setData(await response.json())
    setResults('done');
  })

  //Formik Nutritioniix functions
  const SearchResult = ({ food, index }) => {
    const [added, setAdded] = useState(false) 
  const addResult = (result) => {
      console.log(result)
      setAdded(prev => !prev)
    }
    return (
   
      <Box>
    

      <ListItem key={index}
      >
        <IconButton
          size='xs'
          mr={2}
          icon={added ? <FaCheck /> : <FaPlus />}
          color={added ? 'darkgreen' : 'gray'}
          bg={added ? 'green' : 'white'}
          onClick={()=>addResult(food)}
        />
        {food.food_name}

      </ListItem>

      </Box>
    )
  }
const renderMeal = () => {
//   if (meal) {
   return (
        <>
          <Center py={6}>
          <Stack spacing={4}>
            <Box>
                <Input 
                  id='query'
                  name='query'
                  type='query'
                  value= {search}
                  onChange={handleChange}
                />
                <Button my={6} onClick = {() =>searchNutrition(search) && console.log(search)}>
                  Search Food
                </Button>
                </Box>         

              {(results === 'loading') ? (
                <CircularProgress isIndeterminate />
              ) : (results === 'done') ? (
                <List textAlign={'left'} spacing={3}>
                  {data.foods.map((food, index) => <SearchResult food={food} index={index} />)}
                </List> 
              ) : (
                null
              )}
           </Stack>
          </Center>     
        </>
      )  
    
//   }

//   else{
//      console.log('Search Food')
//   }
}
const handleMeal = () => {
    if(meal===false){
        setMeal(true);
        renderMeal()
    }
    else{
        setMeal(false)
        renderMeal()
    }
}
return (
    <Box display="flex">
      <Container maxW={'5xl'} py={12}>        
        <Box borderWidth='2px' borderRadius='lg' mb='5' overflow='hidden'>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} py={12}>
          <Stack spacing={4}  align="center">
          <Stack>
        <Center>
            <Text>Search for food to add to your meal plan!</Text>
        </Center>

        {/* <Button
            type="button"
            ml={5}
            variant="outline"
            size="sm"
            fontWeight="medium"
            _focus={{ shadow: "none" }}
            colorScheme = "blue"
            onClick = { () => handleMeal() }
            >
            Add Meal
            </Button> */}
        {renderMeal()}
    </Stack>
            <Heading>text's Profile</Heading>
            <UnorderedList color={'gray.500'} fontSize={'lg'}>
              <ListItem>text</ListItem>  
              <ListItem>text years old</ListItem>
              <ListItem>text pounds</ListItem>
              <ListItem>text inches</ListItem>       
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
                Edit Profile
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