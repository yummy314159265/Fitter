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
import { FaPlus, FaCheck } from 'react-icons/fa';

const SearchResult = ({ food, index }) => {
  const [added, setAdded] = useState(false)

  const addResult = (result) => {
    console.log(result)
    setAdded(prev => !prev)
  }

  return (
    <ListItem key={index}>
      <IconButton
        size='xs'
        mr={2}
        icon={added ? <FaCheck /> : <FaPlus />}
        colorScheme={added ? 'green' : 'gray'}
        onClick={()=>addResult(food)}
      />
      {food.food_name}
    </ListItem>
  )
}

export default function FoodSearch(){
  const [results, setResults] = useState(null)
  const [data, setData] = useState(null)

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: (async (values) => {
      setResults('loading');
      const response = await searchFood(values.query);
      setData(await response.json())
      setResults('done');
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
          {(results === 'loading') ? (
            <CircularProgress isIndeterminate />
          ) : (results === 'done') ? (
            <List textAlign={'left'} spacing={3}>
              {data.foods.map((food, index) => <SearchResult food={food} index={index} />)}
            </List> 
          ) : (
            null
          )}
        </Box>
      </Center>
    </>
  )  
}