import React from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations'


export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);
//   need to add BMI/Fitness goal input options
  
  // create form variables
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ username, email, password}) => {
      try {
        const { data } = await addUser({
          variables: { username, email, password },
        });

        return data.login.token
      } catch (e) {
        console.error(e);
      }
    }
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={(e)=>{ 
              e.preventDefault(); 
              const token = formik.handleSubmit(e);
              Auth.login(token);
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
              <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input 
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'} 
                    variant='filled'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
                  {/* Facebook */}
              <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
                <Center>
                  <Text>Continue with Facebook</Text>
                </Center>
              </Button>

              {/* Google */}
              <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to='/login' color={'darkgreen'}>Log in</Link>
                {/* link back to login if already a user */}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}