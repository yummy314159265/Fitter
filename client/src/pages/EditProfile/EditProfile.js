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
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberDecrementStepper,    
    Radio,
    HStack,
    InputGroup,
    InputRightElement,
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
  import { useState } from 'react';
  import { useFormik, Field } from 'formik';
  import { 
    BsFillPersonLinesFill,
    BsTools,
    BsFillPlusCircleFill,
   } from "react-icons/bs";

   import { useQuery } from '@apollo/client';

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
  
  export default function EditProfile() {
    const {data}= useQuery(QUERY_ME);
    const user = data?.me || {};     
    console.log(user)
       // create form variables
   const formik = useFormik({
    initialValues: {
      username: user.username ? user.username: "",
      email: user.email ? user.email: "",
      privateProfile: user.private? user.private: "",
      weight: user.weight? user.weight: "",
      height: user.height? user.height: "",
      age: user.age? user.age: "",
      gender: user.gender? user.gender: ""
    }, 
    enableReinitialize: true,  
    onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      } 
  });
    
    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={64}>
      <Heading>Edit Profile</Heading>
      <form onSubmit={(e)=>{ 
              e.preventDefault(); 
              formik.handleSubmit(e);
            }}>
      <FormControl isRequired>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input 
                  id='username'
                  name='username'
                  type='text'
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </FormControl>     
              <FormControl isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                  id='email' 
                  name='email'
                  type='email' 
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='weight'>Weight</FormLabel>
                <NumberInput id='weight' name='weight' 
                value={formik.values.weight}
                onChange={formik.handleChange} max={500} min={30}>
                <NumberInputField/>
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput> 
              </FormControl>  
              <FormControl>
                <FormLabel htmlFor='height'>Height</FormLabel>
                <NumberInput id='height' name='height' 
                value={formik.values.height}
                onChange={formik.handleChange} max={100} min={30}>
                <NumberInputField/>
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput> 
              </FormControl>  
              <FormControl>
                <FormLabel htmlFor='age'>Age</FormLabel>
                <NumberInput id='age' name='age' 
                value={formik.values.age}
                onChange={formik.handleChange} max={100} min={10}>
                <NumberInputField/>
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>                
              </FormControl> 
              <FormControl as='fieldset'>
                <div id="gender-radio-group">Gender</div>
                <div role="group" aria-labelledby='gender-radio-group'>
                  <label>
                    <Field type="radio" name="gender" value="Male">Male</Field>

                  </label>
                </div>
                <FormLabel as='legend'>Gender</FormLabel>
                <RadioGroup defaultValue={formik.values.gender}>
                    <HStack spacing='24px'>
                    <Radio name ='gender' onChange={formik.handleChange} value='Male'>Male</Radio>
                    <Radio name ='gender' onChange={formik.handleChange} value='Female'>Female</Radio>                    
                    </HStack>
                </RadioGroup>                
                </FormControl> 
                <FormControl as='fieldset'>
                <FormLabel as='legend'>Private Profile?</FormLabel>
                <RadioGroup defaultValue={formik.values.privateProfile}>
                    <HStack spacing='24px'>
                    <Radio value='true'>Yes</Radio>
                    <Radio value='false'>No</Radio>                    
                    </HStack>
                </RadioGroup>                
                </FormControl>  
                <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  loadingText="Submitting"
                  size="lg"
                  bg={'green'}
                  color={'white'}
                  _hover={{
                    bg: 'darkgreen',
                  }}>
                  Submit
                </Button>
                </Stack>
        </form> </Box>
    </Flex>
    );
  }