import React, { useState } from 'react';
import { 
  Input,
  Center,
  Button,
  Box,
  List,
  ListItem,
  CircularProgress,
  IconButton
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { searchFood } from '../../utils/API';
import { FaPlus } from 'react-icons/fa';

export default function FoodSearch(){

  const [results, setResults] = useState('')

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: (async (values) => {
      setResults(
        <CircularProgress isIndeterminate />
      );

      const response = await searchFood(values.query);
      const data = await response.json();

      setResults(
        <List textAlign={'left'} spacing={3}>
          {
            data.foods.map((food, index) =>{
              return (
                <ListItem key={index}>
                  <IconButton
                    size='xs'
                    mr={2}
                    icon={<FaPlus />}
                    onClick={()=>console.log(food)}
                  />
                  {food.food_name}
                </ListItem>
              )
            })
          }
        </List> 
      );
    })
  });

  return (
    <>
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <form onSubmit={formik.handleSubmit}>
            <Input 
              id='query'
              name='query'
              type='query'
              onChange={formik.handleChange}
              value={formik.values.query}
            />
            <Button my={6} type='submit'>
              Search Food
            </Button>
          </form>
          {results}
        </Box>
      </Center>
    </>
  )  
}