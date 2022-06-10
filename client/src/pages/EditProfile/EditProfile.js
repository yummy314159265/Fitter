// profile page shows ...
// Name
// Goals
// Plans
// Posts?
import React, { useState }  from 'react';
import { useNavigate  } from 'react-router-dom';
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
    NumberInputStepper,
    NumberIncrementStepper,
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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react';
  import { useFormik, Field } from 'formik';
  import { 
    BsFillPersonLinesFill,
    BsTools,
    BsFillPlusCircleFill,
   } from "react-icons/bs";

   import { useQuery } from '@apollo/client';

   import theme from '../../Theme';
   import { useMutation } from '@apollo/client';
   import Auth from '../../utils/auth';
   import { UPDATE_USER } from '../../utils/mutations'
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
    // success to show message profile updated successfully.
    const [successmsg, setSuccessMsg] = useState('');
    let navigate = useNavigate();

    const [updateUser, { error }] = useMutation(UPDATE_USER);
    const {data}= useQuery(QUERY_ME);
    const user = data?.me || {};     
    console.log(user)
       // create form variables
   const formik = useFormik({
    initialValues: {
      username: user.username ? user.username: "",
      email: user.email ? user.email: "",
      privateProfile: user.private? "1": "0",
      weight: user.weight? user.weight: "",
      height: user.height? user.height: "",
      age: user.age? user.age: "",
      gender: user.gender? user.gender: "",
    }, 
    enableReinitialize: true,  
    onSubmit: async ({ username, email, privateProfile, weight, height, age, gender }) => {      
      try {
        // private        
        const { data } = await updateUser({          
          variables: { username, email, privateProfile, weight, height, age, gender },
        });     
        if (error) {
          throw new Error('something went wrong!');
        }
        else {
          //setSuccessMsg("Your profile has been updated successfully.");  
          navigate("../profile", { replace: true });
        }
        
      } catch (e) {
        console.error(e);
      }
    }
    // onSubmit: (values) => {
    //     alert(JSON.stringify(values, null, 2));
    //   } 
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
                <Input 
                  id='weight'
                  name='weight'
                  type='number'
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.weight}
                />
              </FormControl>  
              <FormControl>
                <FormLabel htmlFor='height'>Height</FormLabel>
                <Input 
                  id='height'
                  name='height'
                  type='number'
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.height}
                />
              </FormControl>  
              <FormControl>
                <FormLabel htmlFor='age'>Age</FormLabel>
                <Input 
                  id='age'
                  name='age'
                  type='number'
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.age}
                />               
              </FormControl> 
              <FormControl as='fieldset'>
                
                <FormLabel as='legend'>Gender</FormLabel>
                <RadioGroup value={formik.values.gender}>
                    <HStack spacing='24px'>
                    <Radio name ='gender' onChange={formik.handleChange} value='Male'>Male</Radio>
                    <Radio name ='gender' onChange={formik.handleChange} value='Female'>Female</Radio>                    
                    </HStack>
                </RadioGroup>                
                </FormControl> 
                <FormControl as='fieldset'>
                <FormLabel as='legend'>Private Profile?</FormLabel>
                <RadioGroup value={formik.values.privateProfile}>
                    <HStack spacing='24px'>
                    <Radio name ='privateProfile' value="1" onChange={formik.handleChange}>Yes</Radio>
                    <Radio name ='privateProfile' value="0" onChange={formik.handleChange}>No</Radio>                    
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
        </form>
        {successmsg && (
          <Stack spacing={3}>
              <Alert status='success'>
              <AlertIcon />
              {successmsg}
            </Alert>
            </Stack>  
            )} </Box>
    </Flex>
    );
  }