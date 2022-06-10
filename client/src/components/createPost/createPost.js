import React, {useState} from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Center,
  Input,
  ListItem,
  IconButton,
  CircularProgress,
  List,
  UnorderedList,
  Text,
  Divider,
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  AccordionIcon,

} from "@chakra-ui/react";
// import { Formik, useFormik } from 'formik';
import { searchFood } from '../../utils/API';
import { FaPlus, FaCheck } from 'react-icons/fa';



export default function Component() {


    //Rendered States
    const [exercise, setExercise] = useState(false);
    const [cardio, setCardio] = useState(false);
    const [meal, setMeal] = useState(false);


const renderExercise = () => {
  if (exercise) {
    return(
        <Box as={'form'} mt={0}>
            <Stack spacing={4}>
              <Input
                placeholder="Lift(Bench,Pullups,etc.)"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Weight"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Reps"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bg="darkgreen"
              color={'white'}
              _hover={{
                bg: 'lightgreen',
                boxShadow: 'xl',
              }}>
              Add Another Lift
            </Button>
        </Box>
    )
  }
  else{
     
  }
}
const handleExercise = () => {
    if(exercise===false){
        setExercise(true);
        renderExercise()
    }
    else{
        setExercise(false)
        renderExercise()
    }
}

const renderCardio = () => {
  if (cardio) {
    return (
        <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Workout(Running,Swimming,etc.)"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Distance"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Time"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bg="darkgreen"
              color={'white'}
              _hover={{
                bg: 'lightgreen',
                boxShadow: 'xl',
              }}>
              Add Another Cardio
            </Button>
          </Box>
    )
  }
  else{
     
  }
}
const handleCardio = () => {
    if(cardio===false){
        setCardio(true);
        renderCardio()
    }
    else{
        setCardio(false)
        renderCardio()
    }
}
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
  if (meal) {
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
                <Button 
                  bg={'darkgreen'} 
                  color={'white'} 
                  my={6} 
                  onClick = {() =>searchNutrition(search) && console.log(search)}
                  _hover={{
                    bg: 'lightgreen',
                    boxShadow: 'xl'
                  }}>
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
    
  }
  else{
     console.log('Search Food')
  }
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

//Rendered onto timeline page
  return (
    <Box bg={useColorModeValue("gray.50", "inherit")} p={10} alignItems="center">
      <Box  alignItems="center">
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 4 }}
          spacing={{ md: 4 }}
          mt={0}
          align="center"
        >
            <Center>
            </Center>

          <GridItem mt={[0, null, 0]} colSpan={4}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
              alignItems="center"
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue("white", "gray.700")}
                spacing={4}
                p={2}
                align='stretch'
              >
                <Accordion allowMultiple allowToggle>
                  <AccordionItem>
             
                      <h2>
                        <AccordionButton>
                          <FormControl id="createpost" mt={1}>
                            <FormLabel
                              fontSize="sm"
                              fontWeight="md"
                              color={useColorModeValue("gray.700", "gray.50")}
                            >
                              Write a Post!
                            </FormLabel>
                            <Textarea
                              placeholder="Big Lift Today! New PR 225 Bench "
                              mt={1}
                              rows={3}
                              shadow="sm"
                              focusBorderColor="brand.400"
                              fontSize={{ sm: "sm" }}
                            />
                          </FormControl>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                  

                        <FormControl>
                          <Flex alignItems="center" mt={1}>
                
                            <Button
                              type="button"
                              ml={5}
                              variant="outline"
                              size="sm"
                              fontWeight="medium"
                              _focus={{ shadow: "none" }}
                            >
                            Add Image
                            </Button>
                            <Button
                              type="button"
                              ml={5}
                              variant="outline"
                              size="sm"
                              fontWeight="medium"
                              _focus={{ shadow: "none" }}
                              colorScheme = "blue"
                              onClick={  () => handleExercise() } 
                            >
                            Add Exercise
                            </Button>
                            <Button
                              type="button"
                              ml={5}
                              variant="outline"
                              size="sm"
                              fontWeight="medium"
                              _focus={{ shadow: "none" }}
                              colorScheme = "blue"
                              onClick = { () => handleCardio() }
                            >
                            Add Cardio
                            </Button>
                            <Button
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
                            </Button>
                          </Flex>
                        </FormControl>
                      </AccordionPanel>
                  </AccordionItem>
                </Accordion>  
                {renderExercise()}
                {renderCardio()}
                {renderMeal()}
              </Stack>
              <FormControl>
                  <Center>
              <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      verticalAlign = "center"
                      top = "25"
                    >
                    Post
                    </Button>
                    </Center>
              </FormControl>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          ></Box>
        </Box>
      </Box>

      </Box>
  );
}